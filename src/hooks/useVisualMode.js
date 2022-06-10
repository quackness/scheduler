import React, { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(version, replace = false) {

    if (!replace) {
      setHistory(prev => [...prev, version]);
    } else {
      setHistory(prev => [...prev.slice(0, prev.length - 1), version])
      setMode(history[history.length - 1])
    }
  }

  function back() {
    if (history.length >= 2) {
      setHistory(prev => [...prev.slice(0, history.length - 1)]);
    }

  }

  return { mode: history[history.length - 1], transition, back }
};
