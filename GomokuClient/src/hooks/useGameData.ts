import { getApiV2GameByGameIdOptions } from "../api/client/@tanstack/react-query.gen.ts";
import { useQuery } from "@tanstack/react-query";
import { createRequestOptions } from "../utils/createRequestOption.ts";

export const useGameData = () => {
  const requestOptions = createRequestOptions({
    path: {
      gameId: "1",
    },
  });

  return useQuery(getApiV2GameByGameIdOptions(requestOptions));
};
