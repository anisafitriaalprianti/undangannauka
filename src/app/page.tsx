export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "linear-gradient(to bottom, #fffaf7, #f5f3ff)",
      padding: "40px"
    }}>
      
      {/* JUDUL TETAP PERTAHANKAN */}
      <h1 style={{ 
        fontSize: "34px", 
        fontWeight: "500", 
        color: "#3b3b3b",
        fontFamily: "serif"
      }}>
        Undangan Nauka
      </h1>

      {/* VIBE LEBIH SOFT */}
      <p style={{
        marginTop: "16px",
        fontSize: "16px",
        color: "#6b6b6b",
        maxWidth: "500px",
        lineHeight: "1.7"
      }}>
        Dengan penuh rasa syukur, kami memohon doa dan kehadiran Anda
        dalam momen sederhana namun penuh makna ini.
      </p>

      {/* NUANSA DOA */}
      <p style={{
        marginTop: "12px",
        fontSize: "14px",
        color: "#8a8a8a",
        fontStyle: "italic"
      }}>
        “Dan di antara tanda-tanda kekuasaan-Nya Dia menciptakan untukmu pasangan hidup…”
      </p>

      <button style={{
        marginTop: "25px",
        padding: "10px 24px",
        background: "#3b3b3b",
        color: "white",
        borderRadius: "999px",
        border: "none"
      }}>
        Lihat Undangan
      </button>

    </div>
  );
}