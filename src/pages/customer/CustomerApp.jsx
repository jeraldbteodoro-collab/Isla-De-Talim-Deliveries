import { useState, useRef } from "react";
import { B, BL, BD, N, N2, G, G2, L, L2, S, D, fmt } from "../../constants/theme";
import { STORES, STORE_CATEGORIES } from "../../data/stores";
import { MENUS } from "../../data/menus";
import { STATUSES } from "../../data/orders";
import { useToast } from "../../hooks/useToast";
import { Topbar }      from "../../components/shared/Topbar";
import { Pill }        from "../../components/shared/Pill";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Stars }       from "../../components/shared/Stars";
import { Toast }       from "../../components/shared/Toast";
import { StepTrack }   from "../../components/shared/StepTrack";

export function CustomerApp({ onBack }) {
  const [view, setView]               = useState("home");
  const [store, setStore]             = useState(null);
  const [cart, setCart]               = useState([]);
  const [search, setSearch]           = useState("");
  const [catFilter, setCatFilter]     = useState("All");
  const [menuCat, setMenuCat]         = useState("All");
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderId, setOrderId]         = useState(null);
  const [form, setForm]               = useState({ name:"", phone:"", address:"", payment:"COD", note:"" });
  const [toastMsg, showToast]         = useToast();
  const timer                         = useRef();

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  function addItem(item) {
    setCart(p => {
      const ex = p.find(i => i.id === item.id);
      return ex ? p.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) : [...p, { ...item, qty: 1 }];
    });
    showToast(`${item.name} added to cart`);
  }
  function setQty(id, delta) {
    setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  }
  function placeOrder() {
    const id = `IDT-${Date.now().toString().slice(-6)}`;
    setOrderId(id); setOrderStatus(0); setCart([]); setView("tracking");
    let step = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => { step++; setOrderStatus(step); if (step >= 5) clearInterval(timer.current); }, 4000);
  }

  const filteredStores = STORES.filter(s => {
    const mc = catFilter === "All" || s.cat === catFilter;
    const ms = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  /* ── HOME ── */
  if (view === "home") return (
    <div style={{ minHeight:"100vh", background:L }}>
      <Topbar title="Isla De Talim" onBack={onBack} right={
        cart.length > 0 && (
          <button onClick={() => setView("cart")}
            style={{ background:B, color:"#fff", border:"none", borderRadius:20, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
            <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=20&h=20&fit=crop" alt="" style={{ width:16, height:16, borderRadius:"50%", objectFit:"cover" }}/>
            {cartCount} · {fmt(cartTotal)}
          </button>
        )
      }/>

      {/* Search */}
      <div style={{ background:"#fff", padding:"12px 16px", borderBottom:"1px solid #E2E8F0" }}>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=18&h=18&fit=crop" alt="" style={{ width:18, height:18, borderRadius:4, objectFit:"cover" }}/>
          </span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stores, food, groceries..."
            style={{ width:"100%", padding:"10px 14px 10px 38px", border:"1.5px solid #E2E8F0", borderRadius:10, fontSize:14, boxSizing:"border-box", outline:"none", background:L }}/>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ overflowX:"auto", padding:"10px 16px", background:"#fff", borderBottom:"1px solid #E2E8F0" }}>
        <div style={{ display:"flex", gap:8 }}>
          {STORE_CATEGORIES.map(c => <Pill key={c} text={c} active={catFilter === c} onClick={() => setCatFilter(c)}/>)}
        </div>
      </div>

      {/* Promo banner */}
      <div style={{ margin:"14px 16px", borderRadius:16, overflow:"hidden", position:"relative" }}>
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=180&fit=crop" alt="Promo" style={{ width:"100%", height:130, objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(11,17,26,0.82) 0%,rgba(11,17,26,0.3) 100%)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 20px" }}>
          <div style={{ fontWeight:800, fontSize:17, color:"#fff" }}>First Order Promo!</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.82)", marginTop:4 }}>Free delivery on your first order today</div>
          <div style={{ marginTop:10, background:B, color:"#fff", fontSize:11, fontWeight:700, padding:"5px 14px", borderRadius:99, display:"inline-block" }}>USE CODE: IDT1ST</div>
        </div>
      </div>

      {/* Store list */}
      <div style={{ padding:"0 16px 80px" }}>
        <div style={{ fontWeight:700, fontSize:13, color:N, margin:"4px 0 12px" }}>{filteredStores.length} Stores Near You</div>
        {filteredStores.map(s => (
          <div key={s.id} onClick={() => { setStore(s); setMenuCat("All"); setView("store"); }}
            style={{ background:"#fff", borderRadius:16, marginBottom:14, border:"1px solid #E2E8F0", overflow:"hidden", cursor:"pointer", transition:"box-shadow 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ position:"relative" }}>
              <img src={s.img} alt={s.name} style={{ width:"100%", height:130, objectFit:"cover", display:"block" }}/>
              {!s.open && (
                <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ background:"#fff", color:N, fontWeight:700, fontSize:13, padding:"6px 16px", borderRadius:99 }}>Currently Closed</span>
                </div>
              )}
              {s.open && (
                <div style={{ position:"absolute", top:10, right:10, background:S, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>OPEN</div>
              )}
            </div>
            <div style={{ padding:"12px 14px" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <img src={s.logo} alt="" style={{ width:40, height:40, borderRadius:10, objectFit:"cover", flexShrink:0, border:"2px solid #F1F5F9" }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:N }}>{s.name}</div>
                  <div style={{ fontSize:12, color:G, marginTop:1 }}>{s.desc}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:14, marginTop:10, flexWrap:"wrap", alignItems:"center" }}>
                <Stars r={s.rating}/>
                <span style={{ fontSize:12, color:G }}>🕐 {s.time} min</span>
                <span style={{ fontSize:12, color:G }}>Delivery: {fmt(s.fee)}</span>
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:8 }}>
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toast msg={toastMsg}/>
    </div>
  );

  /* ── STORE MENU ── */
  if (view === "store" && store) {
    const menu   = MENUS[store.id];
    const inCart = id => cart.find(i => i.id === id);
    const items  = menuCat === "All" ? menu.items : menu.items.filter(i => i.cat === menuCat);
    return (
      <div style={{ minHeight:"100vh", background:L }}>
        {/* Store hero */}
        <div style={{ position:"relative" }}>
          <img src={store.img} alt={store.name} style={{ width:"100%", height:180, objectFit:"cover", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)" }}/>
          <button onClick={() => setView("home")} style={{ position:"absolute", top:12, left:12, background:"rgba(255,255,255,0.9)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
          {cart.length > 0 && (
            <button onClick={() => setView("cart")} style={{ position:"absolute", top:12, right:12, background:B, color:"#fff", border:"none", borderRadius:20, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:700 }}>
              Cart ({cartCount})
            </button>
          )}
          <div style={{ position:"absolute", bottom:14, left:14, right:14 }}>
            <div style={{ fontWeight:800, fontSize:18, color:"#fff" }}>{store.name}</div>
            <div style={{ display:"flex", gap:12, marginTop:4, alignItems:"center" }}>
              <Stars r={store.rating}/>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.85)" }}>🕐 {store.time} min</span>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.85)" }}>Delivery: {fmt(store.fee)}</span>
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ overflowX:"auto", background:"#fff", borderBottom:"1px solid #E2E8F0", padding:"8px 16px" }}>
          <div style={{ display:"flex", gap:8 }}>
            {["All", ...menu.cats].map(c => <Pill key={c} text={c} active={menuCat === c} onClick={() => setMenuCat(c)}/>)}
          </div>
        </div>

        <div style={{ padding:"12px 16px", paddingBottom: cart.length > 0 ? 100 : 24 }}>
          {items.map(item => {
            const ci = inCart(item.id);
            return (
              <div key={item.id} style={{ background:"#fff", borderRadius:14, marginBottom:10, border:"1px solid #E2E8F0", display:"flex", gap:0, overflow:"hidden", alignItems:"stretch" }}>
                <div style={{ flex:1, padding:"14px 14px 14px 16px" }}>
                  <div style={{ fontWeight:600, fontSize:14, color:N }}>{item.name}</div>
                  <div style={{ fontSize:12, color:G, marginTop:3, lineHeight:1.5 }}>{item.desc}</div>
                  <div style={{ fontWeight:800, fontSize:15, color:B, marginTop:8 }}>{fmt(item.price)}</div>
                  {!ci ? (
                    <button onClick={() => addItem(item)} style={{ marginTop:10, background:B, color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                      + Add
                    </button>
                  ) : (
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10 }}>
                      <button onClick={() => setQty(item.id, -1)} style={{ width:30, height:30, borderRadius:"50%", background:L2, border:"1px solid #E2E8F0", cursor:"pointer", fontWeight:700, fontSize:16 }}>-</button>
                      <span style={{ fontWeight:700, minWidth:20, textAlign:"center", color:B, fontSize:15 }}>{ci.qty}</span>
                      <button onClick={() => setQty(item.id, 1)} style={{ width:30, height:30, borderRadius:"50%", background:B, color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:16 }}>+</button>
                    </div>
                  )}
                </div>
                <img src={item.img} alt={item.name} style={{ width:110, height:110, objectFit:"cover", alignSelf:"center", margin:"10px 12px 10px 0", borderRadius:10, flexShrink:0 }}/>
              </div>
            );
          })}
        </div>

        {cart.length > 0 && (
          <div style={{ position:"fixed", bottom:0, left:0, right:0, background:B, padding:"14px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ color:"#fff" }}>
              <div style={{ fontWeight:700 }}>{cartCount} item{cartCount !== 1 ? "s" : ""}</div>
              <div style={{ fontSize:12, opacity:0.9 }}>{fmt(cartTotal)} subtotal</div>
            </div>
            <button onClick={() => setView("cart")} style={{ background:"#fff", color:B, border:"none", borderRadius:20, padding:"9px 22px", fontWeight:700, cursor:"pointer" }}>
              View Cart →
            </button>
          </div>
        )}
        <Toast msg={toastMsg}/>
      </div>
    );
  }

  /* ── CART ── */
  if (view === "cart") return (
    <div style={{ minHeight:"100vh", background:L }}>
      <Topbar title="My Cart" onBack={() => setView(store ? "store" : "home")}/>
      {cart.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 20px" }}>
          <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=120&h=120&fit=crop" alt="" style={{ width:90, height:90, borderRadius:"50%", objectFit:"cover", margin:"0 auto 20px" }}/>
          <div style={{ fontWeight:700, fontSize:18, color:N }}>Your cart is empty</div>
          <div style={{ color:G, marginTop:6, fontSize:14 }}>Add items from a store to get started</div>
          <button onClick={() => setView("home")} style={{ marginTop:22, background:B, color:"#fff", border:"none", borderRadius:12, padding:"12px 28px", cursor:"pointer", fontWeight:700, fontSize:14 }}>
            Browse Stores
          </button>
        </div>
      ) : (
        <div style={{ padding:"16px", paddingBottom:100 }}>
          <div style={{ background:"#fff", borderRadius:14, padding:"12px 16px", border:"1px solid #E2E8F0", marginBottom:14, display:"flex", gap:12, alignItems:"center" }}>
            <img src={store?.img} alt="" style={{ width:44, height:44, borderRadius:10, objectFit:"cover" }}/>
            <div>
              <div style={{ fontWeight:700, color:N, fontSize:14 }}>{store?.name}</div>
              <div style={{ color:G, fontSize:12, marginTop:2 }}>Delivery fee: {fmt(store?.fee || 0)}</div>
            </div>
          </div>
          {cart.map(item => (
            <div key={item.id} style={{ background:"#fff", borderRadius:14, padding:"12px 16px", border:"1px solid #E2E8F0", marginBottom:8, display:"flex", gap:12, alignItems:"center" }}>
              <img src={item.img} alt={item.name} style={{ width:56, height:56, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:14, color:N }}>{item.name}</div>
                <div style={{ fontSize:13, color:B, fontWeight:700, marginTop:2 }}>{fmt(item.price)} each</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <button onClick={() => setQty(item.id, -1)} style={{ width:28, height:28, borderRadius:"50%", background:L2, border:"1px solid #E2E8F0", cursor:"pointer", fontWeight:700, fontSize:15 }}>-</button>
                <span style={{ fontWeight:700, minWidth:20, textAlign:"center", color:N }}>{item.qty}</span>
                <button onClick={() => setQty(item.id, +1)} style={{ width:28, height:28, borderRadius:"50%", background:B, color:"#fff", border:"none", cursor:"pointer", fontWeight:700, fontSize:15 }}>+</button>
              </div>
            </div>
          ))}
          <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #E2E8F0", marginTop:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:G, marginBottom:8 }}><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:G, marginBottom:8 }}><span>Delivery Fee</span><span>{fmt(store?.fee || 0)}</span></div>
            <div style={{ borderTop:"1px solid #E2E8F0", paddingTop:10, display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:16, color:N }}>
              <span>Total</span><span style={{ color:B }}>{fmt(cartTotal + (store?.fee || 0))}</span>
            </div>
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", padding:"12px 16px", borderTop:"1px solid #E2E8F0" }}>
          <button onClick={() => setView("checkout")} className="btn-primary" style={{ width:"100%", padding:"15px", fontSize:16 }}>
            Proceed to Checkout — {fmt(cartTotal + (store?.fee || 0))}
          </button>
        </div>
      )}
    </div>
  );

  /* ── CHECKOUT ── */
  if (view === "checkout") {
    const canPlace = form.name && form.phone && form.address;
    return (
      <div style={{ minHeight:"100vh", background:L }}>
        <Topbar title="Checkout" onBack={() => setView("cart")}/>
        <div style={{ padding:"16px", paddingBottom:100 }}>
          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #E2E8F0", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:15, color:N, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
              <img src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=24&h=24&fit=crop" alt="" style={{ width:22, height:22, borderRadius:6, objectFit:"cover" }}/>
              Delivery Details
            </div>
            {[
              { k:"name",    l:"Full Name",        p:"Maria Santos"                       },
              { k:"phone",   l:"Phone Number",     p:"09XX-XXX-XXXX"                      },
              { k:"address", l:"Complete Address", p:"Purok #, Brgy. Name, Talim Island"  },
            ].map(({ k, l, p }) => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, color:G, fontWeight:600 }}>{l}</label>
                <input value={form[k]} onChange={e => setForm(d => ({ ...d, [k]: e.target.value }))} placeholder={p}
                  style={{ display:"block", width:"100%", padding:"11px 14px", border:"1.5px solid #E2E8F0", borderRadius:10, fontSize:14, boxSizing:"border-box", marginTop:5, outline:"none", background:L }}/>
              </div>
            ))}
            <div>
              <label style={{ fontSize:12, color:G, fontWeight:600 }}>Order Note (optional)</label>
              <textarea value={form.note} onChange={e => setForm(d => ({ ...d, note: e.target.value }))}
                placeholder="e.g. No spicy, extra rice, call upon arrival..."
                style={{ display:"block", width:"100%", padding:"11px 14px", border:"1.5px solid #E2E8F0", borderRadius:10, fontSize:14, boxSizing:"border-box", marginTop:5, minHeight:64, resize:"vertical", outline:"none", background:L }}/>
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #E2E8F0", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:15, color:N, marginBottom:14 }}>Payment Method</div>
            {[
              { m:"COD",   label:"Cash on Delivery", img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=32&h=32&fit=crop" },
              { m:"GCash", label:"GCash",            img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=32&fit=crop" },
              { m:"Maya",  label:"Maya",             img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=32&h=32&fit=crop" },
            ].map(({ m, label, img }) => (
              <label key={m} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1.5px solid ${form.payment === m ? B : "#E2E8F0"}`, borderRadius:10, marginBottom:8, cursor:"pointer", background: form.payment === m ? BL : "#fff" }}>
                <input type="radio" name="pay" value={m} checked={form.payment === m} onChange={() => setForm(d => ({ ...d, payment: m }))} style={{ accentColor:B }}/>
                <img src={img} alt={label} style={{ width:28, height:28, borderRadius:6, objectFit:"cover" }}/>
                <span style={{ fontWeight: form.payment === m ? 700 : 500, color:N, fontSize:14 }}>{label}</span>
              </label>
            ))}
          </div>

          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #E2E8F0" }}>
            <div style={{ fontWeight:700, fontSize:15, color:N, marginBottom:12 }}>Order Summary</div>
            {cart.map(i => (
              <div key={i.id} style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:G, marginBottom:7, alignItems:"center", gap:8 }}>
                <img src={i.img} alt="" style={{ width:28, height:28, borderRadius:6, objectFit:"cover", flexShrink:0 }}/>
                <span style={{ flex:1 }}>{i.name} × {i.qty}</span>
                <span style={{ fontWeight:600, color:N }}>{fmt(i.price * i.qty)}</span>
              </div>
            ))}
            <div style={{ borderTop:"1px solid #E2E8F0", paddingTop:10, marginTop:6 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:G, marginBottom:6 }}><span>Delivery</span><span>{fmt(store?.fee || 0)}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:16, color:N }}>
                <span>Total</span><span style={{ color:B }}>{fmt(cartTotal + (store?.fee || 0))}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", padding:"12px 16px", borderTop:"1px solid #E2E8F0" }}>
          <button onClick={canPlace ? placeOrder : undefined}
            style={{ width:"100%", background: canPlace ? B : "#CBD5E1", color:"#fff", border:"none", borderRadius:12, padding:"15px", fontWeight:700, fontSize:16, cursor: canPlace ? "pointer" : "not-allowed" }}>
            Place Order
          </button>
        </div>
      </div>
    );
  }

  /* ── TRACKING ── */
  if (view === "tracking") return (
    <div style={{ minHeight:"100vh", background:L }}>
      <Topbar title="Track Your Order" onBack={() => { clearInterval(timer.current); setView("home"); setStore(null); }}/>
      <div style={{ padding:"16px" }}>
        <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #E2E8F0", textAlign:"center", marginBottom:12 }}>
          <div style={{ fontSize:11, color:G, fontWeight:600, letterSpacing:"0.8px" }}>ORDER ID</div>
          <div style={{ fontWeight:900, fontSize:22, color:N, marginTop:4 }}>#{orderId}</div>
          <div style={{ marginTop:10 }}><StatusBadge status={STATUSES[orderStatus]}/></div>
          <div style={{ fontSize:12, color:G, marginTop:10 }}>Estimated arrival: 25-35 minutes</div>
        </div>

        <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #E2E8F0", marginBottom:12 }}>
          <div style={{ fontWeight:700, fontSize:14, color:N, marginBottom:14 }}>Order Progress</div>
          <StepTrack steps={STATUSES} current={orderStatus}/>
        </div>

        {orderStatus >= 3 && (
          <div style={{ background:"#fff", borderRadius:14, padding:"18px", border:"1px solid #E2E8F0", marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:14, color:N, marginBottom:12 }}>Your Rider</div>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" alt="Rider" style={{ width:52, height:52, borderRadius:"50%", objectFit:"cover" }}/>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:N }}>Jun Dela Cruz</div>
                <div style={{ fontSize:12, color:G, marginTop:2 }}>⭐ 4.9 · Honda Click 125i · ABC-1234</div>
              </div>
              <button style={{ marginLeft:"auto", background:BL, border:`1px solid ${B}30`, borderRadius:20, padding:"8px 16px", color:B, fontWeight:600, fontSize:13, cursor:"pointer" }}>
                Call Rider
              </button>
            </div>
          </div>
        )}

        <div style={{ borderRadius:14, overflow:"hidden", marginBottom:12, position:"relative" }}>
          <img src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=800&h=240&fit=crop" alt="Map" style={{ width:"100%", height:180, objectFit:"cover", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.25)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6 }}>
            <div style={{ background:"#fff", borderRadius:12, padding:"10px 20px", textAlign:"center" }}>
              <div style={{ fontWeight:700, fontSize:13, color:N }}>Live GPS Tracking</div>
              <div style={{ fontSize:12, color:G, marginTop:2 }}>Rider is {orderStatus >= 4 ? "on the way to you" : "at the store"}</div>
            </div>
          </div>
        </div>

        {orderStatus === 5 && (
          <div style={{ background:"#fff", border:"1.5px solid #6EE7B7", borderRadius:14, padding:"24px", textAlign:"center" }}>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop" alt="Delivered" style={{ width:80, height:80, borderRadius:"50%", objectFit:"cover", margin:"0 auto 14px" }}/>
            <div style={{ fontWeight:800, fontSize:20, color:"#065F46" }}>Order Delivered!</div>
            <div style={{ fontSize:13, color:"#059669", marginTop:6, lineHeight:1.6 }}>Enjoy your meal! Thank you for ordering with Isla De Talim Deliveries.</div>
            <button onClick={() => { clearInterval(timer.current); setView("home"); setStore(null); }}
              style={{ marginTop:18, background:S, color:"#fff", border:"none", borderRadius:12, padding:"12px 32px", fontWeight:700, fontSize:14, cursor:"pointer" }}>
              Rate &amp; Order Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
  return null;
}
