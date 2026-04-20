import { N } from "../../constants/theme";

export function Topbar({ title, onBack, right }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:8,
      padding:"12px 16px", background:"#fff",
      borderBottom:"1px solid #E2E8F0",
      position:"sticky", top:0, zIndex:50,
    }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:N, padding:"2px 6px", lineHeight:1 }}
        >←</button>
      )}
      <span style={{ flex:1, fontWeight:700, fontSize:15, color:N }}>{title}</span>
      {right}
    </div>
  );
}
