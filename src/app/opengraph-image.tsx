import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site-url";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          backgroundColor: "#fbfbf9",
          color: "#000000",
        }}
      >
        <p
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {SITE_NAME}
        </p>
        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#62625b",
            marginTop: 24,
          }}
        >
          絵が、部屋にいる。
        </p>
      </div>
    ),
    { ...size },
  );
}
