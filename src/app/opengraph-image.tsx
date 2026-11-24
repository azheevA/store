import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Лавка — предметы для дома с характером";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#eaf0e8",
        color: "#203126",
        padding: "72px 82px",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            width: 54,
            height: 54,
            border: "1px solid #244b35",
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontStyle: "italic",
          }}
        >
          л
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 48,
            letterSpacing: "-4px",
          }}
        >
          <span>лавка</span>
          <span style={{ color: "#83a17d" }}>.</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 18,
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "#6f8a6b",
          }}
        >
          Уют в каждой детали
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 100,
            lineHeight: 0.98,
            letterSpacing: "-7px",
            marginTop: 22,
          }}
        >
          <span>Уют в каждой</span>
          <span>детали.</span>
        </div>
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 24,
            color: "#6f7b6e",
            marginTop: 26,
          }}
        >
          Стильные вещи для дома, кухни и комфортной жизни.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Arial",
          fontSize: 16,
          letterSpacing: "3px",
          color: "#7b897a",
          textTransform: "uppercase",
        }}
      >
        <span>Посуда · Декор · Текстиль · Свет</span>
        <span>LAVKA / 2026</span>
      </div>
    </div>,
    { ...size },
  );
}
