import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { USE_DELETE_LIFELOG as CONST } from '@lib/consts';

const useDeleteLifelog = () => {
  const { deleteLog } = useLifelog();

  return (logId: number) => {
    if (!confirm(CONST.MESSAGE.CONFIRM)) return;
    deleteLog(logId)
      .then(() => {
        notify.success(CONST.MESSAGE.SUCCESS);
      })
      .catch((e) => {
        notify.error(e?.message);
      });
  };
};

export default useDeleteLifelog;
