import { useEffect, useState } from "react";

type httpMethods = "get" | "post" | "put" | "patch" | "delete";

type useFetchReturnType<T> = [boolean, T | null, boolean];

type OptionType = {
  method: httpMethods;
  headers: Record<string, string>;
  body?: string;
};

const useFetch = <T>(
  url: string,
  method: httpMethods = "get",
  condition: boolean = true,
  payload?: object
): useFetchReturnType<T> => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  async function operate() {
    const options: OptionType = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "get" && method !== "delete") {
      options.body = JSON.stringify(payload);
    }
    try {
      setIsLoading(true);
      const result = await fetch(url, options);
      if (!result.ok) {
        throw new Error("issue with request");
      }
      const data = await result.json();
      setData(data);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (condition) {
      operate();
    } else {
      setIsError(true);
    }
  }, []);

  return [isLoading, data, isError];
};

export default useFetch;
