import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';

const useFinishAction = () => {
  const { finishLog } = useLifelog();

  return (lifelog: Lifelog) => {
    finishLog(lifelog).then(() => notify.success('行動時間を記録しました。'));
  };
};

export default useFinishAction;
