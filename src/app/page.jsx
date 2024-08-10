"use client";

import gradiente from '../app/assets/img/gradiente.jpg';

function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>Logo</div>
        <nav style={styles.nav}>
          <a href="#about" style={styles.navItem}>Sobre</a>
          <a href="#clients" style={styles.navItem}>Clientes</a>
          <a href="#services" style={styles.navItem}>Serviços</a>
        </nav>
        <a href="/auth/login" style={styles.loginButton}>Login</a>
      </header>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <h1 style={styles.title}>Bem-vindo ao Studio Skin Care</h1>
          <p style={styles.description}>
            Descubra nossos tratamentos de pele personalizados e experimente a transformação que você merece.
          </p>
          <a href="/auth/login" style={styles.button}>Comece Agora</a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${gradiente})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo semi-transparente
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff69b4', // Cor rosa
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  navItemHover: {
    color: '#ff69b4',
  },
  loginButton: {
    backgroundColor: '#ff69b4',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  loginButtonHover: {
    backgroundColor: '#ff1493',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 192, 203, 0.5)', // Cor rosa com transparência
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    textAlign: 'center',
    color: '#fff',
    zIndex: 2,
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '1.25rem',
    marginBottom: '30px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#ff69b4', // Cor rosa brilhante
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#ff1493',
  },
};

export default Home;
