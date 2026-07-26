import DarkVeil from "../backgrounds/DarkVeil"

export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <DarkVeil
        hueShift={0}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0}
        resolutionScale={1}
      />

      {/* Contrast vignette: keeps the centre visible while darkening the
          edges/bottom so foreground text stays legible over the shader. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 90% at 50% 22%, transparent 34%, rgba(7,7,11,0.5) 72%, rgba(7,7,11,0.9) 100%)",
        }}
      />
    </div>
  )
}