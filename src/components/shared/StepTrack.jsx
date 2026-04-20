import { B, G, N } from "../../constants/theme";

export function StepTrack({ steps, current }) {
  return (
    <div>
      {steps.map((s, i) => (
        <div key={s} style={{ display:"flex", gap:12 }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{
              width:28, height:28, borderRadius:"50%",
              background: i <= current ? B : "#E2E8F0",
              display:"flex", alignItems:"center", justifyContent:"center",
              color: i <= current ? "#fff" : "#CBD5E1",
              fontSize:11, fontWeight:700,
              transition:"background 0.4s",
            }}>
              {i < current ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width:2, minHeight:20,
                background: i < current ? B : "#E2E8F0",
                margin:"3px 0", transition:"background 0.4s",
              }}/>
            )}
          </div>
          <div style={{ paddingBottom: i < steps.length - 1 ? 16 : 0, paddingTop:4 }}>
            <div style={{
              fontWeight: i === current ? 700 : 400,
              color: i <= current ? N : "#CBD5E1",
              fontSize:13, transition:"color 0.4s",
            }}>
              {s}
            </div>
            {i === current && <div style={{ fontSize:11, color:B, marginTop:1, fontWeight:500 }}>In progress...</div>}
            {i < current  && <div style={{ fontSize:11, color:G, marginTop:1 }}>Completed</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
