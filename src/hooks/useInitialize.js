import { useEffect, useState } from "react";

export const useInitialize = (func, deps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(!loading) return;
    func();
    setLoading(false);
  }, [func, loading, setLoading, deps]);
};
