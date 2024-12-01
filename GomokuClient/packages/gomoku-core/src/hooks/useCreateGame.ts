import {
  usePostApiGameRegistered,
  usePostApiGameAnonymous,
} from "@gomoku/api/client/hooks";
import { toaster } from "@gomoku/story";
import { useNavigate } from "@tanstack/react-router";

import type { SwaggerTypes } from "@gomoku/api";

import { Headers } from "@/utils";

interface CreateGameAndNavigateProps {
  authToken: string | undefined;
}

export const useCreateGameAndNavigate = ({
  authToken,
}: CreateGameAndNavigateProps) => {
  const navigate = useNavigate();

  const registeredMutation = usePostApiGameRegistered(
    Headers.getDefaultHeadersWithAuth(authToken!),
  );

  const anonymousMutation = usePostApiGameAnonymous(
    Headers.getDefaultHeaders(),
  );

  return {
    createGame: ({
      boardSize,
      timeControl,
    }: {
      boardSize: number;
      timeControl?: SwaggerTypes.TimeControlDto;
    }) => {
      const mutation = authToken ? registeredMutation : anonymousMutation;

      mutation.mutate(
        {
          boardSize,
          timeControl,
        },
        {
          onSuccess: async (data) => {
            if (data?.gameId) {
              toaster.show("Game created");
              navigate({
                to: `/game/join/${data.gameId}`,
              });
            }
          },
          onError: (error) => {
            console.error("Error creating game:", error);
            toaster.show("Error creating game", "error");
          },
        },
      );
    },
    isLoading: authToken
      ? registeredMutation.isPending
      : anonymousMutation.isPending,
    isError: authToken ? registeredMutation.isError : anonymousMutation.isError,
  };
};
