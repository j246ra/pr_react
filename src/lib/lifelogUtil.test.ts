import { lifelog, lifelogs } from '@lib/faker/lifelog';
import lifelogUtil from '@lib/lifelogUtil';
import { days } from '@lib/dateUtil';

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
    it('空白がある場合、最初の空白で文字列を区切り action と detail を生成していること', () => {
      const now = days().unix();
      const params = buildCreateParamsByContext('Web開発 ポートフォリオ制作');
      expect(params.action).toEqual('Web開発');
      expect(params.detail).toEqual('ポートフォリオ制作');
      const startedAt = days(params.startedAt).unix();
      expect(startedAt).toBeGreaterThanOrEqual(now);
      expect(startedAt).toBeLessThan(now + 3_000);
    });
    it('空白なしの文字列の場合、action のみ生成', () => {
      const now = days().unix();
      const params = buildCreateParamsByContext('Web開発');
      expect(params.action).toEqual('Web開発');
      expect(params.detail).toBeNull();
      const startedAt = days(params.startedAt).unix();
      expect(startedAt).toBeGreaterThanOrEqual(now);
      expect(startedAt).toBeLessThan(now + 3_000);
    });
  });
});
