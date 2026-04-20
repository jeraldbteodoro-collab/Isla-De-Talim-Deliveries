const STATUS_COLORS = {
  "Order Placed":    ["#EFF6FF","#1D4ED8"],
  "Confirmed":       ["#F0FDF4","#15803D"],
  "Preparing":       ["#FFFBEB","#92400E"],
  "Ready for Pickup":["#FAF5FF","#7E22CE"],
  "Out for Delivery":["#FFF7ED","#C2410C"],
  "Delivered":       ["#F0FDF4","#15803D"],
};

export function StatusBadge({ status }) {
  const [bg, color] = STATUS_COLORS[status] || ["#F1F5F9","#475569"];
  return (
    <span style={{
      background:bg, color,
      padding:"3px 10px", borderRadius:99,
      fontSize:11, fontWeight:600,
    }}>
      {status}
    </span>
  );
}
