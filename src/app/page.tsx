export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "#f9fafb",
      padding: "40px"
    }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Undangan Nauka
      </h1>

      <p style={{ marginTop: "10px", fontSize: "16px", color: "#555" }}>
        Dengan penuh rasa syukur, kami mengundang Anda dalam acara spesial kami
      </p>

      <button style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "black",
        color: "white",
        borderRadius: "8px"
      }}>
        Lihat Undangan
      </button>
    </div>
  );
}