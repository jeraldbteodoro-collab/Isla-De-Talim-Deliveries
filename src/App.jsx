import { useState } from "react";
import { Landing }      from "./pages/Landing";
import { CustomerApp }  from "./pages/customer/CustomerApp";
import { MerchantApp }  from "./pages/merchant/MerchantApp";
import { RiderApp }     from "./pages/rider/RiderApp";

export default function App() {
  const [portal, setPortal] = useState("landing");

  if (portal === "customer") return <CustomerApp onBack={() => setPortal("landing")} />;
  if (portal === "merchant") return <MerchantApp onBack={() => setPortal("landing")} />;
  if (portal === "rider")    return <RiderApp    onBack={() => setPortal("landing")} />;

  return <Landing onPortal={setPortal} />;
}
