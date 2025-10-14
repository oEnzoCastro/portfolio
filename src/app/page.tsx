import TextPressure from "./components/TextPressure";
import Liquid from "./themes/Liquid";
import CurvedLoop from "./ui/CurvedLoop.tsx/CurvedLoop";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100dvh" }}>
      <div
        style={{
          width: "100%",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="w-1/2">
          <TextPressure
            text="Enzo Castro"
            flex={false}
            alpha={false}
            stroke={false}
            width={false}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={12}
          />
        </div>
      </div>

        <CurvedLoop speed={0.5} marqueeText="-" curveAmount={0} />

      <div className="h-dvh backdrop-blur-md"></div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <Liquid />
      </div>
    </div>
  );
}
