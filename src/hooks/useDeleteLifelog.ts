import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';

const useDeleteLifelog = () => {
  const { deleteLog } = useLifelog();

  return (logId: number) => {
    if (!confirm('本当に削除しますか？')) return;
    deleteLog(logId)
      .then(() => {
        notify.success('削除成功');
      })
      .catch((e) => {
        notify.error(e?.message);
      });
  };
};

export default useDeleteLifelog;
