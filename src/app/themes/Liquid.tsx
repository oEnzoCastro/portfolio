import React from "react";
import LiquidChrome from "../components/LiquidChrome";

export default function Liquid() {

  return (
    <div style={{ width: "100%", height: "100dvh", position: "relative" }}>
      <LiquidChrome
        baseColor={[0.01, 0.01, 0.01]}
        speed={0.1}
        amplitude={0.5}
        interactive={false}
      />
    </div>
  );
}
