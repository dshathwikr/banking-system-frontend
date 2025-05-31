function Home() {
  const styles = {
    container: {
      maxWidth: 600,
      margin: "50px auto",
      padding: 30,
      textAlign: "center",
      border: "1px solid #000",
      borderRadius: 0,
      backgroundColor: "#fff",
      color: "#000",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Banking System</h1>
      <p style={styles.description}>
        Manage your finances with ease. Sign up to create an account, log in to
        access your dashboard, and perform transactions.
      </p>
    </div>
  );
}

export default Home;
