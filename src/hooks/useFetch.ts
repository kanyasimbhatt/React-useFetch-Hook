import { useEffect, useState } from "react";

type httpMethods = "get" | "post" | "put" | "patch" | "delete";

type useFetchReturnType<T> = [boolean, T | null, boolean];

const useFetch = <T>(
  url: string,
  method: httpMethods,
  condition: boolean,
  payload?: object
) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  async function operate() {
    try {
      setIsLoading(true);
      const result = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!result.ok) {
        throw new Error("issue with request");
      }

      const data = await result.json();
      setResponse(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
    }
  }
  useEffect(() => {
    if (condition) {
      operate();
    } else {
      setIsError(true);
    }
  }, []);

  const useFetchResult: useFetchReturnType<T> = [isLoading, response, isError];

  return useFetchResult;
};

export default useFetch;
