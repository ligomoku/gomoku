export const Profile = () => {
  return <span>Profile</span>;
};

// import { SwaggerServices } from "@gomoku/api";
// import { t } from "@lingui/macro";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Activity, ChevronUp, Users } from "lucide-react";
// import { useRef, useCallback } from "react";
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
//
// import type { SwaggerTypes } from "@gomoku/api";
//
// import { useAuthToken } from "@/context";
// import { Headers } from "@/utils";
//
// export const Profile = () => {
//   const ratingData = [
//     { date: "2019", rating: 1860 },
//     { date: "2020", rating: 1920 },
//     { date: "2021", rating: 1880 },
//     { date: "2022", rating: 1840 },
//     { date: "2023", rating: 1900 },
//     { date: "2024", rating: 1920 },
//   ];
//
//   const { jwtToken, jwtDecodedInfo } = useAuthToken();
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useFetchProfileGames(jwtToken, jwtDecodedInfo?.username || "");
//
//   const observer = useRef<IntersectionObserver | null>(null);
//
//   const lastGameElementRef = useCallback(
//     (node: Element) => {
//       if (isFetchingNextPage) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasNextPage) {
//           fetchNextPage();
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [isFetchingNextPage, fetchNextPage, hasNextPage],
//   );
//
//   return (
//     <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
//       <main className="container mx-auto p-4 sm:p-6">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
//           <div className="md:col-span-1">
//             <div className="space-y-6">
//               <div>
//                 <h2 className="mb-2 text-xl font-bold">{t`STANDARD`}</h2>
//                 <div className="flex items-center">
//                   <span className="mr-2 text-3xl font-bold">1920</span>
//                   <ChevronUp className="text-green-500" />
//                   <span className="text-green-500">12</span>
//                 </div>
//                 <div className="text-sm">8,721 games</div>
//               </div>
//               {/* More sections (Blitz, Lightning, etc.) */}
//             </div>
//           </div>
//
//           <div className="md:col-span-2 lg:col-span-2">
//             <div className="mb-6">
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={ratingData}>
//                   {/*@ts-expect-error*/}
//                   <XAxis dataKey="date" stroke="#bababa" />
//                   {/*@ts-expect-error*/}
//                   <YAxis stroke="#bababa" />
//                   <Line
//                     type="monotone"
//                     dataKey="rating"
//                     stroke="#3B82F6"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//
//             <div className="rounded-lg bg-[#262421] p-4">
//               <h2 className="mb-4 text-xl font-bold">Activity</h2>
//               <div className="space-y-4">
//                 {data?.pages.map((page, pageIndex) =>
//                   page.data.map((game, gameIndex) => {
//                     const isLastGame =
//                       pageIndex === data.pages.length - 1 &&
//                       gameIndex === page.data.length - 1;
//
//                     return (
//                       <div
//                         //@ts-expect-error
//                         ref={isLastGame ? lastGameElementRef : undefined}
//                         key={game.gameId}
//                         className="flex items-center"
//                       >
//                         <Activity className="mr-4 text-blue-500" size={24} />
//                         <div>
//                           <div className="font-bold">
//                             Played {game.isCompleted ? "Completed" : "Ongoing"}{" "}
//                             game
//                           </div>
//                           <div className="text-sm">
//                             {game.winner
//                               ? `${game.winner} (+8)`
//                               : "In Progress"}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   }),
//                 )}
//                 {isFetchingNextPage && <div>Loading more games...</div>}
//               </div>
//             </div>
//           </div>
//
//           <div className="md:col-span-3 lg:col-span-1">
//             <div className="space-y-6 rounded-lg bg-[#262421] p-4">
//               <div>
//                 <Users className="mb-2" size={24} />
//                 <h2 className="text-xl font-bold">Japan</h2>
//                 <div className="text-sm">Member since Sep 26, 2020</div>
//               </div>
//               {/* Additional sections for profile, teams, etc. */}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
//
// const useFetchProfileGames = (
//   authToken: string,
//   userName: SwaggerTypes.GetApiProfilesByUserNameGamesData["path"]["userName"],
// ) =>
//   useInfiniteQuery<
//     SwaggerTypes.GetApiProfilesByUserNameGamesResponse,
//     SwaggerTypes.GetApiProfilesByUserNameGamesError
//   >({
//     queryKey: ["gamesProfile", userName],
//     queryFn: async ({ pageParam = 1 }) => {
//       const response = await SwaggerServices.getApiProfilesByUserNameGames({
//         path: { userName },
//         headers: Headers.getDefaultHeaders(authToken),
//         query: {
//           page: pageParam,
//           pageSize: 10,
//         },
//       });
//
//       if (!response.data) {
//         throw new Error("Invalid game data received");
//       }
//
//       return response.data;
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       const totalFetchedItems = allPages.reduce(
//         (total, page) => total + page.data.length,
//         0,
//       );
//
//       return totalFetchedItems < lastPage.metadata.totalCount
//         ? allPages.length + 1
//         : undefined;
//     },
//     initialPageParam: 1,
//     //TODO: currentPage should be added on BE side
//     // getNextPageParam: (lastPage) => {
//     //   return lastPage.metadata.hasMoreItems
//     //     ? lastPage.metadata.currentPage + 1
//     //     : undefined;
//     // },
//   });
