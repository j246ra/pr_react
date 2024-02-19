import { lifelog, lifelogs } from '@lib/faker/lifelog';
import lifelogUtil from '@lib/lifelogUtil';
import { days } from '@lib/dateUtil';
import { checkTimeWithinRange } from '@src/tests/jestHelper';

describe('lifelogUtil', () => {
  describe('sort', () => {
    const { sort } = lifelogUtil;
    it('Lifelog 配列を startedAt で降順に並べ替える', () => {
      const logs = lifelogs(5);
      const reversedLogs = logs.reverse();
      expect(sort(reversedLogs)).toEqual(logs);
    });

    it('Lifelog 配列が 1 件でも正常に処理をする', () => {
      const logs = [lifelog()];
      expect(sort(logs)).toEqual(logs);
    });

    it('Lifelog 配列が 0 件でも正常に空配列を返却する', () => {
      expect(sort([])).toEqual([]);
    });
  });

  it('create', () => {
    expect(lifelogUtil.blank()).toEqual({
      id: -1,
      userId: -1,
      action: '',
      detail: null,
      startedAt: '',
      finishedAt: null,
      createdAt: '',
      updatedAt: '',
      isDateChanged: false,
    });
  });

  describe('buildCreateParamsByContext', () => {
    const { buildCreateParamsByContext } = lifelogUtil;
    describe('空白文字列区切り検証', () => {
      describe('最初が数字4桁の場合', () => {
        const today = days().format('YYYY-MM-DD');
        it('開始日時としていること', () => {
          const params = buildCreateParamsByContext(
            '1234　Web開発　ポートフォリオ制作'
          );
          expect(params.action).toEqual('Web開発');
          expect(params.detail).toEqual('ポートフォリオ制作');
          checkTimeWithinRange(
            params.startedAt,
            days(today).hour(12).minute(34)
          );
        });
        it('0000 は 0時0分', () => {
          const params = buildCreateParamsByContext(
            '0000 Web開発 ポートフォリオ制作'
          );
          expect(params.action).toEqual('Web開発');
          expect(params.detail).toEqual('ポートフォリオ制作');
          checkTimeWithinRange(params.startedAt, days(today).hour(0).minute(0));
        });
        it('2359 は 23時59分', () => {
          const params = buildCreateParamsByContext(
            '2359 Web開発 ポートフォリオ制作'
          );
          expect(params.action).toEqual('Web開発');
          expect(params.detail).toEqual('ポートフォリオ制作');
          checkTimeWithinRange(
            params.startedAt,
            days(today).hour(23).minute(59)
          );
        });
        it('2400 は 時間として扱われない', () => {
          const now = days();
          const params = buildCreateParamsByContext(
            '2400 Web開発 ポートフォリオ制作'
          );
          expect(params.action).toEqual('2400');
          expect(params.detail).toEqual('Web開発 ポートフォリオ制作');
          checkTimeWithinRange(params.startedAt, now);
        });
        it('数字5桁以上の場合は時間として扱われない', () => {
          const now = days();
          const params = buildCreateParamsByContext(
            '235959 Web開発 ポートフォリオ制作'
          );
          expect(params.action).toEqual('235959');
          expect(params.detail).toEqual('Web開発 ポートフォリオ制作');
          checkTimeWithinRange(params.startedAt, now);
        });
      });
      it('空白がある場合、最初の空白で文字列を区切り action と detail を生成していること', () => {
        const now = days();
        const params = buildCreateParamsByContext('Web開発 ポートフォリオ制作');
        expect(params.action).toEqual('Web開発');
        expect(params.detail).toEqual('ポートフォリオ制作');
        checkTimeWithinRange(params.startedAt, now);
      });
      it('空白なしの文字列の場合、action のみ生成', () => {
        const now = days();
        const params = buildCreateParamsByContext('Web開発');
        expect(params.action).toEqual('Web開発');
        expect(params.detail).toBeNull();
        checkTimeWithinRange(params.startedAt, now);
      });
    });
  });
});
