import { lifelog, lifelogs } from '@lib/faker/lifelog';
import lifelogUtil from '@lib/lifelogUtil';

describe('lifelogUtil', () => {
  describe('sort', () => {
    const { sort } = lifelogUtil();
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
    expect(lifelogUtil().blank()).toEqual({
      id: -1,
      userId: -1,
      action: '',
      detail: undefined,
      startedAt: '',
      finishedAt: undefined,
      createdAt: '',
      updatedAt: '',
    });
  });
});
