export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "linear-gradient(135deg, #fffaf7, #f5f3ff)",
      padding: "40px"
    }}>

      {/* JUDUL (INI NANTI FONT SUAMI KAMU) */}
      <h1 style={{
  fontSize: "42px",
  fontWeight: "400",
  color: "#3b3b3b",
  fontFamily: "'Dancing Script', cursive"
}}>
  Undangan by Nauka
</h1>

      {/* ICON SIMPLE (BUKAN ANIMASI PINTU) */}
      <div style={{
        marginTop: "25px",
        fontSize: "28px",
        opacity: 0.6
      }}>
        🔑
      </div>

      {/* KATA-KATA PUITIS */}
      <p style={{
        marginTop: "25px",
        fontSize: "16px",
        color: "#5c5c5c",
        maxWidth: "520px",
        lineHeight: "1.9"
      }}>
        Setiap pertemuan seperti sebuah pintu,<br />
        dan setiap pintu memiliki kuncinya sendiri.
      </p>

      <p style={{
        marginTop: "18px",
        fontSize: "15px",
        color: "#6b6b6b",
        maxWidth: "520px",
        lineHeight: "1.9",
        fontStyle: "italic"
      }}>
        Bukan tentang siapa yang lebih cepat,<br />
        tetapi tentang siapa yang sampai dengan tepat.
      </p>

      {/* PENUTUP */}
      <p style={{
        marginTop: "25px",
        fontSize: "14px",
        color: "#888",
        maxWidth: "500px"
      }}>
        Dengan penuh ketulusan, kami mengundang Anda
        untuk menjadi bagian dari momen yang sederhana namun bermakna.
      </p>

    </div>
  );
}
.