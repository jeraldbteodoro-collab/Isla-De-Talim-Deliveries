import { B, BD, B2, N, N2, G, G2, L, S } from "../constants/theme";

export function Landing({ onPortal }) {
  return (
    <div style={{ minHeight:"100vh", background:L, fontFamily:"inherit" }}>

      {/* ══════ NAVBAR ══════ */}
      <nav style={{ background:"#fff", borderBottom:"1px solid #E2E8F0", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=36&h=36&fit=crop" alt="logo" style={{ width:36, height:36, borderRadius:8, objectFit:"cover" }}/>
          <div>
            <div style={{ fontWeight:800, fontSize:14, color:N, lineHeight:1.1 }}>Isla De Talim</div>
            <div style={{ fontSize:10, color:B, fontWeight:700, letterSpacing:"0.8px" }}>DELIVERIES</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => onPortal("customer")} style={{ padding:"8px 16px", border:`1.5px solid ${B}`, borderRadius:8, background:"#fff", color:B, fontWeight:600, fontSize:13, cursor:"pointer" }}>Log In</button>
          <button onClick={() => onPortal("customer")} style={{ padding:"8px 16px", border:"none", borderRadius:8, background:B, color:"#fff", fontWeight:600, fontSize:13, cursor:"pointer" }}>Order Now</button>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=1400&h=560&fit=crop" alt="Food" style={{ width:"100%", height:520, objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(11,17,26,0.85) 0%, rgba(184,61,6,0.6) 100%)" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 24px", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.35)", borderRadius:99, padding:"6px 20px", fontSize:11, color:"#fff", fontWeight:700, marginBottom:20, letterSpacing:"1.2px" }}>
            SERVING ALL BARANGAYS · TALIM ISLAND, BINANGONAN, RIZAL
          </div>
          <h1 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:"0 0 16px", maxWidth:700 }}>
            Fresh. Fast.<br/>
            <span style={{ color:B2 }}>Island Delivered.</span>
          </h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.82)", maxWidth:460, lineHeight:1.65, margin:"0 0 28px" }}>
            Order food, groceries, and more from your favorite Talim Island businesses — delivered straight to your door.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
            <button onClick={() => onPortal("customer")} style={{ padding:"14px 32px", background:B, color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:16, cursor:"pointer", boxShadow:"0 8px 28px rgba(232,82,10,0.5)" }}>
              Order Food Now
            </button>
            <button onClick={() => onPortal("rider")} style={{ padding:"14px 28px", background:"rgba(255,255,255,0.12)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.45)", borderRadius:12, fontWeight:600, fontSize:15, cursor:"pointer" }}>
              Become a Rider
            </button>
          </div>
          <div style={{ display:"flex", gap:32, marginTop:36 }}>
            {[["1,200+","Orders Done"],["45+","Partner Stores"],["30+","Active Riders"]].map(([v, l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontWeight:800, fontSize:24, color:"#fff" }}>{v}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ ROLE SELECTOR ══════ */}
      <div style={{ background:"#fff", padding:"64px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <div style={{ fontSize:11, fontWeight:700, color:B, letterSpacing:"1.8px", marginBottom:12 }}>GET STARTED</div>
            <h2 style={{ fontSize:32, fontWeight:900, color:N, margin:"0 0 12px" }}>How are you accessing?</h2>
            <p style={{ color:G, fontSize:15, margin:0 }}>Choose your role to enter the right portal.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:20 }}>
            {[
              { role:"customer", label:"Customer",            sub:"Browse local stores, order food & essentials, and track your delivery live.", img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&h=200&fit=crop", accent:"#2563EB", accentLight:"#EFF6FF", badge:"Shop & Order"   },
              { role:"merchant", label:"Business / Merchant", sub:"List your store, manage your menu, and handle incoming customer orders.",      img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=200&fit=crop", accent:S,         accentLight:"#ECFDF5", badge:"Manage Store"  },
              { role:"rider",    label:"Rider / Deliveryman", sub:"Accept delivery jobs nearby, navigate routes, and track your daily earnings.", img:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=200&fit=crop", accent:B,         accentLight:"#FFF4EE", badge:"Earn & Deliver" },
            ].map(({ role, label, sub, img, accent, accentLight, badge }) => (
              <button key={role} onClick={() => onPortal(role)}
                style={{ display:"flex", flexDirection:"column", border:"2px solid #E2E8F0", borderRadius:18, overflow:"hidden", cursor:"pointer", background:"#fff", textAlign:"left", padding:0, transition:"border-color 0.2s, transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ position:"relative" }}>
                  <img src={img} alt={label} style={{ width:"100%", height:150, objectFit:"cover" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}/>
                  <span style={{ position:"absolute", top:12, left:12, background:accentLight, color:accent, fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:99 }}>
                    {badge}
                  </span>
                </div>
                <div style={{ padding:"18px 20px 22px", flex:1, display:"flex", flexDirection:"column" }}>
                  <div style={{ fontWeight:800, fontSize:16, color:N, marginBottom:8 }}>{label}</div>
                  <div style={{ fontSize:13, color:G, lineHeight:1.65, marginBottom:18, flex:1 }}>{sub}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, color:accent, fontWeight:700, fontSize:13 }}>
                    Continue <span style={{ fontSize:16 }}>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ FEATURES ══════ */}
      <div style={{ background:L, padding:"60px 24px", borderTop:"1px solid #E2E8F0" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:11, fontWeight:700, color:B, letterSpacing:"1.8px", marginBottom:12 }}>WHY IDT</div>
            <h2 style={{ fontSize:28, fontWeight:800, color:N, margin:0 }}>Built for Talim Island</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:16 }}>
            {[
              { img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=160&fit=crop", t:"Lightning Fast", d:"Average 25-35 min delivery time island-wide" },
              { img:"https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=300&h=160&fit=crop", t:"Island-Wide Coverage", d:"All barangays of Talim covered daily" },
              { img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=160&fit=crop", t:"Lowest Delivery Fees", d:"Fees starting at just ₱25" },
              { img:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=160&fit=crop", t:"100% Local", d:"Support island businesses you trust" },
            ].map(f => (
              <div key={f.t} style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid #E2E8F0" }}>
                <img src={f.img} alt={f.t} style={{ width:"100%", height:110, objectFit:"cover" }}/>
                <div style={{ padding:"14px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:N, marginBottom:5 }}>{f.t}</div>
                  <div style={{ fontSize:12, color:G, lineHeight:1.55 }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ HOW IT WORKS ══════ */}
      <div style={{ background:"#fff", padding:"60px 24px" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <div style={{ fontSize:11, fontWeight:700, color:B, letterSpacing:"1.8px", marginBottom:12 }}>SIMPLE PROCESS</div>
            <h2 style={{ fontSize:28, fontWeight:800, color:N, margin:0 }}>Order in 4 easy steps</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { n:"01", t:"Browse Stores",   d:"Search 45+ local stores by category or name",      img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&h=80&fit=crop" },
              { n:"02", t:"Add to Cart",     d:"Pick your favorites and customize your order",       img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop" },
              { n:"03", t:"Secure Checkout", d:"Pay with Cash, GCash, or Maya — your choice",       img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop" },
              { n:"04", t:"Live Tracking",   d:"Watch your rider navigate to you in real time",     img:"https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=80&h=80&fit=crop" },
            ].map(({ n, t, d, img }, i, arr) => (
              <div key={n} style={{ display:"flex", gap:20, alignItems:"center", padding:"20px 0", borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ flexShrink:0, position:"relative" }}>
                  <img src={img} alt={t} style={{ width:70, height:70, borderRadius:14, objectFit:"cover" }}/>
                  <div style={{ position:"absolute", top:-8, right:-8, width:24, height:24, borderRadius:"50%", background:B, color:"#fff", fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>{n}</div>
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:N, marginBottom:4 }}>{t}</div>
                  <div style={{ fontSize:13, color:G, lineHeight:1.6 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ TESTIMONIALS ══════ */}
      <div style={{ background:L, padding:"60px 24px", borderTop:"1px solid #E2E8F0" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:11, fontWeight:700, color:B, letterSpacing:"1.8px", marginBottom:12 }}>COMMUNITY</div>
            <h2 style={{ fontSize:28, fontWeight:800, color:N, margin:0 }}>What the island says</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
            {[
              { name:"Maria Santos",  loc:"Brgy. Talim",     quote:"Grabe, super bilis ng delivery! Sobrang convenient especially dito sa isla. Hindi na ako kelangan pumunta ng palengke!", avatar:"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&fit=crop" },
              { name:"Jun Dela Cruz", loc:"Rider",           quote:"Malaking tulong ang app. Mas madali na mag-navigate at ma-track ang orders. Laki ng naidagdag sa kita ko araw-araw.",    avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" },
              { name:"Aling Lucy",    loc:"Store Owner",     quote:"Dumami na ang customers namin dahil naka-online na kami. Salamat IDT! Napaka-epektibo ng sistema para sa aming negosyo.",  avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop" },
            ].map(({ name, loc, quote, avatar }) => (
              <div key={name} style={{ background:"#fff", borderRadius:16, padding:"22px", border:"1px solid #E2E8F0" }}>
                <div style={{ color:"#FBBF24", fontSize:14, marginBottom:12 }}>★★★★★</div>
                <div style={{ fontSize:13, color:N2, lineHeight:1.7, marginBottom:18, fontStyle:"italic" }}>"{quote}"</div>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <img src={avatar} alt={name} style={{ width:40, height:40, borderRadius:"50%", objectFit:"cover" }}/>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:N }}>{name}</div>
                    <div style={{ fontSize:11, color:G }}>{loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ CTA ══════ */}
      <div style={{ position:"relative", overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=300&fit=crop" alt="" style={{ width:"100%", height:260, objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(11,17,26,0.88),rgba(184,61,6,0.82))", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, padding:"0 24px", textAlign:"center" }}>
          <h2 style={{ fontSize:26, fontWeight:800, color:"#fff", margin:0 }}>Ready to order from Talim Island?</h2>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:14, margin:0 }}>Join 1,200+ happy customers across all barangays</p>
          <button onClick={() => onPortal("customer")} style={{ padding:"14px 36px", background:B, color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:16, cursor:"pointer", boxShadow:"0 8px 28px rgba(232,82,10,0.45)", marginTop:4 }}>
            Start Ordering Now
          </button>
        </div>
      </div>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ background:N, padding:"44px 24px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:32, marginBottom:36 }}>
            <div>
              <div style={{ fontWeight:800, fontSize:16, color:"#fff", marginBottom:10 }}>Isla De Talim Deliveries</div>
              <div style={{ fontSize:13, color:G2, lineHeight:1.7 }}>Your island. Your order. Delivered fresh and fast to every barangay of Talim.</div>
            </div>
            {[
              { title:"Company", links:["About Us","Careers","Press","Blog"]                    },
              { title:"Portals", links:["Customer App","Merchant Portal","Rider App","Help & FAQ"] },
              { title:"Contact", links:["0917-IDT-FOOD","hello@isladetalim.ph","Facebook","Instagram"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontWeight:700, fontSize:11, color:"#94A3B8", marginBottom:14, letterSpacing:"1.2px" }}>{title.toUpperCase()}</div>
                {links.map(l => <div key={l} style={{ fontSize:13, color:G2, marginBottom:9, cursor:"pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <div style={{ fontSize:12, color:"#475569" }}>© 2024 Isla De Talim Deliveries. All rights reserved.</div>
            <div style={{ fontSize:12, color:"#475569" }}>Binangonan, Rizal, Philippines 🇵🇭</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
