import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070B12",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2.5px solid #00D9FF",
            borderRadius: 11,
            color: "#39FF88",
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: -0.5,
            fontFamily: "sans-serif",
          }}
        >
          CEA
        </div>
      </div>
    ),
    { ...size },
  );
}
