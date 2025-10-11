import TextPressure from "./components/TextPressure";
import Liquid from "./themes/Liquid";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Liquid />
      </div>
      <div className="w-1/2">
        <TextPressure
          text="Enzo Castro"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={12}
        />
      </div>
    </div>
  );
}
