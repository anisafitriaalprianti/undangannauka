 "use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);

      // suara pintu
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {
          // browser bisa blok autoplay, biarkan saja
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

      {/* AUDIO */}
      <audio ref={audioRef} src="/sounds/door.mp3" />

      {/* PINTU KIRI */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(180deg, #2d2a2a, #1f1d1d)",
          transform: open ? "translateX(-100%)" : "translateX(0)",
          transition: "all 1.8s ease-in-out",
          zIndex: 10,
        }}
      />

      {/* PINTU KANAN */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(180deg, #2d2a2a, #1f1d1d)",
          transform: open ? "translateX(100%)" : "translateX(0)",
          transition: "all 1.8s ease-in-out",
          zIndex: 10,
        }}
      />

      {/* ISI UNDANGAN */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #faf7f5, #f3f4f6)",
          padding: "40px",
          opacity: open ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "18px",
            letterSpacing: "2px",
            color: "#6b5f72",
            fontWeight: "400",
            fontFamily: "serif",
          }}
        >
          Undangan by Nauka
        </h1>

        {/* POETIC TEXT */}
        <div
          style={{
            marginTop: "30px",
            fontSize: "14px",
            color: "#5c5c5c",
            maxWidth: "520px",
            lineHeight: "1.8",
          }}
        >
          <p>
            Setiap pertemuan seperti sebuah pintu,<br />
            dan setiap pintu memiliki kuncinya sendiri.
          </p>

          <p style={{ marginTop: "15px" }}>
            Bukan tentang siapa yang lebih cepat,<br />
            tetapi tentang siapa yang sampai dengan tepat.
          </p>
        </div>
      </div>
    </div>
  );
}