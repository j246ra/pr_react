import { blank } from '@lib/lifelogUtil';
import {
  convertResponseData,
  validateLifelogResponse,
} from '@lib/api/lifelogResponse';
import { lifelog, lifelogs } from '@lib/faker/lifelog';

describe('lifelogResponse', () => {
  describe('validateResponseData', () => {
    describe('responseData', () => {
      describe('1件の正常データの場合', () => {
        it('validData に正常データが存在する', () => {
          const data = lifelog();
          const { validData, invalidData } = validateLifelogResponse(data);
          expect(invalidData.length).toEqual(0);
          expect(validData[0]).toEqual(data);
        });
      });
      describe('複数の正常データの場合', () => {
        it('validData に複数正常データ存在する', () => {
          const data = lifelogs(3);
          const { validData, invalidData } = validateLifelogResponse(data);
          expect(invalidData.length).toEqual(0);
          expect(validData).toEqual(data);
        });
      });
      describe('null の場合', () => {
        it('validData, invalidData は空である', () => {
          const { validData, invalidData } = validateLifelogResponse(null);
          expect(invalidData.length).toEqual(0);
          expect(validData.length).toEqual(0);
        });
      });
      describe('空配列の場合', () => {
        it('validData, invalidData は空である', () => {
          const { validData, invalidData } = validateLifelogResponse([]);
          expect(invalidData.length).toEqual(0);
          expect(validData.length).toEqual(0);
        });
      });
      describe('undefined の場合', () => {
        it('validData, invalidData は空である', () => {
          const { validData, invalidData } = validateLifelogResponse(undefined);
          expect(invalidData.length).toEqual(0);
          expect(validData.length).toEqual(0);
        });
      });
      describe('1つ項目にエラーが存在する場合', () => {
        it('そのデータは invalidData に存在する', () => {
          const data: any = { ...lifelog() };
          data.userId = '12345';
          const { validData, invalidData } = validateLifelogResponse(data);
          expect(invalidData.length).toEqual(1);
          expect(validData.length).toEqual(0);
          expect(invalidData[0].data).toEqual(data);
          expect(invalidData[0].errors).toEqual({
            _errors: [],
            userId: { _errors: ['Expected number, received string'] },
          });
        });
      });
      describe('複数の項目にエラーが存在する場合', () => {
        it('それぞれの項目で invalidData の errors にメッセージ出力されている', () => {
          const data: any = lifelogs(3);
          data[1] = {
            id: '2',
            userId: '2',
            action: 111,
            detail: 29,
            startedAt: 20230101,
            finishedAt: 20230102,
            createdAt: null,
            updateAt: 20230102,
          };
          const { validData, invalidData } = validateLifelogResponse(data);
          expect(invalidData.length).toEqual(1);
          expect(validData.length).toEqual(2);
          const _invalid = invalidData[0];
          expect(Object.keys(_invalid.errors).length).toEqual(9);
        });
      });
      describe('null 許可項目が null の場合', () => {
        it('正常の処理されていること', () => {
          const data = { ...lifelog(), detail: null, finishedAt: null };
          const { validData, invalidData } = validateLifelogResponse(data);
          expect(invalidData.length).toEqual(0);
          expect(validData.length).toEqual(1);
          expect(validData[0]).toEqual(data);
        });
      });
      describe('根本的にデータ型が異なる場合', () => {
        it('適切にエラーが出力されている', () => {
          const data = 1234;
          const { validData, invalidData } = validateLifelogResponse(data);
          expect(invalidData.length).toEqual(1);
          expect(validData.length).toEqual(0);
          expect(invalidData[0].data).toEqual(data);
          expect(invalidData[0].errors).toEqual({
            _errors: ['Expected object, received number'],
          });
        });
      });
    });
  });
  describe('convertResponseData', () => {
    it('項目が不足している場合はデフォルト値で追加されていること', () => {
      const data: any = {
        id: 123,
        userId: '2',
        action: 111,
        startedAt: 20230101,
      };
      const res = convertResponseData([data]);
      expect(res[0]).toEqual({ ...blank(), ...data });
    });
  });
});
