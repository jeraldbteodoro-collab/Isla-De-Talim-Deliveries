import { useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState(null);
  const show = (m) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 2500);
  };
  return [msg, show];
}
