import dynamic from "next/dynamic";

//import ControlsMap from "@/components/ControlsMap";
import { Suspense } from "react";

export default function ControlsHomePage() {
  const MapWithNoSSR = dynamic(() => import("@/components/ControlsMap"), {
    ssr: false,
  });

  return (
    <>
      <MapWithNoSSR />
    </>
  );
}
