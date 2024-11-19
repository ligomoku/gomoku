import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import type { SwaggerTypes } from "@/api";

import { SwaggerServices } from "@/api";
import { toaster } from "@/ui";
import { Headers, fetchAuthFallback } from "@/utils";

interface CreateGameAndNavigateProps {
  authToken: string;
}

export const useCreateGameAndNavigate = ({
  authToken,
}: CreateGameAndNavigateProps) => {
  const navigate = useNavigate();

  const createGame = useMutation<
    SwaggerTypes.CreateGameResponse | undefined,
    SwaggerTypes.PostApiGameRegisteredError,
    { boardSize: number; timeControl?: SwaggerTypes.TimeControlDto }
  >({
    mutationFn: async ({ boardSize, timeControl }) => {
      const response = await fetchAuthFallback(
        authToken,
        async () =>
          SwaggerServices.postApiGameRegistered({
            body: { boardSize, timeControl },
            headers: Headers.getDefaultHeaders(authToken),
          }),
        async () =>
          SwaggerServices.postApiGameAnonymous({
            body: { boardSize, timeControl },
            headers: Headers.getDefaultHeaders(),
          }),
      );

      return response.data;
    },
  });

  return {
    createGame: ({
      boardSize,
      timeControl,
    }: {
      boardSize: number;
      timeControl?: SwaggerTypes.TimeControlDto;
    }) => {
      createGame.mutate(
        { boardSize, timeControl },
        {
          onSuccess: async (data) => {
            if (data?.gameId) {
              toaster.show("Game created");
              navigate({ to: `/game/join/${data?.gameId}` });
            }
          },
          onError: (error) => {
            console.error("Error creating game:", error);
            toaster.show("Error creating game", "error");
          },
        },
      );
    },
    isLoading: createGame.isPending,
    isError: createGame.isError,
  };
};
