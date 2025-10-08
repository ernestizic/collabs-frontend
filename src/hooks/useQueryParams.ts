'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type ParamValue = string | string[] | number | boolean | null | undefined;
type ParamsObject = Record<string, ParamValue>;

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [localParamState, setLocalParamState] = useState<ParamsObject>({});

  useEffect(() => {
    const entries: ParamsObject = {};
    searchParams.forEach((value, key) => {
      if (entries[key]) {
        const current = entries[key];
        entries[key] = Array.isArray(current)
          ? [...current, value]
          : [current as string, value];
      } else {
        entries[key] = value;
      }
    });
    setLocalParamState(entries);
  }, [searchParams]);

  const updateParams = useCallback(
    (params: URLSearchParams) => {
      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Get single value (like `search=react`)
  const getParam = useCallback(
    (key: string): string | null => searchParams.get(key),
    [searchParams]
  );

  // Get all values (like `tag=react&tag=js`)
  const getAll = useCallback(
    (key: string): string[] => searchParams.getAll(key),
    [searchParams]
  );

  // Set or update a single param
  const setParam = useCallback(
    (key: string, value: ParamValue) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }

      updateParams(newParams);
    },
    [searchParams, updateParams]
  );

  // Set or update multiple params at once
  const setParams = useCallback(
    (params: ParamsObject) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      updateParams(newParams);
    },
    [searchParams, updateParams]
  );

  // Remove a single param
  const removeParam = useCallback(
    (key: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(key);
      updateParams(newParams);
    },
    [searchParams, updateParams]
  );

  // Remove a single param
  const removeMultipleParams = useCallback(
    (keys: string[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      keys.forEach(element => {
        newParams.delete(element);
      });
      updateParams(newParams);
    },
    [searchParams, updateParams]
  );

  // Add a value to a multi-value param (e.g. tag=react → tag=react&tag=js)
  const addValue = useCallback(
    (key: string, value: string) => {
      const current = searchParams.getAll(key);
      if (!current.includes(value)) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.append(key, value);
        updateParams(newParams);
      }
    },
    [searchParams, updateParams]
  );

   // Remove a specific value from a multi-value param
  const removeValue = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams();

      searchParams.forEach((v, k) => {
        if (k === key && v === value) return;
        newParams.append(k, v);
      });

      updateParams(newParams);
    },
    [searchParams, updateParams]
  );

  const redirectWithParams = useCallback(
    (path: string, params: ParamsObject) => {
      const newParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          newParams.set(key, String(value));
        }
      });

      router.push(`${path}?${newParams.toString()}`, { scroll: false });
    },
    [router]
  );

  return {
    localParamState, // synced version of all params as an object
    getParam, // get single value
    getAll, // get all values for key
    setParam, // set or update key
    setParams, // set multiple keys
    removeParam, // remove key entirely
    removeMultipleParams,
    addValue, // append to a multi-value key
    removeValue, // remove specific value from multi-key
    redirectWithParams, // redirect to a new path with params
  };
}
