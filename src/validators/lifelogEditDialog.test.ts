import lifelogEditDialogValidator from '@validators/lifelogEditDialog';
import { days } from '@lib/dateUtil';
import { INVALID_MESSAGES } from '@validators/validator';
import { LIFELOG_EDIT_DIALOG } from '@lib/consts/component';
import { lifelog } from '@lib/faker/lifelog';

describe('lifelogEditDialogValidator', () => {
  it('すべて正しく入力されている場合は正常であること', () => {
    const result = lifelogEditDialogValidator(lifelog());
    expect(result.isInvalid).toBe(false);
    expect(result.message).toHaveLength(0);
  });
  it('行動内容が空白の場合エラーであること', () => {
    const result = lifelogEditDialogValidator({
      action: '',
      startedAt: days().toISOString(),
    });
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(LIFELOG_EDIT_DIALOG.ACTION.LABEL)
    );
  });
  it('行動内容が未定義の場合エラーであること', () => {
    const result = lifelogEditDialogValidator({
      startedAt: days().toISOString(),
    });
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(LIFELOG_EDIT_DIALOG.ACTION.LABEL)
    );
  });
  it('開始日時が空白の場合はエラーであること', () => {
    const result = lifelogEditDialogValidator({
      action: 'Action',
      finishedAt: '',
    });
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(LIFELOG_EDIT_DIALOG.STARTED_AT.LABEL)
    );
  });
  it('開始日時が未定義の場合はエラーであること', () => {
    const result = lifelogEditDialogValidator({
      action: 'Action',
    });
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(1);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(LIFELOG_EDIT_DIALOG.STARTED_AT.LABEL)
    );
  });
  it('すべての必須項目が未入力の場合は全てエラーであること', () => {
    const result = lifelogEditDialogValidator({});
    expect(result.isInvalid).toBe(true);
    expect(result.message).toHaveLength(2);
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(LIFELOG_EDIT_DIALOG.ACTION.LABEL)
    );
    expect(result.message).toContain(
      INVALID_MESSAGES.TEXT_PRESENCE(LIFELOG_EDIT_DIALOG.STARTED_AT.LABEL)
    );
  });
});
