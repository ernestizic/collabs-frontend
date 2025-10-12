"use client";

import LoadMoreLoader from "@/components/global/LoadMoreLoader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/utils/api/project";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Fragment } from "react";
import { queryKeys } from "@/lib/queryKeys";
import ProjectsEmptyState from "./_components/ProjectsEmptyState";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const DashboardPage = () => {
	const router = useRouter();

	const {
		data,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: queryKeys.projects,
		queryFn: ({ pageParam }) => getProjects(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (
				lastPage.data.pagination.currentPage >=
				lastPage.data.pagination.totalPages
			) {
				return undefined;
			}
			return lastPageParam + 1;
		},
	});

	const { lastListElementRef } = useInfiniteScroll(
		isFetching,
		hasNextPage,
		fetchNextPage
	);

	return (
		<div className="max-w-[1024px] 2xl:max-w-[1500] mx-auto pb-10">
			<div className="border-b pt-14 pb-1 mb-20">
				<Button
					className="flex ml-auto"
					onClick={() => router.push("/create-project")}
				>
					<Plus /> Create new project
				</Button>
			</div>

			<div className="clear-both grid grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-7">
				{isLoading
					? Array.from({ length: 4 }).map((item, idx) => (
							<div
								key={idx}
								className="bg-white shadow rounded-2xl p-[24px] h-[200px] flex flex-col justify-between cursor-pointer"
							>
								<div>
									<div className="flex items-center gap-2 mb-4">
										<Skeleton className="size-12 rounded" />
										<div className="flex flex-col gap-2">
											<Skeleton className="h-2 w-[150px]" />
											<Skeleton className="h-2 w-[50px]" />
										</div>
									</div>
									<Skeleton className="h-[10px] w-full mb-2" />
									<Skeleton className="h-[10px] w-[150px]" />
								</div>

								<Skeleton className="h-[10px] w-[150px]" />
							</div>
					  ))
					: data?.pages.map((group, idx) => (
							<Fragment key={idx}>
								{group.data.projects.map((project, i) => (
									<div
										ref={
											group.data.projects.length === i + 1
												? lastListElementRef
												: null
										}
										role="link"
										tabIndex={0}
										aria-label="Open project"
										onClick={() => router.push(`/project/${project.id}/tasks`)}
										key={project.id}
										className="bg-white shadow rounded-2xl p-[24px] h-[200px] flex flex-col justify-between cursor-pointer"
									>
										<div>
											<div className="flex gap-2">
												<div className="size-12 rounded bg-accent flex items-center justify-center text-3xl font-semibold capitalize">
													{project.name.charAt(0)}
												</div>
												<div>
													<p className="text-lg font-semibold line-clamp-2">
														{project.name}
													</p>
													{/* <p className="text-sm">4 tasks</p> */}
												</div>
											</div>
											<p className="text-[14px] mt-4 line-clamp-2">
												{project.description}
											</p>
										</div>

										<p>{dayjs(project.createdAt).fromNow()}</p>
									</div>
								))}
							</Fragment>
					  ))}
			</div>
			{isFetchingNextPage && <LoadMoreLoader />}

			{!isLoading && data && data?.pages[0].data.projects.length < 1 && (
				<ProjectsEmptyState />
			)}
		</div>
	);
};

export default DashboardPage;
