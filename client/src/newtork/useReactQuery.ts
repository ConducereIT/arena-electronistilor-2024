import { useQuery, QueryKey } from "@tanstack/react-query";

function useReactQuery<V>(queryKey: QueryKey, request: () => Promise<V>) {
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: request,
  });

  return {
    data,
    isLoading,
    isError,
  };
}

export default useReactQuery;
