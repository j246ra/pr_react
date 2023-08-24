import toast from 'react-hot-toast';
import { NOTIFY as CONST } from '@lib/consts/common';

export interface Notify {
  error: (message: string) => void;
  success: (message: string) => void;
}

const notify: Notify = {
  error: (message: string) => {
    toast.error(message, CONST.STYLE.ERROR);
  },
  success: (message: string) => {
    toast.success(message);
  },
};

export default notify;
