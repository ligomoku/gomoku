import { t } from "@lingui/macro";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { useEffect, useState } from "react";
import type { SwaggerTypes } from "@/api";
import type { GameType } from "@/features/TimeControls";

import { SwaggerServices } from "@/api";
import { useAuthToken, useSignalRConnection } from "@/context";
import { GameOptionsButtons } from "@/features/GameOptionsButton";
import { OnlinePlayersInfo } from "@/features/OnlinePlayersInfo";
import { SectionList } from "@/features/SectionList";
import { TimeControls } from "@/features/TimeControls";
import { useCreateGameAndNavigate } from "@/hooks/useCreateGame";
import { fetchAuthFallback, Headers } from "@/utils";

export const HomeGame = () => {
  const navigate = useNavigate();
  const { jwtToken } = useAuthToken();
  const { data: paginatedGames } = useFetchGames(jwtToken);
  const { data: paginatedActiveGames } = useFetchActiveGames(jwtToken);
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();

  const [ userCount, setUserCount ] = useState(0);

  const { createGame, isLoading: isLoadingCreateGame } =
    useCreateGameAndNavigate({
      authToken: jwtToken,
    });

  const handleCreateGame = (
    selectedBoardSize: number,
    selectedTimeControl?: SwaggerTypes.TimeControlDto,
  ) => {
    createGame({
      boardSize: selectedBoardSize,
      timeControl: selectedTimeControl,
    });
  };

  const enterQueueWithMode = async (
    selectedBoardSize: number,
    selectedTimeControl?: SwaggerTypes.TimeControlDto,
  ) => {
    // TODO: selectedTimeControl shouldnt be nullable.
    await hubProxy?.joinQueueWithMode({
      boardSize: selectedBoardSize,
      timeControl: selectedTimeControl!,
      anonymous: true,
    });
  };

  useEffect(() => {
    if (isConnected && hubProxy) {
      const unregister = registerEventHandlers({
        onMatchingPlayerFound: async (gameId) => {
          await navigate({
            to: `/game/join/${gameId}`,
          });
        },
        onOnlineUserCountChange: async (userCount) => {
          setUserCount(userCount);
        }
      });
      return () => {
        if (typeof unregister === "function") {
          unregister();
        }
      };
    }
    return;
  }, [hubProxy, isConnected, registerEventHandlers]);

  const transformGameData = (
    games: SwaggerTypes.GetAvailableGamesResponse[] | undefined,
  ) =>
    games?.map((game) => ({
      id: game.gameId,
      title: game.opponent?.userName ?? game.gameId.slice(0, 6),
      icon: <Users className="mr-3 h-5 w-5 text-[#bababa] sm:h-6 sm:w-6" />,
    }));

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
              onCreateGame={enterQueueWithMode}
              isLoading={isLoadingCreateGame}
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
              playersOnlineText={t`${userCount} players online`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const useFetchGames = (authToken: string) =>
  useQuery<
    SwaggerTypes.GetApiGameRegisteredAvailableToJoinResponse,
    SwaggerTypes.GetApiGameRegisteredAvailableToJoinError,
    SwaggerTypes.GetApiGameRegisteredAvailableToJoinResponse,
    [string, string | null]
  >({
    queryKey: ["games", null],
    queryFn: async () => {
      const response = await fetchAuthFallback(
        authToken,
        async (token) =>
          SwaggerServices.getApiGameRegisteredAvailableToJoin({
            headers: Headers.getDefaultHeaders(token),
          }),
        () =>
          SwaggerServices.getApiGameAnonymousAvailableToJoin({
            headers: Headers.getDefaultHeaders(),
          }),
      );

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      return response.data;
    },
    refetchInterval: 5000,
  });

const useFetchActiveGames = (authToken: string) =>
  useQuery<
    SwaggerTypes.GetApiGameRegisteredActiveResponse,
    SwaggerTypes.GetApiGameRegisteredActiveError
  >({
    queryKey: ["gamesActive", null],
    queryFn: async () => {
      const response = await fetchAuthFallback(
        authToken,
        async (token) =>
          SwaggerServices.getApiGameRegisteredActive({
            headers: Headers.getDefaultHeaders(token),
          }),
        async () =>
          SwaggerServices.getApiGameAnonymousActive({
            headers: Headers.getDefaultHeaders(),
          }),
      );

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      return response.data;
    },
    refetchInterval: 5000,
  });

export const gameTypes: GameType[] = [
  {
    timeLabel: "1+0",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: { initialTimeInSeconds: 60, incrementPerMove: 0 },
  },
  {
    timeLabel: "1+1",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: { initialTimeInSeconds: 60, incrementPerMove: 1 },
  },
  {
    timeLabel: "1+2",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: { initialTimeInSeconds: 60, incrementPerMove: 2 },
  },
  {
    timeLabel: "2+1",
    type: t`Bullet`,
    boardSize: 13,
    timeControl: { initialTimeInSeconds: 120, incrementPerMove: 1 },
  },
  {
    timeLabel: "5+0",
    type: t`Blitz`,
    boardSize: 13,
    timeControl: { initialTimeInSeconds: 300, incrementPerMove: 0 },
  },
  {
    timeLabel: "7+0",
    type: t`Rapid`,
    boardSize: 17,
    timeControl: { initialTimeInSeconds: 420, incrementPerMove: 5 },
  },
  {
    timeLabel: "10+0",
    type: t`Rapid`,
    boardSize: 17,
    timeControl: { initialTimeInSeconds: 600, incrementPerMove: 0 },
  },
  {
    timeLabel: "15+0",
    type: t`Rapid`,
    boardSize: 19,
    timeControl: { initialTimeInSeconds: 900, incrementPerMove: 0 },
  },
  {
    timeLabel: "30+0",
    type: t`Classic`,
    boardSize: 19,
    timeControl: { initialTimeInSeconds: 1800, incrementPerMove: 0 },
  },
];
