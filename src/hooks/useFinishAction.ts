import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { USE_FINISH_ACTION as CONST } from '@lib/consts';

const useFinishAction = () => {
  const { finishLog } = useLifelog();

  return (lifelog: Lifelog) => {
    finishLog(lifelog).then(() => notify.success(CONST.MESSAGE.SUCCESS));
  };
};

export default useFinishAction;
