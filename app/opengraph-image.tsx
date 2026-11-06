import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse 60% 55% at 50% 50%, #262626 0%, #000000 70%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 168, fontWeight: 500, letterSpacing: "0.08em" }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 52, color: "#d4d4d8" }}>{site.tagline}</div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#71717a" }}>Intelligence You Can Wear.</div>
      </div>
    ),
    size,
  );
}
