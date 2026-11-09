import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Cyber Elias Academy — The Future Is Built. Not Given.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Load the brand typefaces from local TrueType files (Satori accepts TTF/OTF,
  // not woff2) so the card renders identically without outbound network access.
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/SpaceGrotesk-700.ttf")),
    readFile(join(process.cwd(), "public/fonts/Inter-400.ttf")),
  ]);

  const displayFont = display.buffer.slice(
    display.byteOffset,
    display.byteOffset + display.byteLength,
  ) as ArrayBuffer;
  const bodyFont = body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength) as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 76px",
          background: "#070B12",
          backgroundImage:
            "radial-gradient(ellipse at 78% -10%, rgba(0,217,255,0.30), transparent 55%), radial-gradient(ellipse at 10% 110%, rgba(136,92,255,0.24), transparent 52%), linear-gradient(to right, rgba(146,158,174,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(146,158,174,0.07) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
          color: "#F4F7FB",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #00D9FF",
              borderRadius: 13,
              fontSize: 20,
              fontWeight: 700,
              color: "#00D9FF",
              fontFamily: "Space Grotesk",
            }}
          >
            CEA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: 0.5,
                fontFamily: "Space Grotesk",
              }}
            >
              CYBER ELIAS ACADEMY
            </div>
            <div style={{ fontSize: 12, color: "#929EAE", letterSpacing: 5, marginTop: 3 }}>
              CEA.NG
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.04,
              display: "flex",
              flexDirection: "column",
              fontFamily: "Space Grotesk",
            }}
          >
            <span>MASTER THE DIGITAL WORLD.</span>
            <span style={{ color: "#00D9FF" }}>BUILD WHAT COMES NEXT.</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 21,
              color: "#929EAE",
              maxWidth: 840,
              lineHeight: 1.45,
            }}
          >
            Practical cybersecurity, software, AI and design training in Port Harcourt, Rivers
            State, Nigeria.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 14,
            color: "#929EAE",
            letterSpacing: 1.6,
          }}
        >
          <span style={{ color: "#39FF88", display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 8,
                background: "#39FF88",
                display: "flex",
              }}
            />
            CYBERSECURITY
          </span>
          <span>SOFTWARE</span>
          <span>AI &amp; DATA</span>
          <span>CLOUD &amp; NETWORKING</span>
          <span>DESIGN</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: displayFont, style: "normal", weight: 700 },
        { name: "Inter", data: bodyFont, style: "normal", weight: 400 },
      ],
    },
  );
}
