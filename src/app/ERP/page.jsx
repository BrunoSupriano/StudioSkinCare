"use client";

const HomePage = () => {
    return (
        <div className="flex min-h-screen">
            {/* Menu Lateral */}
            <aside className="w-64 bg-pink-200 text-pink-800 p-6">
                <h2 className="text-2xl font-bold mb-4">ERP Skincare</h2>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <a href="/ERP/Agendamento" className="block py-2 px-4 rounded hover:bg-pink-300">Agendamento</a>
                        </li>
                        <li className="mb-2">
                            <a href="/ERP/Financeiro" className="block py-2 px-4 rounded hover:bg-pink-300">Financeiro</a>
                        </li>
                        <li className="mb-2">
                            <a href="/ERP/Clientes" className="block py-2 px-4 rounded hover:bg-pink-300">Clientes</a>
                        </li>
                        <li className="mb-2">
                            <a href="/ERP/Servicos" className="block py-2 px-4 rounded hover:bg-pink-300">Serviços</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-1 p-10 bg-white">
                <section href="/Agendamento" id="agendamento">
                    <h2 className="text-xl font-bold mb-4">Agendamento</h2>
                    <p className="mb-4">Gerencie a agenda, agende procedimentos, edite dias/horários e visualize a agenda de forma intuitiva.</p>
                    <div className="bg-pink-100 p-4 rounded">
                        {/* Componente para agendamento vai aqui */}
                        <p>Interface de gestão de agenda.</p>
                    </div>
                </section>

                <section id="financeiro" className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Financeiro</h2>
                    <p className="mb-4">Selecione o mês para visualizar os lucros diários.</p>
                    <div className="bg-pink-100 p-4 rounded">
                        {/* Componente de financeiro vai aqui */}
                        <p>Interface para visualizar lucros diários por mês.</p>
                    </div>
                </section>

                <section id="clientes" className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Clientes</h2>
                    <p className="mb-4">Cadastre ou edite clientes (CPF, nome, endereço, celular, aniversário).</p>
                    <div className="bg-pink-100 p-4 rounded">
                        {/* Componente de cadastro de clientes vai aqui */}
                        <p>Formulário de cadastro/edição de clientes.</p>
                    </div>
                </section>

                <section id="servicos" className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Serviços</h2>
                    <p className="mb-4">Cadastre ou edite tipos de serviços (nome, duração, valor).</p>
                    <div className="bg-pink-100 p-4 rounded">
                        {/* Componente de cadastro de serviços vai aqui */}
                        <p>Formulário de cadastro/edição de serviços.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
