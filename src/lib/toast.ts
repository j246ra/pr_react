import toast from 'react-hot-toast';

export interface Notify {
  error: (message: string) => void;
  success: (message: string) => void;
}

const notify: Notify = {
  error: (message: string) => {
    toast.error(message, { style: { color: 'red' } });
  },
  success: (message: string) => {
    toast.success(message);
  },
};

export default notify;
