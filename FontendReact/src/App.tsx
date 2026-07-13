import { useState } from "react";
import BuyerPortal from "./portals/BuyerPortal";
import SellerPortal from "./portals/SellerPortal";
import AdminPortal from "./portals/AdminPortal";
import LandingPage from "./pages/LandingPage";

type Portal = "landing" | "buyer" | "seller" | "admin";

export default function App() {
  const [portal, setPortal] = useState<Portal>("landing");

  if (portal === "buyer") return <BuyerPortal onExit={() => setPortal("landing")} />;
  if (portal === "seller") return <SellerPortal onExit={() => setPortal("landing")} />;
  if (portal === "admin") return <AdminPortal onExit={() => setPortal("landing")} />;

  return <LandingPage onNavigate={setPortal} />;
}
