import { apiClient } from "@gomoku/api/client/api-client";
import {
  GameOptionsButtons,
  OnlinePlayersInfo,
  SectionList,
  TimeControls,
} from "@gomoku/story";
import { t } from "@lingui/core/macro";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

import type { components } from "@gomoku/api/client/schema";
import type { GameType } from "@gomoku/story";

import { useAuthToken, useSignalRConnection } from "@/context";
import { useCreateGameAndNavigate } from "@/hooks";
import { fetchAuthFallback, Headers } from "@/utils";

export const HomeGame = () => {
  const navigate = useNavigate();
  const { jwtToken } = useAuthToken();
  const { data: paginatedGames } = useFetchGames(jwtToken);
  const { data: paginatedActiveGames } = useFetchActiveGames(jwtToken);
  const router = useRouter();
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

  const { createGame, isLoading: isLoadingCreateGame } =
    useCreateGameAndNavigate({
      authToken: jwtToken,
    });

  const handleCreateGame = (
    selectedBoardSize: number,
    selectedTimeControl?: components["schemas"]["TimeControlDto"],
  ) => {
    createGame({
      boardSize: selectedBoardSize,
      timeControl: selectedTimeControl,
    });
  };

  const transformGameData = (
    games: components["schemas"]["GetAvailableGamesResponse"][] | undefined,
  ) =>
    games?.map((game) => ({
      id: game.gameId,
      title: game.opponent?.userName ?? game.gameId.slice(0, 6),
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    }));

  useEffect(() => {
    if (isConnected && hubProxy) {
      const unregister = registerEventHandlers({
        onMatchingPlayerFound: async (gameId) => {
          await router.navigate({
            to: `/game/join/${gameId}`,
          });
        },
        onOnlineUserCountChange: async (usersCount: number) => {
          setOnlineUsersCount(usersCount);
        },
      });
      return () => {
        if (typeof unregister === "function") {
          unregister();
        }
      };
    }
    return;
  }, [isConnected, hubProxy, registerEventHandlers, router]);

  useEffect(() => {
    //TODO: Figure out if clean up can be done in onLeave router lifecycle function
    return () => {
      hubProxy?.leaveQueue();
    };
  }, [hubProxy]);

  return (
    <div className="min-h-screen bg-[#161512] text-base text-[#bababa] sm:text-lg">
      <main className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionList
              title="Online games"
              items={transformGameData(paginatedGames?.data)}
              onItemClick={(item) =>
                navigate({
                  to: `/game/join/${item.id}`,
                })
              }
              noItemsText={t`No online games were created`}
            />
            <p className="text-base sm:text-lg">
              {t`Gomoku.app is a free, open-source Five in a Row game platform.`}
            </p>
          </div>
          <div className="lg:col-span-6">
            <h2 className="mb-6 text-2xl font-bold text-[#bababa] sm:text-3xl">
              {t`Quick pairing`}
            </h2>
            <TimeControls
              gameTypes={gameTypes}
              isLoading={isLoadingCreateGame}
              onGameTypeSelected={(gameType) =>
                hubProxy?.joinQueueWithMode({
                  ...gameType,
                  anonymous: !jwtToken,
                })
              }
              onGameTypeUnselected={() => hubProxy?.leaveQueue()}
            />
          </div>
          <div className="lg:col-span-3">
            <GameOptionsButtons
              createGameText={t`CREATE A GAME`}
              playWithFriendText={t`PLAY WITH A FRIEND`}
              playWithAIText={t`PLAY WITH AI`}
              onCreateGame={handleCreateGame}
              isLoadingCreateGame={isLoadingCreateGame}
            />
            <OnlinePlayersInfo
              gamesInPlayText={t`${paginatedActiveGames?.metadata?.totalCount} games in play`}
              playersOnlineText={t`${onlineUsersCount} players online`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export const useFetchGames = (authToken: string | undefined) =>
  apiClient.useQuery(
    "get",
    "/api/game/registered/available-to-join",
    {
      params: {
        header: Headers.getDefaultHeaders(authToken!),
      },
    },
    {
      queryKey: ["games", authToken || null],
      refetchInterval: 5000,
      queryFn: async () => {
        const response = await fetchAuthFallback<
          components["schemas"]["GetAvailableGamesResponse"][]
        >(
          authToken,
          async (token) =>
            apiClient.useQuery(
              "get",
              "/api/game/registered/available-to-join",
              {
                params: {
                  header: Headers.getDefaultHeaders(token),
                },
              },
            ),
          async () =>
            apiClient.useQuery("get", "/api/game/anonymous/available-to-join", {
              params: {
                header: Headers.getDefaultHeaders(),
              },
            }),
        );

        if (!response.data) {
          throw new Error("Invalid game data received");
        }

        return response.data;
      },
    },
  );

export const useFetchActiveGames = (authToken: string | undefined) =>
  apiClient.useQuery(
    "get",
    "/api/game/registered/active",
    {
      params: {
        header: Headers.getDefaultHeaders(authToken!),
      },
    },
    {
      queryKey: ["gamesActive", authToken || null],
      refetchInterval: 5000,
      queryFn: async () => {
        const response = await fetchAuthFallback<
          components["schemas"]["GetActiveGamesResponse"][]
        >(
          authToken,
          async (token) =>
            apiClient.useQuery("get", "/api/game/registered/active", {
              params: {
                header: Headers.getDefaultHeaders(token),
              },
            }),
          async () =>
            apiClient.useQuery("get", "/api/game/anonymous/active", {
              params: {
                header: Headers.getDefaultHeaders(),
              },
            }),
        );

        if (!response.data) {
          throw new Error("Invalid active game data received");
        }

        return response.data;
      },
    },
  );

export const gameTypes: GameType[] = [
  {
    timeLabel: "1+0",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "1+1",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 1,
    },
  },
  {
    timeLabel: "1+2",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 60,
      incrementPerMove: 2,
    },
  },
  {
    timeLabel: "2+1",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 120,
      incrementPerMove: 1,
    },
  },
  {
    timeLabel: "5+0",
    type: t`Blitz`,
    boardSize: 13,
    timeControl: {
      initialTimeInSeconds: 300,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "7+0",
    type: t`Rapid`,
    boardSize: 17,
    timeControl: {
      initialTimeInSeconds: 420,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "10+0",
    type: t`Rapid`,
    boardSize: 17,
    timeControl: {
      initialTimeInSeconds: 600,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "15+0",
    type: t`Rapid`,
    boardSize: 19,
    timeControl: {
      initialTimeInSeconds: 900,
      incrementPerMove: 0,
    },
  },
  {
    timeLabel: "30+0",
    type: t`Classic`,
    boardSize: 19,
    timeControl: {
      initialTimeInSeconds: 1800,
      incrementPerMove: 0,
    },
  },
];
