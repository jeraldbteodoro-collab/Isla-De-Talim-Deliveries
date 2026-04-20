import { N } from "../../constants/theme";

export function Toast({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      position:"fixed", bottom:24, left:"50%",
      transform:"translateX(-50%)",
      background:N, color:"#fff",
      padding:"10px 22px", borderRadius:99,
      fontSize:13, fontWeight:500, zIndex:200,
      boxShadow:"0 4px 20px rgba(0,0,0,0.25)",
      whiteSpace:"nowrap",
    }}>
      {msg}
    </div>
  );
}
