import {
  getApiV1Game,
  getApiV1GameByGameId,
  GetApiV1GameByGameIdResponse,
  GetApiV1GameResponse,
  postApiV1Game,
  PostApiV1GameData,
} from "../api/client";

const UserplayService = {
  async getGameInfo(): Promise<GetApiV1GameResponse | undefined> {
    console.log("Getting game info");
    try {
      const response = await getApiV1Game();
      console.log("RESPONSE DATA", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching game info:", error);
      throw error;
    }
  },

  async userPlayed(move: PostApiV1GameData["body"]): Promise<void> {
    try {
      const response = await postApiV1Game({
        body: move,
        //ToDo: cover header with separate helper class
        headers: { "X-Version": "1.0" },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error posting move:", error);
    }
  },

  async getLastMove(
    gameId: number,
  ): Promise<GetApiV1GameByGameIdResponse | undefined> {
    try {
      const response = await getApiV1GameByGameId({
        path: { gameId },
        //ToDo: cover header with separate helper class
        headers: { "X-Version": "1.0" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching last move:", error);
      throw error;
    }
  },
};

export default UserplayService;
