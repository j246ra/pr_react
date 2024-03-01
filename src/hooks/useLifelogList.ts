import { useLifelog } from '@providers/LifelogProvider';
import { LIFELOG_LIST } from '@lib/consts/component';
import notify from '@lib/toast';

const useLifelogList = () => {
  const { lifelogs, loadLogs, isTerminated } = useLifelog();
  const lifelogLoader = async () => {
    const res = await loadLogs(LIFELOG_LIST.MESSAGE.ERROR);
    if (res.data?.invalidData.length > 0) {
      notify.error(LIFELOG_LIST.MESSAGE.INVALID_DATA);
    }
    return;
  };
  const hasMore = !isTerminated;
  return {
    lifelogLoader,
    hasMore,
    lifelogs,
  };
};

export default useLifelogList;
