import { t } from "@lingui/macro";

export const OnlinePlayersInfo = () => (
  <div className="mt-6 text-center">
    <p className="text-base sm:text-xl">{t`5,247 players online`}</p>
    <p className="text-base sm:text-xl">{t`1,892 games in play`}</p>
  </div>
);
