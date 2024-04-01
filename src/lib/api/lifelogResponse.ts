import { BaseLifelog, Lifelog } from '@providers/LifelogProvider';
import { blank } from '@lib/lifelogUtil';
import * as BaseResponse from '@lib/api/baseValidateResponse';

export const validateLifelogResponse = BaseResponse.buildTypeGuard<BaseLifelog>(
  {
    id: ['number', false],
    userId: ['number', false],
    action: ['string', false],
    detail: ['string', true],
    startedAt: ['string', false],
    finishedAt: ['string', true],
    createdAt: ['string', false],
    updatedAt: ['string', false],
  }
);

export const convertResponseData = (data: BaseLifelog[]): Lifelog[] => {
  return data.map((log) => {
    return { ...blank(), ...log };
  });
};
