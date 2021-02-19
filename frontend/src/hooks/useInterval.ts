import { useEffect, useRef } from 'react';

type Callback = () => any;

interface UseIntervalParams {
  callback: Callback;
  delay: number;
}

// Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/#extracting-a-hook
// This is used to execute a callback every <delay> ms
export function useInterval(params: UseIntervalParams) {
  const { callback, delay } = params;
  // eslint-disable-next-line
  const savedCallback = useRef<Callback>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
