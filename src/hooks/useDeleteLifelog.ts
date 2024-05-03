import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { USE_DELETE_LIFELOG } from '@lib/consts/common';
const MESSAGE = USE_DELETE_LIFELOG.MESSAGE;

const useDeleteLifelog = () => {
  const { deleteLog } = useLifelog();

  return (logId: number) => {
    if (!confirm(MESSAGE.CONFIRM)) return;
    deleteLog(logId, MESSAGE.ERROR).then(() => {
      notify.success(MESSAGE.SUCCESS);
    });
  };
};

export default useDeleteLifelog;
