import { lifelog } from '@lib/faker/lifelog';
import useActionTimeDisplay from '@src/hooks/useActionTimeDisplay';
import { days } from '@lib/dateUtil';
import { renderHook } from '@testing-library/react';
import { DATE_UTIL } from '@lib/consts/common';

const FMT = DATE_UTIL.FORMAT;
describe('useActionTimeDisplay', () => {
  const log = lifelog();
  const startedAt = '2024-02-02 12:12:22';
  const startDays = days(startedAt);
  beforeEach(() => {
    log.startedAt = startedAt;
    log.finishedAt = null;
    log.isDateChanged = false;
  });
  describe('startedAt の表示で、isDateChanged が', () => {
    it('false の場合、日付は表示されない', () => {
      const { result } = renderHook(() => useActionTimeDisplay(log));
      const { startedDatetime, startedDate, startedTime, displayDatetime } =
        result.current;
      expect(startedDatetime).toEqual(startDays.format(FMT.DISPLAY_DATETIME));
      expect(startedDate).toEqual(startDays.format(FMT.DISPLAY_DATE));
      expect(startedTime).toEqual(startDays.format(FMT.DISPLAY_TIME));
      expect(displayDatetime).toEqual(startDays.format(FMT.DISPLAY_TIME));
    });
    it('true の場合、日付も表示される', () => {
      log.isDateChanged = true;
      const { result } = renderHook(() => useActionTimeDisplay(log));
      const { displayDatetime } = result.current;
      expect(displayDatetime).toEqual(startDays.format(FMT.DISPLAY_DATETIME));
    });
    it('startedAt の変更に追従できているか？', async () => {
      const { result, rerender } = renderHook(() => useActionTimeDisplay(log));
      expect(result.current.displayDatetime).toEqual(
        startDays.format(FMT.DISPLAY_TIME)
      );

      const startDaysAfter10min = startDays.add(10, 'minutes');
      log.startedAt = startDaysAfter10min.format(FMT.DATETIME_FULL);
      rerender();
      expect(result.current.displayDatetime).toEqual(
        startDaysAfter10min.format(FMT.DISPLAY_TIME)
      );
    });
  });

  describe('finishedAt', () => {
    it('存在しない場合は何も表示されない', () => {
      const { result } = renderHook(() => useActionTimeDisplay(log));
      const { actionTime, displayActionTime } = result.current;
      expect(actionTime).toBeNull();
      expect(displayActionTime).toEqual('');
    });
    it('存在する場合、作業時間が表示される', () => {
      log.finishedAt = startDays.add(10, 'minutes').format(FMT.DATETIME_FULL);
      const { result } = renderHook(() => useActionTimeDisplay(log));
      const { actionTime, displayActionTime } = result.current;
      expect(actionTime).toEqual(10);
      expect(displayActionTime).toEqual(' (10)');
    });
    it('作業時間が最大値を超えた場合は、最大値が表示される', () => {
      log.finishedAt = startDays
        .add(DATE_UTIL.MAX_ACTION_MINUTES + 100, 'minutes')
        .format(FMT.DATETIME_FULL);
      const { result } = renderHook(() => useActionTimeDisplay(log));
      const { actionTime, displayActionTime } = result.current;
      expect(actionTime).toEqual(DATE_UTIL.MAX_ACTION_MINUTES + 100);
      expect(displayActionTime).toEqual(` (${DATE_UTIL.MAX_ACTION_MINUTES}+)`);
    });
    describe('変更の追従', () => {
      it('null から完了時間が設定された場合に表示されるか', () => {
        const { result, rerender } = renderHook(() =>
          useActionTimeDisplay(log)
        );
        expect(result.current.displayActionTime).toEqual('');
        log.finishedAt = startDays.add(10, 'minutes').format(FMT.DATETIME_FULL);
        rerender();
        expect(result.current.displayActionTime).toEqual(' (10)');
      });
      it('設定状態から null になった場合に表示されるか', () => {
        log.finishedAt = startDays.add(10, 'minutes').format(FMT.DATETIME_FULL);
        const { result, rerender } = renderHook(() =>
          useActionTimeDisplay(log)
        );
        expect(result.current.displayActionTime).toEqual(' (10)');

        log.finishedAt = null;
        rerender();
        expect(result.current.displayActionTime).toEqual('');
      });
    });
  });
});
