import { SwaggerServices } from "@gomoku/api";
import { Board } from "@gomoku/story";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { SwaggerTypes } from "@gomoku/api";

import { Headers } from "@/utils";

export const Test = () => {
  const { data, error } = useRapfiEngine();

  useEffect(() => {
    console.log(data);
    console.error(error);
  }, [data, error]);

  return (
    <Board
      size={19}
      onTileClick={() => alert("hello")}
      tiles={Array.from({ length: 19 }, () => Array(19).fill(null))}
    />
  );
};

const useRapfiEngine = () =>
  useQuery<
    SwaggerTypes.GetApiV1RapfiTestResponse,
    SwaggerTypes.GetApiV1RapfiTestError
  >({
    queryKey: ["rapfiEngineTest", null],
    queryFn: async () => {
      const response = await SwaggerServices.getApiV1RapfiTest({
        headers: Headers.getDefaultHeaders(),
      });

      if (!response.data) {
        throw new Error("Invalid game data received");
      }

      return response.data;
    },
    refetchInterval: 5000,
  });
