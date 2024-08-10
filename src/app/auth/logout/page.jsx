// /src/app/auth/logout/page.jsx
"use client";

const Logout = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Você foi deslogado com sucesso</h1>
            <p>Obrigado por usar nosso serviço!</p>
            <a href="/auth/login" style={{ textDecoration: 'underline', color: '#0070f3' }}>
                Voltar para a página de login
            </a>
        </div>
    );
};

export default Logout;