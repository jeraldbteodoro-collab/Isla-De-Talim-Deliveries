import { W, G } from "../../constants/theme";

export function Stars({ r }) {
  return (
    <span style={{ fontSize:13 }}>
      <span style={{ color:W }}>{"★".repeat(Math.round(r))}</span>
      <span style={{ color:G }}> {r}</span>
    </span>
  );
}
