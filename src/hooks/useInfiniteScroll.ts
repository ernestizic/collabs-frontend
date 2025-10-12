import { useCallback, useRef } from "react";

const useInfiniteScroll = (
	isFetching: boolean,
	hasNextPage: boolean,
	fetchNextPage: () => void,
) => {
	const observer = useRef<IntersectionObserver | null>(null);
	const lastListElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isFetching) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[hasNextPage, isFetching, fetchNextPage]
	);

	return {
		lastListElementRef,
	};
};

export default useInfiniteScroll;
