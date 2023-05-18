import toast from 'react-hot-toast';

const notify = {
  error: (message: string) => {
    toast.error(message, { style: { color: 'red ' } });
  },
  success: (message: string) => {
    toast.success(message);
  },
};

export default notify;
