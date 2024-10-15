import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { SwaggerServices, SwaggerTypes } from "@/api";
import { notification } from "@/shared/ui/notification";

export const useCreateGameAndNavigate = (authToken: string) => {
  const navigate = useNavigate();
  sessionStorage.removeItem("playerID");

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
        { boardSize: 19 },
        {
          onSuccess: async (data) => {
            console.log("Game created", data);
            if (data?.gameId) {
              navigate({ to: `/game/join/${data?.gameId}` });
            }
          },
          onError: (error) => {
            console.error("Error creating game:", error);
            notification.show("Error creating game");
          },
        },
      );
    },
    isLoading: createGame.isPending,
    isError: createGame.isError,
  };
};
