import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { SwaggerServices, SwaggerTypes } from "@/api";
import { notification } from "@/shared/ui/notification";

interface CreateGameAndNavigateProps {
  authToken: string;
  boardSizeProp: number;
}

export const useCreateGameAndNavigate = ({
  authToken,
  boardSizeProp,
}: CreateGameAndNavigateProps) => {
  const navigate = useNavigate();

  const createGame = useMutation<
    SwaggerTypes.CreateGameResponse | undefined,
    SwaggerTypes.PostApiGameError,
    { boardSize: number }
  >({
    mutationFn: async ({ boardSize }) => {
      const response = await SwaggerServices.postApiGame({
        body: { boardSize },
        headers: getDefaultHeaders(authToken),
      });

      return response.data;
    },
  });

  return {
    createGame: () => {
      createGame.mutate(
        { boardSize: boardSizeProp },
        {
          onSuccess: async (data) => {
            console.log("Game created", data);
            if (data?.gameId) {
              navigate({
                to: `/game/join/${data?.gameId}`,
                //@ts-expect-error
                state: { boardSize: boardSizeProp },
              });
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
