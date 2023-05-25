import { useState } from "react";

const useVisualMode = function (initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // state to keep track change in mode history. starting at the initial mode.

  function transition(newMode, replace = false) {
    // setMode(newMode);
    if (replace === true) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.pop(); // to remove the last mode from history
        return [...newHistory, newMode];
      });
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }

  function back() {
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    // setMode(history[history.length - 1]);
    if (history.length === 1) {
      setHistory([initial]);
    }
  }

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
