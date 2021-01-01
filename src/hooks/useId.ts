import { useRef } from "react";

function useId(prefix: string): string {
  const ref = useRef(`${prefix}-${Math.random().toString(36).substring(2)}`);

  return ref.current!;
}

export default useId;
