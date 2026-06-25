import { useEffect } from 'react';

/** Loads the next cursor page when the document is close to its bottom. */
export const useWindowInfiniteScroll = (
  hasNextPage: boolean | undefined,
  isFetchingNextPage: boolean,
  fetchNextPage: () => void,
) => {
  useEffect(() => {
    const onScroll = () => {
      const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      if (hasNextPage && !isFetchingNextPage && remaining < 320) fetchNextPage();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
};
