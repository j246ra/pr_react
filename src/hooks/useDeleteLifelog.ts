import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { USE_DELETE_LIFELOG } from '@lib/consts/common';

const useDeleteLifelog = () => {
  const { deleteLog } = useLifelog();

  return (logId: number) => {
    if (!confirm(USE_DELETE_LIFELOG.MESSAGE.CONFIRM)) return;
    deleteLog(logId)
      .then(() => {
        notify.success(USE_DELETE_LIFELOG.MESSAGE.SUCCESS);
      })
      .catch((e) => {
        notify.error(e?.message);
      });
  };
};

export default useDeleteLifelog;
