import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { SwaggerServices, SwaggerTypes } from "@/api";
import { notification } from "@/shared/ui/notification";
import { TimeControlDto } from "@/api/client";

interface CreateGameAndNavigateProps {
  authToken: string;
  boardSizeProp: SwaggerTypes.CreateGameRequest["boardSize"];
  timeControl?: SwaggerTypes.CreateGameRequest["timeControl"];
}

export const useCreateGameAndNavigate = ({
  authToken,
  boardSizeProp,
  timeControl,
}: CreateGameAndNavigateProps) => {
  const navigate = useNavigate();

  const createGame = useMutation<
    SwaggerTypes.CreateGameResponse | undefined,
    SwaggerTypes.PostApiGameError,
    { boardSize: number; timeControl?: TimeControlDto }
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
    createGame: () => {
      createGame.mutate(
        { boardSize: boardSizeProp, timeControl },
        {
          onSuccess: async (data) => {
            console.log("Game created", data);
            if (data?.gameId) {
              navigate({ to: `/game/join/${data?.gameId}` });
            }
          },
          onError: (error) => {
            console.error("Error creating game:", error);
            notification.show("Error creating game", "error");
          },
        },
      );
    },
    isLoading: createGame.isPending,
    isError: createGame.isError,
  };
};
