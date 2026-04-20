import { B, G } from "../../constants/theme";

export function Pill({ text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:"6px 14px", borderRadius:99,
        border:`1.5px solid ${active ? B : "#E2E8F0"}`,
        background: active ? B : "#fff",
        color: active ? "#fff" : G,
        fontSize:12, fontWeight: active ? 600 : 400,
        cursor:"pointer", whiteSpace:"nowrap",
      }}
    >
      {text}
    </button>
  );
}
