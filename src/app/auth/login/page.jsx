// /src/app/auth/login/page.jsx
"use client";

import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione a lógica de autenticação aqui
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <h1 style={styles.title}>Login</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>Entrar</button>
                </form>
                <p style={styles.footer}>
                    Não tem uma conta? <a href="/auth/register" style={styles.link}>Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f0f2f5',
        padding: '20px',
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
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)', // Ajusta a altura para não sobrepor o cabeçalho
        padding: '20px',
    },
    title: {
        marginBottom: '20px',
        fontSize: '2rem',
        color: '#333',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '0.9rem',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#ff69b4', // Cor rosa brilhante
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#ff1493',
    },
    footer: {
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#555',
    },
    link: {
        color: '#ff69b4',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Login;
