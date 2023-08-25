import validator from './validator';
import { Lifelog } from '@providers/LifelogProvider';
import { LIFELOG_EDIT_DIALOG as Defs } from '@lib/consts/component';

export const lifelogEditDialogValidator = (lifelog: Partial<Lifelog>) => {
  const { result, textPresenceValidator } = validator();
  textPresenceValidator(lifelog.action, Defs.ACTION.LABEL);
  textPresenceValidator(lifelog.startedAt, Defs.STARTED_AT.LABEL);
  return result;
};

export default lifelogEditDialogValidator;
