import { useState } from "react";
import { B, BL, BD, N, G, L, L2, D, DL, S, SL, fmt } from "../../constants/theme";
import { PICKUPS, SEED_TRIPS } from "../../data/orders";
import { useToast }  from "../../hooks/useToast";
import { StepTrack } from "../../components/shared/StepTrack";
import { Toast }     from "../../components/shared/Toast";

const DELIVERY_STEPS = ["Head to Store","Pick Up Order","Deliver to Customer","Completed"];

const NAVS = [
  { k:"available", l:"Available",  img:"https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=32&h=32&fit=crop" },
  { k:"active",    l:"Active",     img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=32&h=32&fit=crop" },
  { k:"earnings",  l:"Earnings",   img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=32&h=32&fit=crop" },
  { k:"profile",   l:"Profile",    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop" },
];

export function RiderApp({ onBack }) {
  const [view, setView]                = useState("available");
  const [deliveries, setDeliveries]    = useState(PICKUPS);
  const [activeJob, setActiveJob]      = useState(null);
  const [jobStep, setJobStep]          = useState(0);
  const [online, setOnline]            = useState(true);
  const [toastMsg, showToast]          = useToast();
  const [completedTrips, setCompleted] = useState(SEED_TRIPS);

  const today = completedTrips.reduce((s, t) => s + t.earn, 0);

  function accept(d) {
    setDeliveries(p => p.filter(x => x.id !== d.id));
    setActiveJob(d); setJobStep(0); setView("active");
    showToast("Delivery accepted! Head to the store.");
  }
  function nextStep() {
    if (jobStep >= 2) {
      setCompleted(p => [{ id:activeJob.id, from:activeJob.from, earn:activeJob.earn, time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}), km:activeJob.distance.replace(" km","") }, ...p]);
      showToast(`Delivery complete! +${fmt(activeJob.earn)} earned`);
      setTimeout(() => { setActiveJob(null); setJobStep(0); setView("earnings"); }, 1500);
    } else {
      setJobStep(s => s + 1);
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:L }}>

      {/* ── Banner ── */}
      <div style={{ position:"relative" }}>
        <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=160&fit=crop" alt="" style={{ width:"100%", height:140, objectFit:"cover", display:"block" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(11,17,26,0.88),rgba(184,61,6,0.65))" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", padding:"0 16px", gap:12 }}>
          <button onClick={onBack} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:"50%", width:34, height:34, color:"#fff", cursor:"pointer", fontSize:18, flexShrink:0 }}>←</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", fontWeight:600, letterSpacing:"0.8px" }}>TODAY'S EARNINGS</div>
            <div style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1.1 }}>{fmt(today)}</div>
            <div style={{ display:"flex", gap:14, marginTop:5, fontSize:11, color:"rgba(255,255,255,0.7)" }}>
              <span>{completedTrips.length} trips</span>
              <span>★ 4.9 rating</span>
              <span>Top Rider</span>
            </div>
          </div>
          <button onClick={() => setOnline(o => !o)}
            style={{ background: online ? SL : DL, border:`1.5px solid ${online ? "#6EE7B7" : "#FECACA"}`, borderRadius:20, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:700, color: online ? "#065F46" : D, flexShrink:0 }}>
            {online ? "● Online" : "○ Offline"}
          </button>
        </div>
      </div>

      {/* ── Nav ── */}
      <div style={{ background:"#fff", borderBottom:"1px solid #E2E8F0", display:"flex" }}>
        {NAVS.map(n => (
          <button key={n.k} onClick={() => setView(n.k)}
            style={{ flex:1, padding:"10px 4px", border:"none", background:"none", cursor:"pointer", borderBottom:`2.5px solid ${view === n.k ? B : "transparent"}`, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <img src={n.img} alt="" style={{ width:22, height:22, borderRadius:6, objectFit:"cover", opacity: view === n.k ? 1 : 0.45 }}/>
            <span style={{ fontSize:10, color: view === n.k ? B : G, fontWeight: view === n.k ? 700 : 400 }}>{n.l}</span>
          </button>
        ))}
      </div>

      {/* ── AVAILABLE ── */}
      {view === "available" && (
        <div style={{ padding:"14px 16px 24px" }}>
          {!online ? (
            <div style={{ background:DL, border:"1px solid #FECACA", borderRadius:12, padding:"20px", textAlign:"center" }}>
              <img src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=80&h=80&fit=crop" alt="" style={{ width:60, height:60, borderRadius:"50%", objectFit:"cover", margin:"0 auto 12px", opacity:0.4 }}/>
              <div style={{ fontWeight:700, fontSize:15, color:D }}>You are offline</div>
              <div style={{ fontSize:13, color:G, marginTop:6 }}>Go online to receive delivery requests.</div>
            </div>
          ) : deliveries.length === 0 ? (
            <div style={{ textAlign:"center", padding:"50px 20px" }}>
              <img src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=120&h=120&fit=crop" alt="" style={{ width:90, height:90, borderRadius:"50%", objectFit:"cover", margin:"0 auto 16px", opacity:0.35 }}/>
              <div style={{ fontWeight:700, fontSize:15, color:N }}>No deliveries right now</div>
              <div style={{ fontSize:13, color:G, marginTop:6 }}>Stay online — we'll notify you when orders come in!</div>
            </div>
          ) : (
            <>
              <div style={{ fontWeight:700, color:N, fontSize:14, marginBottom:12 }}>
                {deliveries.length} Delivery Requests Nearby
              </div>
              {deliveries.map(d => (
                <div key={d.id} style={{ background:"#fff", borderRadius:14, marginBottom:12, border:"1px solid #E2E8F0", overflow:"hidden" }}>
                  <div style={{ position:"relative" }}>
                    <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=600&h=100&fit=crop" alt="" style={{ width:"100%", height:80, objectFit:"cover" }}/>
                    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", padding:"0 16px", justifyContent:"space-between" }}>
                      <div style={{ fontWeight:700, color:"#fff", fontSize:15 }}>{d.from}</div>
                      <div style={{ background:B, color:"#fff", fontWeight:800, fontSize:16, padding:"5px 14px", borderRadius:20 }}>{fmt(d.earn)}</div>
                    </div>
                  </div>
                  <div style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                      <span style={{ background:L2, color:G, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:99 }}>📏 {d.distance}</span>
                      <span style={{ background:L2, color:G, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:99 }}>📦 {d.items} items</span>
                      <span style={{ background:L2, color:G, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:99 }}>⚖️ {d.weight}</span>
                    </div>
                    <div style={{ fontSize:12, color:G, marginBottom:3 }}>Pickup: {d.fromAddr}</div>
                    <div style={{ fontSize:12, color:G, marginBottom:14 }}>Dropoff: {d.to}</div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => accept(d)} style={{ flex:1, background:B, color:"#fff", border:"none", borderRadius:10, padding:"11px", fontWeight:700, cursor:"pointer", fontSize:14 }}>
                        Accept Delivery
                      </button>
                      <button onClick={() => setDeliveries(p => p.filter(x => x.id !== d.id))}
                        style={{ padding:"11px 18px", background:L2, border:"none", borderRadius:10, cursor:"pointer", color:G, fontWeight:600, fontSize:13 }}>
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* ── ACTIVE ── */}
      {view === "active" && (
        <div style={{ padding:"14px 16px 24px" }}>
          {!activeJob ? (
            <div style={{ textAlign:"center", padding:"50px 20px" }}>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" alt="" style={{ width:90, height:90, borderRadius:"50%", objectFit:"cover", margin:"0 auto 16px", opacity:0.35 }}/>
              <div style={{ fontWeight:700, fontSize:15, color:N }}>No active delivery</div>
              <button onClick={() => setView("available")} style={{ marginTop:16, background:B, color:"#fff", border:"none", borderRadius:10, padding:"11px 28px", fontWeight:700, cursor:"pointer" }}>
                Find Deliveries
              </button>
            </div>
          ) : (
            <>
              <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #E2E8F0", marginBottom:12 }}>
                <div style={{ fontWeight:700, color:N, fontSize:14, marginBottom:14 }}>Delivery Progress</div>
                <StepTrack steps={DELIVERY_STEPS} current={jobStep}/>
              </div>
              <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #E2E8F0", marginBottom:12 }}>
                <div style={{ fontWeight:700, color:N, marginBottom:12, fontSize:14 }}>Order #{activeJob.id}</div>
                <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                  <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=56&h=56&fit=crop" alt="" style={{ width:52, height:52, borderRadius:10, objectFit:"cover" }}/>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14, color:N }}>{activeJob.from}</div>
                    <div style={{ fontSize:12, color:G, marginTop:2 }}>Pickup: {activeJob.fromAddr}</div>
                    <div style={{ fontSize:12, color:G }}>Dropoff: {activeJob.to}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                  <span style={{ background:L2, color:G, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:99 }}>{activeJob.distance}</span>
                  <span style={{ background:L2, color:G, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:99 }}>{activeJob.items} items</span>
                  <span style={{ background:L2, color:G, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:99 }}>{activeJob.weight}</span>
                </div>
                <div style={{ background:BL, borderRadius:10, padding:"12px", textAlign:"center", border:`1px solid ${B}25` }}>
                  <div style={{ fontWeight:900, color:B, fontSize:24 }}>{fmt(activeJob.earn)}</div>
                  <div style={{ fontSize:11, color:B, marginTop:2, fontWeight:600 }}>Your earnings for this trip</div>
                </div>
              </div>
              <div style={{ borderRadius:14, overflow:"hidden", marginBottom:12, position:"relative" }}>
                <img src="https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=800&h=200&fit=crop" alt="Map" style={{ width:"100%", height:160, objectFit:"cover", display:"block" }}/>
                <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ background:"#fff", borderRadius:12, padding:"10px 20px", textAlign:"center" }}>
                    <div style={{ fontWeight:700, fontSize:13, color:N }}>Navigation Active</div>
                    <div style={{ fontSize:12, color:G, marginTop:2 }}>{activeJob.distance} to destination</div>
                  </div>
                </div>
              </div>
              <button onClick={nextStep} style={{ width:"100%", background:B, color:"#fff", border:"none", borderRadius:12, padding:"15px", fontWeight:700, fontSize:15, cursor:"pointer" }}>
                {["I'm at the Store","Order Picked Up","Delivered — Mark Complete"][jobStep]}
              </button>
            </>
          )}
        </div>
      )}

      {/* ── EARNINGS ── */}
      {view === "earnings" && (
        <div style={{ padding:"16px 16px 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            {[
              { l:"Today",       v:fmt(today),  img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=60&h=60&fit=crop" },
              { l:"This Week",   v:"₱2,340",     img:"https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=60&h=60&fit=crop" },
              { l:"All-Time",    v:"₱18,920",    img:"https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=60&h=60&fit=crop" },
              { l:"Total Trips", v:"317",        img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop" },
            ].map(({ l, v, img }) => (
              <div key={l} style={{ background:"#fff", borderRadius:14, padding:"14px", border:"1px solid #E2E8F0", display:"flex", gap:10, alignItems:"center" }}>
                <img src={img} alt="" style={{ width:40, height:40, borderRadius:10, objectFit:"cover" }}/>
                <div>
                  <div style={{ fontWeight:800, fontSize:17, color:N }}>{v}</div>
                  <div style={{ fontSize:11, color:G, marginTop:2 }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff", borderRadius:14, padding:"16px", border:"1px solid #E2E8F0", marginBottom:12 }}>
            <div style={{ fontWeight:700, color:N, fontSize:14, marginBottom:12 }}>Today's Trips</div>
            {completedTrips.map((t, i, arr) => (
              <div key={t.id} style={{ display:"flex", gap:10, alignItems:"center", padding:"10px 0", borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=40&h=40&fit=crop" alt="" style={{ width:36, height:36, borderRadius:8, objectFit:"cover" }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:13, color:N }}>{t.from}</div>
                  <div style={{ fontSize:11, color:G }}>{t.time} · {t.km} km</div>
                </div>
                <div style={{ fontWeight:700, color:B, fontSize:14 }}>{fmt(t.earn)}</div>
              </div>
            ))}
          </div>
          <div style={{ background:BL, border:`1.5px solid ${B}35`, borderRadius:14, padding:"16px" }}>
            <div style={{ fontWeight:700, color:BD, fontSize:14 }}>Daily Bonus Challenge</div>
            <div style={{ fontSize:13, color:B, marginTop:4 }}>Complete 10 trips → +₱150 bonus!</div>
            <div style={{ fontSize:12, color:G, marginTop:4 }}>
              {Math.max(0, 10 - completedTrips.length)} more trip{10 - completedTrips.length !== 1 ? "s" : ""} to go
            </div>
            <div style={{ background:"#E2E8F0", borderRadius:99, height:8, marginTop:10 }}>
              <div style={{ background:B, height:"100%", borderRadius:99, width:`${Math.min(100, completedTrips.length / 10 * 100)}%`, transition:"width 0.5s" }}/>
            </div>
            <div style={{ textAlign:"right", fontSize:11, color:B, marginTop:4, fontWeight:600 }}>
              {completedTrips.length}/10 trips
            </div>
          </div>
        </div>
      )}

      {/* ── PROFILE ── */}
      {view === "profile" && (
        <div style={{ padding:"16px 16px 24px" }}>
          <div style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid #E2E8F0", marginBottom:14 }}>
            <div style={{ position:"relative" }}>
              <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=120&fit=crop" alt="" style={{ width:"100%", height:100, objectFit:"cover" }}/>
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.35)" }}/>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" alt="Rider" style={{ width:70, height:70, borderRadius:"50%", objectFit:"cover", border:"3px solid #fff", position:"absolute", bottom:-30, left:"50%", transform:"translateX(-50%)" }}/>
            </div>
            <div style={{ paddingTop:38, paddingBottom:20, textAlign:"center" }}>
              <div style={{ fontWeight:800, fontSize:18, color:N }}>Jun Dela Cruz</div>
              <div style={{ fontSize:13, color:G, marginTop:3 }}>Active Rider · Talim Island</div>
              <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:16 }}>
                {[["4.9","Rating"],["317","Trips"],["98%","On-time"]].map(([v, l]) => (
                  <div key={l} style={{ textAlign:"center" }}>
                    <div style={{ fontWeight:800, fontSize:18, color:B }}>{v}</div>
                    <div style={{ fontSize:11, color:G, marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:"#fff", borderRadius:14, overflow:"hidden", border:"1px solid #E2E8F0", marginBottom:14 }}>
            {[
              {l:"Vehicle",       v:"Honda Click 125i",   img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=32&h=32&fit=crop"},
              {l:"Plate Number",  v:"ABC-1234",           img:"https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=32&h=32&fit=crop"},
              {l:"Phone",         v:"0917-XXX-XXXX",      img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=32&fit=crop"},
              {l:"Coverage Area", v:"All of Talim Island",img:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=32&h=32&fit=crop"},
              {l:"Member Since",  v:"March 2023",         img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=32&h=32&fit=crop"},
              {l:"Account Status",v:"Verified",           img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=32&h=32&fit=crop"},
            ].map(({ l, v, img }, i, arr) => (
              <div key={l} style={{ padding:"12px 16px", borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none", display:"flex", gap:12, alignItems:"center" }}>
                <img src={img} alt="" style={{ width:28, height:28, borderRadius:6, objectFit:"cover" }}/>
                <span style={{ flex:1, color:G, fontSize:13, fontWeight:500 }}>{l}</span>
                <span style={{ fontWeight:600, color:N, fontSize:13 }}>{v}</span>
              </div>
            ))}
          </div>
          <button style={{ width:"100%", background:DL, border:"1.5px solid #FECACA", borderRadius:12, padding:"14px", color:D, fontWeight:700, cursor:"pointer", fontSize:14 }}>
            Log Out
          </button>
        </div>
      )}

      <Toast msg={toastMsg}/>
    </div>
  );
}
