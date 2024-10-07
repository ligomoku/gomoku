import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { SwaggerServices, SwaggerTypes } from "@/api";

export const useCreateGameAndNavigate = (authToken: string) => {
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

  return () => {
    createGame.mutate(
      { boardSize: 19 },
      {
        onSuccess: (data) => {
          if (data?.gameId) {
            navigate({ to: `/game/join/${data.gameId}` });
          } else {
            console.error("Game creation failed: No gameId received");
          }
        },
        onError: (error) => {
          console.error("Error creating game:", error);
        },
      },
    );
  };
};
