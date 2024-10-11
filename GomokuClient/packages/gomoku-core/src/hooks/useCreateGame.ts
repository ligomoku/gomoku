import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getDefaultHeaders } from "@/shared/lib/utils";
import { SwaggerServices, SwaggerTypes } from "@/api";

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

      console.log("Game created", response);

      return response.data;
    },
  });

  return () => {
    createGame.mutate(
      { boardSize: 19 },
      {
        onSuccess: async (data) => {
          console.log("Game created", data);
          if (data?.gameId && data?.playerId) {
            try {
              await new Promise<void>((resolve) => {
                if (data?.playerId) {
                  sessionStorage.setItem("playerID", data?.playerId);
                  resolve();
                }
              });

              navigate({ to: `/game/join/${data?.gameId}` });
            } catch (error) {
              console.error("Failed to set session storage:", error);
            }
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
