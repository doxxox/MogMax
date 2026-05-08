"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export function useMatchmaking() {
  const [status, setStatus] = useState<"idle" | "searching" | "matched" | "connecting">("idle");
  const [matchId, setMatchId] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<any>(null);

  const startSearch = () => {
    setStatus("searching");
    socket.connect();
    socket.emit("find_match");
  };

  const cancelSearch = () => {
    setStatus("idle");
    socket.emit("cancel_search");
  };

  useEffect(() => {
    socket.on("match_found", (data) => {
      setStatus("matched");
      setMatchId(data.matchId);
      setOpponent(data.opponent);
    });

    return () => {
      socket.off("match_found");
    };
  }, []);

  return { status, matchId, opponent, startSearch, cancelSearch };
}
