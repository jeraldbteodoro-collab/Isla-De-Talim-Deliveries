import { useState } from "react";
import { B, BL, N, G, L, L2, S, SL, W, WL, D, DL, fmt } from "../../constants/theme";
import { MENUS } from "../../data/menus";
import { SEED_ORDERS, STATUSES } from "../../data/orders";
import { useToast } from "../../hooks/useToast";
import { Topbar }      from "../../components/shared/Topbar";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Toast }       from "../../components/shared/Toast";

const ADVANCE_LABELS = ["Confirm Order","Start Preparing","Mark Ready","Hand to Rider","Mark Delivered"];
const NAVS = [
  { k:"orders",    i:"https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=32&h=32&fit=crop", l:"Orders"    },
  { k:"menu",      i:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=32&h=32&fit=crop",    l:"Menu"      },
  { k:"analytics", i:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=32&h=32&fit=crop",    l:"Analytics" },
  { k:"settings",  i:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=32&fit=crop",    l:"Settings"  },
];

export function MerchantApp({ onBack }) {
  const [view, setView]           = useState("orders");
  const [orders, setOrders]       = useState(SEED_ORDERS);
  const [menuItems, setMenuItems] = useState(MENUS[1].items);
  const [showAdd, setShowAdd]     = useState(false);
  const [newItem, setNewItem]     = useState({ name:"", price:"", desc:"", cat:"" });
  const [toastMsg, showToast]     = useToast();

  const pending = orders.filter(o => o.status < 1).length;
  const active  = orders.filter(o => o.status >= 1 && o.status < 5).length;
  const done    = orders.filter(o => o.status === 5).length;
  const revenue = orders.filter(o => o.status === 5).reduce((s, o) => s + o.total, 0);

  function advance(id) {
    setOrders(p => p.map(o => o.id === id && o.status < 5 ? { ...o, status: o.status + 1 } : o));
    showToast("Order status updated!");
  }
  function addMenuItem() {
    if (!newItem.name || !newItem.price) return;
    setMenuItems(p => [...p, { id: Date.now(), img: MENUS[1].items[0].img, ...newItem, price: Number(newItem.price) }]);
    setNewItem({ name:"", price:"", desc:"", cat:"" });
    setShowAdd(false);
    showToast("Menu item added!");
  }

  return (
    <div style={{ minHeight:"100vh", background:L }}>
      {/* Hero banner */}
      <div style={{ position:"relative" }}>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=160&fit=crop" alt="" style={{ width:"100%", height:130, objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(11,17,26,0.88),rgba(184,61,6,0.7))", display:"flex", alignItems:"center", padding:"0 16px", gap:12 }}>
          <button onClick={onBack} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:"50%", width:34, height:34, color:"#fff", cursor:"pointer", fontSize:18, flexShrink:0 }}>←</button>
          <div>
            <div style={{ fontWeight:800, fontSize:18, color:"#fff" }}>Merchant Dashboard</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)", marginTop:2 }}>Talim Ihaw-Ihaw · Purok 2, Brgy. Talim</div>
          </div>
          {pending > 0 && <span style={{ marginLeft:"auto", background:D, color:"#fff", borderRadius:99, padding:"4px 12px", fontSize:12, fontWeight:700 }}>{pending} new</span>}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background:"#fff", padding:"14px 16px", borderBottom:"1px solid #E2E8F0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[
            { n:pending,     l:"Pending",   c:D,  bg:DL },
            { n:active,      l:"Active",    c:W,  bg:WL },
            { n:done,        l:"Delivered", c:S,  bg:SL },
            { n:fmt(revenue),l:"Revenue",   c:B,  bg:BL },
          ].map(({ n, l, c, bg }) => (
            <div key={l} style={{ textAlign:"center", padding:"10px 6px", background:bg, borderRadius:10 }}>
              <div style={{ fontWeight:800, fontSize:15, color:c }}>{n}</div>
              <div style={{ fontSize:10, color:G, marginTop:2, fontWeight:600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ background:"#fff", borderBottom:"1px solid #E2E8F0", display:"flex" }}>
        {NAVS.map(n => (
          <button key={n.k} onClick={() => setView(n.k)}
            style={{ flex:1, padding:"10px 4px", border:"none", background:"none", cursor:"pointer", borderBottom:`2.5px solid ${view === n.k ? B : "transparent"}`, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <img src={n.i} alt="" style={{ width:22, height:22, borderRadius:6, objectFit:"cover", opacity: view === n.k ? 1 : 0.5 }}/>
            <span style={{ fontSize:10, color: view === n.k ? B : G, fontWeight: view === n.k ? 700 : 400 }}>{n.l}</span>
          </button>
        ))}
      </div>

      {/* ── ORDERS ── */}
      {view === "orders" && (
        <div style={{ padding:"14px 16px 24px" }}>
          {orders.map(order => (
            <div key={order.id} style={{ background:"#fff", borderRadius:14, marginBottom:12, border:"1px solid #E2E8F0", overflow:"hidden" }}>
              <div style={{ padding:"11px 16px", borderBottom:"1px solid #F1F5F9", display:"flex", justifyContent:"space-between", alignItems:"center", background: order.status === 0 ? `${D}0C` : "#fff" }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontWeight:700, color:N, fontSize:13 }}>#{order.id}</span>
                  <StatusBadge status={STATUSES[order.status]}/>
                </div>
                <span style={{ fontSize:11, color:G }}>{order.time}</span>
              </div>
              <div style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", gap:10, marginBottom:10 }}>
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop" alt="" style={{ width:38, height:38, borderRadius:"50%", objectFit:"cover" }}/>
                  <div>
                    <div style={{ fontWeight:700, color:N, fontSize:13 }}>{order.customer}</div>
                    <div style={{ fontSize:12, color:G, marginTop:1 }}>{order.address}</div>
                    <div style={{ fontSize:11, color:G }}>{order.phone}</div>
                  </div>
                </div>
                <div style={{ background:L, borderRadius:8, padding:"10px 12px", marginBottom:12 }}>
                  {order.items.map((it, idx) => (
                    <div key={idx} style={{ fontSize:12, color:G, marginBottom:4, display:"flex", justifyContent:"space-between" }}>
                      <span>{it.name} × {it.qty}</span>
                      <span style={{ fontWeight:600, color:N }}>{fmt(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontWeight:800, color:N, fontSize:16 }}>{fmt(order.total)}</div>
                    <div style={{ fontSize:11, color:G, marginTop:1 }}>{order.payment}</div>
                  </div>
                  {order.status < 5 ? (
                    <button onClick={() => advance(order.id)}
                      style={{ background:B, color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, cursor:"pointer", fontSize:13 }}>
                      {ADVANCE_LABELS[order.status]}
                    </button>
                  ) : (
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:S, fontWeight:700, fontSize:13 }}>
                      <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=24&h=24&fit=crop" alt="" style={{ width:22, height:22, borderRadius:"50%", objectFit:"cover" }}/>
                      Complete
                    </div>
                  )}
                </div>
                {order.note ? (
                  <div style={{ fontSize:12, background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:8, padding:"7px 12px", marginTop:10, color:"#92400E" }}>
                    Note: {order.note}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MENU ── */}
      {view === "menu" && (
        <div style={{ padding:"14px 16px 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontWeight:700, color:N, fontSize:15 }}>{menuItems.length} Items</div>
            <button onClick={() => setShowAdd(!showAdd)}
              style={{ background:B, color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, cursor:"pointer", fontSize:13 }}>
              + Add Item
            </button>
          </div>
          {showAdd && (
            <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:`2px solid ${B}`, marginBottom:14 }}>
              <div style={{ fontWeight:700, color:N, marginBottom:14, fontSize:15 }}>New Menu Item</div>
              {[{k:"name",l:"Item Name"},{k:"price",l:"Price (₱)"},{k:"cat",l:"Category"},{k:"desc",l:"Description"}].map(({ k, l }) => (
                <div key={k} style={{ marginBottom:10 }}>
                  <label style={{ fontSize:12, color:G, fontWeight:600 }}>{l}</label>
                  <input value={newItem[k]} onChange={e => setNewItem(d => ({ ...d, [k]: e.target.value }))}
                    style={{ display:"block", width:"100%", padding:"10px 12px", border:"1.5px solid #E2E8F0", borderRadius:10, fontSize:13, boxSizing:"border-box", marginTop:5, outline:"none", background:L }}/>
                </div>
              ))}
              <div style={{ display:"flex", gap:8, marginTop:12 }}>
                <button onClick={addMenuItem} style={{ flex:1, background:B, color:"#fff", border:"none", borderRadius:10, padding:"11px", fontWeight:700, cursor:"pointer" }}>Add Item</button>
                <button onClick={() => setShowAdd(false)} style={{ flex:1, background:L2, border:"none", borderRadius:10, padding:"11px", fontWeight:600, cursor:"pointer", color:G }}>Cancel</button>
              </div>
            </div>
          )}
          {menuItems.map(item => (
            <div key={item.id} style={{ background:"#fff", borderRadius:14, padding:"12px 14px", border:"1px solid #E2E8F0", marginBottom:8, display:"flex", gap:12, alignItems:"center" }}>
              <img src={item.img} alt={item.name} style={{ width:56, height:56, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:N }}>{item.name}</div>
                <div style={{ fontSize:11, color:G, marginTop:2 }}>{item.desc}</div>
                <div style={{ fontWeight:800, color:B, fontSize:14, marginTop:4 }}>{fmt(item.price)}</div>
              </div>
              <button onClick={() => { setMenuItems(p => p.filter(i => i.id !== item.id)); showToast("Item removed"); }}
                style={{ background:DL, border:"1px solid #FECACA", borderRadius:8, padding:"6px 12px", color:D, fontSize:12, fontWeight:600, cursor:"pointer" }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── ANALYTICS ── */}
      {view === "analytics" && (
        <div style={{ padding:"16px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            {[
              { l:"Today's Revenue",  v:fmt(revenue), img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop" },
              { l:"Total Orders",     v:orders.length, img:"https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=60&h=60&fit=crop" },
              { l:"Avg. Order Value", v:fmt(orders.length ? Math.round(orders.reduce((s,o)=>s+o.total,0)/orders.length) : 0), img:"https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=60&h=60&fit=crop" },
              { l:"Completion Rate",  v:`${orders.length ? Math.round(done/orders.length*100) : 0}%`, img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&h=60&fit=crop" },
            ].map(({ l, v, img }) => (
              <div key={l} style={{ background:"#fff", borderRadius:14, padding:"14px", border:"1px solid #E2E8F0", display:"flex", gap:12, alignItems:"center" }}>
                <img src={img} alt="" style={{ width:44, height:44, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
                <div>
                  <div style={{ fontWeight:800, fontSize:19, color:N }}>{v}</div>
                  <div style={{ fontSize:11, color:G, marginTop:2 }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #E2E8F0", marginBottom:12 }}>
            <div style={{ fontWeight:700, color:N, fontSize:14, marginBottom:14 }}>Orders by Status</div>
            {[{l:"New / Pending",n:pending,c:D},{l:"In Progress",n:active,c:W},{l:"Delivered",n:done,c:S}].map(({ l, n, c }) => (
              <div key={l} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
                  <span style={{ color:G, fontWeight:500 }}>{l}</span>
                  <span style={{ fontWeight:700, color:N }}>{n}</span>
                </div>
                <div style={{ background:L2, borderRadius:99, height:8 }}>
                  <div style={{ background:c, height:"100%", borderRadius:99, width:`${orders.length ? Math.round(n/orders.length*100) : 0}%`, transition:"width 1s" }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #E2E8F0" }}>
            <div style={{ fontWeight:700, color:N, fontSize:14, marginBottom:14 }}>Top Selling Items</div>
            {[
              { name:"Pork Inasal",       count:24, rev:2880, img:"https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=44&h=44&fit=crop" },
              { name:"Chicken BBQ Combo", count:18, rev:2070, img:"https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=44&h=44&fit=crop" },
              { name:"Liempo sa Ihaw",    count:15, rev:2100, img:"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=44&h=44&fit=crop" },
            ].map((item, i, arr) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"center", padding:"10px 0", borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <img src={item.img} alt={item.name} style={{ width:40, height:40, borderRadius:8, objectFit:"cover" }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:13, color:N }}>{item.name}</div>
                  <div style={{ fontSize:11, color:G }}>{item.count} orders</div>
                </div>
                <div style={{ fontWeight:700, color:B, fontSize:13 }}>{fmt(item.rev)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SETTINGS ── */}
      {view === "settings" && (
        <div style={{ padding:"16px" }}>
          <div style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid #E2E8F0", marginBottom:14 }}>
            <div style={{ position:"relative" }}>
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=120&fit=crop" alt="" style={{ width:"100%", height:100, objectFit:"cover", display:"block" }}/>
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px", display:"flex", gap:12, alignItems:"flex-end" }}>
                <img src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=56&h=56&fit=crop" alt="" style={{ width:52, height:52, borderRadius:12, objectFit:"cover", border:"2px solid #fff" }}/>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:"#fff" }}>Talim Ihaw-Ihaw</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)" }}>BBQ &amp; Grills · Purok 2, Brgy. Talim</div>
                </div>
                <span style={{ marginLeft:"auto", background:"#10B981", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>OPEN</span>
              </div>
            </div>
            {[
              {l:"Store Hours",      v:"7:00 AM – 9:00 PM"  },
              {l:"Contact Number",   v:"0917-XXX-XXXX"       },
              {l:"Minimum Order",    v:"₱150"                },
              {l:"Delivery Coverage",v:"All of Talim Island" },
              {l:"Prep Time",        v:"20–30 minutes"       },
              {l:"Payment Accepted", v:"COD, GCash, Maya"    },
            ].map(({ l, v }, i, arr) => (
              <div key={l} style={{ padding:"13px 16px", borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none", display:"flex", justifyContent:"space-between", fontSize:13 }}>
                <span style={{ color:G, fontWeight:500 }}>{l}</span>
                <span style={{ fontWeight:600, color:N }}>{v}</span>
              </div>
            ))}
          </div>
          <button style={{ width:"100%", background:SL, border:"1.5px solid #6EE7B7", borderRadius:12, padding:"14px", fontWeight:700, color:"#065F46", cursor:"pointer", marginBottom:10, fontSize:14 }}>
            Toggle Store Open / Closed
          </button>
          <button style={{ width:"100%", background:DL, border:"1.5px solid #FECACA", borderRadius:12, padding:"14px", fontWeight:700, color:D, cursor:"pointer", fontSize:14 }}>
            Temporarily Pause Orders
          </button>
        </div>
      )}

      <Toast msg={toastMsg}/>
    </div>
  );
}
