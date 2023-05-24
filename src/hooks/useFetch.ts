import { useEffect, useState } from "react";
import { every } from "lodash";

const useFetch = (fetchCall: (...args: any) => Promise<any>, ...args: any) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (every(args)) {
      fetchCall(...args)
        .then((response) => {
          if (response.status === 200) {
            setData(response.data);
          } else {
            setError(response.statusText);
          }
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [...args]);

  return { data, error, loading };
};

export default useFetch;
