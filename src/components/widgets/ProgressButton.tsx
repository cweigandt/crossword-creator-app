import { useCallback, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import "../../styles/widgets/ProgressButton.css";

type PropTypes = {
  color: string;
  onComplete: () => void;
  text: string;
};

const ProgressButton = ({ color, onComplete, text }: PropTypes) => {
  const [progress, setProgress] = useState(0);
  const intervalRef: any = useRef(null);

  const endInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  }, [setProgress]);

  const handleMouseDown = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 10);
  }, [setProgress]);

  useEffect(() => {
    if (progress === 100) {
      onComplete();
      endInterval();
    }
  }, [progress, onComplete, endInterval]);

  return (
    <div
      className={"progress-button-wrapper"}
      style={{ fontStyle: progress > 0 ? "italic" : "", color }}
      onMouseDown={handleMouseDown}
      onMouseUp={endInterval}
      onMouseOut={endInterval}
    >
      <div
        className={"progress-button-progress"}
        style={{
          width: `${progress}%`,
        }}
      ></div>
      <div className={"progress-button-text"}>{text}</div>
    </div>
  );
};

export default ProgressButton;
