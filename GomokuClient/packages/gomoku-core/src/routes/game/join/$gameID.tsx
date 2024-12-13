import {
  useGetApiGameRegisteredGameidHistory,
  useGetApiGameAnonymousGameidHistory,
  usePostApiGameRegisteredGameidJoin,
  usePostApiGameAnonymousGameidJoin,
} from "@gomoku/api/client/hooks";
import { LoadingOverlay, toaster, AlertDialog } from "@gomoku/story";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";

import type { SwaggerTypes } from "@gomoku/api";

import { useAuthToken } from "@/context";
import JoinGame from "@/pages/JoinGame";
import { Headers } from "@/utils";

const JoinGameComponent = ({
  gameID,
}: {
  gameID: SwaggerTypes.CreateGameResponse["gameId"];
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { jwtToken, anonymousSessionId } = useAuthToken();
  const joinAttemptedRef = useRef(false);

  const { data: registeredGameHistory, isError: isRegisteredError } =
    useGetApiGameRegisteredGameidHistory(
      gameID,
      Headers.getDefaultHeadersWithAuth(jwtToken),
      {
        query: {
          enabled: !!jwtToken,
        },
      },
    );

  const { data: anonymousGameHistory, isError: isAnonymousError } =
    useGetApiGameAnonymousGameidHistory(gameID, Headers.getDefaultHeaders(), {
      query: {
        enabled: !jwtToken,
      },
    });

  const registeredJoinMutation = usePostApiGameRegisteredGameidJoin(
    gameID,
    Headers.getDefaultHeadersWithAuth(jwtToken),
  );

  const anonymousJoinMutation = usePostApiGameAnonymousGameidJoin(
    gameID,
    Headers.getDefaultHeaders(),
  );

  const gameHistory = jwtToken ? registeredGameHistory : anonymousGameHistory;
  const isError = jwtToken ? isRegisteredError : isAnonymousError;

  const joinGame = useCallback(async () => {
    // Prevent multiple join attempts
    if (
      joinAttemptedRef.current ||
      !gameHistory ||
      (gameHistory.players.black && gameHistory.players.white)
    ) {
      return;
    }

    setIsJoining(true);
    joinAttemptedRef.current = true;

    try {
      if (jwtToken) {
        // TODO: Handle Kubb migration issue in v3
        await registeredJoinMutation.mutateAsync(undefined as never);
      } else if (anonymousSessionId) {
        await anonymousJoinMutation.mutateAsync({
          playerId: anonymousSessionId,
        });
      }
    } catch (err) {
      console.error("Error joining game:", err);
      toaster.show("Error joining game", "error");
      joinAttemptedRef.current = false; // Allow retry on error
    } finally {
      setIsJoining(false);
    }
  }, [
    gameHistory, 
    jwtToken, 
    anonymousSessionId, 
    registeredJoinMutation, 
    anonymousJoinMutation
  ]);

  useEffect(() => {
    if (!gameHistory || joinAttemptedRef.current) return;
    joinGame();
  }, [gameHistory, joinGame]);

  useEffect(() => {
    if (isError) setShowError(true);
  }, [isError]);

  if (showError) {
    return (
      <AlertDialog
        title="Game Not Found"
        secondaryTitle="This game doesn't exist or might have been deleted"
        text="Would you like to go back to the home page?"
        acceptButtonText="Go to Home"
        declineButtonText="Stay Here"
        onAccept={() => {
          navigate({ to: "/" });
        }}
        onDecline={() => {
          setShowError(false);
        }}
      />
    );
  }

  if (!gameHistory || isJoining) {
    return <LoadingOverlay isVisible />;
  }

  return <JoinGame gameHistory={gameHistory} />;
};

export const Route = createFileRoute("/game/join/$gameID")({
  component: () => {
    const { gameID } = Route.useParams();
    return <JoinGameComponent gameID={gameID!} />;
  },
});