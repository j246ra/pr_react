import toast from 'react-hot-toast';
import { NOTIFY as CONST } from '@lib/consts/common';

export type Notify = {
  error: (message?: string) => void;
  success: (message?: string) => void;
};

const notify: Notify = {
  error: (message?: string) => {
    if (message) toast.error(message, CONST.STYLE.ERROR);
  },
  success: (message?: string) => {
    if (message) toast.success(message);
  },
};

export default notify;
