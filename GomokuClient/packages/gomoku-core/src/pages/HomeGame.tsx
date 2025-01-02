import {
  useGetApiGameRegisteredAvailableToJoin,
  useGetApiGameAnonymousAvailableToJoin,
  useGetApiGameRegisteredActive,
  useGetApiGameAnonymousActive,
} from "@gomoku/api/client/hooks";
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

import type { SwaggerTypes } from "@gomoku/api";

import { gameTypes } from "@/constants";
import { useAuthToken, useSignalRConnection } from "@/context";
import { useWasmEngine } from "@/context/WasmEngineProvider";
import { useCreateGameAndNavigate } from "@/hooks";
import { Headers } from "@/utils";

export const HomeGame = () => {
  const navigate = useNavigate();
  const { jwtToken } = useAuthToken();
  const router = useRouter();
  const { hubProxy, isConnected, registerEventHandlers } =
    useSignalRConnection();
  const { isEngineReady } = useWasmEngine();

  useEffect(() => {
    if (isEngineReady) {
      console.log("Engine is ready");
    } else {
      console.log("Engine is not ready");
    }
  }, [isEngineReady]);

  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

  const { data: registeredGames } = useGetApiGameRegisteredAvailableToJoin(
    Headers.getDefaultHeadersWithAuth(jwtToken),
    undefined,
    {
      query: {
        enabled: !!jwtToken,
        refetchInterval: 5000,
      },
    },
  );

  const { data: anonymousGames } = useGetApiGameAnonymousAvailableToJoin(
    undefined,
    Headers.getDefaultHeaders(),
    {
      query: {
        enabled: !jwtToken,
        refetchInterval: 5000,
      },
    },
  );

  const { data: registeredActiveGames } = useGetApiGameRegisteredActive(
    Headers.getDefaultHeadersWithAuth(jwtToken),
    undefined,
    {
      query: {
        enabled: !!jwtToken,
        refetchInterval: 5000,
      },
    },
  );

  const { data: anonymousActiveGames } = useGetApiGameAnonymousActive(
    undefined,
    Headers.getDefaultHeaders(),
    {
      query: {
        enabled: !jwtToken,
        refetchInterval: 5000,
      },
    },
  );

  const paginatedGames = jwtToken ? registeredGames : anonymousGames;
  const paginatedActiveGames = jwtToken
    ? registeredActiveGames
    : anonymousActiveGames;

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

  const handleCreateAIGame = (
    selectedBoardSize: number,
    selectedTimeControl?: SwaggerTypes.TimeControlDto,
  ) => {
    navigate({
      to: "/game/join/ai",
      state: {
        game: {
          boardSize: selectedBoardSize,
          timeControl: selectedTimeControl,
        },
      },
    });
  };

  const transformGameData = (
    games: SwaggerTypes.GetAvailableGamesResponse[] | undefined,
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
              onCreate={{
                game: handleCreateGame,
                ai: handleCreateAIGame,
              }}
              loading={{
                game: isLoadingCreateGame,
                ai: false, //TODO: should be based on WASM loader when finished
              }}
              text={{
                game: t`CREATE A GAME`,
                ai: "PLAY LOCAL",
              }}
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
