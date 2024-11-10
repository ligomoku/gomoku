import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { SwaggerServices, SwaggerTypes } from "@/api";
import { toaster } from "@/shared/ui/toaster";

interface CreateGameAndNavigateProps {
  authToken: string;
}

export const useCreateGameAndNavigate = ({
  authToken,
}: CreateGameAndNavigateProps) => {
  const navigate = useNavigate();

  const createGame = useMutation<
    SwaggerTypes.CreateGameResponse | undefined,
    SwaggerTypes.PostApiGameError,
    { boardSize: number; timeControl?: SwaggerTypes.TimeControlDto }
  >({
    mutationFn: async ({ boardSize, timeControl }) => {
      const response = await SwaggerServices.postApiGame({
        body: { boardSize, timeControl },
        headers: getDefaultHeaders(authToken),
      });

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
