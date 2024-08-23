"use client";
import Sidebar from '../Components/SideBar/SideBar.jsx';

const Financeiro = () => {
    return (
        <div className='flex'>
            <Sidebar />
        <div className="p-8 bg-pink-50 min-h-screen">
            <h1 className="text-3xl font-bold text-pink-800 mb-6">Relatórios Financeiros</h1>
            <section id="financeiro" className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Financeiro</h2>
                    <p className="mb-4">Selecione o mês para visualizar os lucros diários.</p>
                    <div className="bg-pink-100 p-4 rounded">
                        {/* Componente de financeiro vai aqui */}
                        <p>Interface para visualizar lucros diários por mês.</p>
                    </div>
                </section>
            <p className="mb-4 text-pink-700">Selecione um mês para visualizar os lucros diários e obter insights financeiros.</p>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <label htmlFor="month" className="block text-pink-800 mb-2 font-semibold">Selecione o Mês:</label>
                <select id="month" className="bg-pink-100 text-pink-800 py-2 px-4 rounded">
                    {/* Opções de meses */}
                    <option value="january">Janeiro</option>
                    <option value="february">Fevereiro</option>
                    <option value="march">Março</option>
                    {/* Adicione os outros meses aqui */}
                </select>
            </div>

            <div className="mt-8 bg-pink-100 p-6 rounded-lg shadow-lg">
                {/* Relatório de Lucros Diários */}
                <h2 className="text-xl font-semibold text-pink-800">Lucros Diários</h2>
                <p className="text-pink-700 mt-4">Selecione um mês para ver o relatório.</p>
            </div>
        </div>
        </div>
    );
};

export default Financeiro;
