"use client";
import Sidebar from '../../Components/SideBar/SideBar.jsx';

const Financeiro = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Financeiro</h1>
                    <p className="mb-4 text-pink-700">Selecione um mês para visualizar os lucros diários e obter insights financeiros.</p>

                    <div className="bg-white p-6 rounded shadow-md">
                        <label htmlFor="month" className="block text-pink-800 mb-2 font-semibold">Selecione o Mês:</label>
                        <select id="month" className="bg-pink-100 text-pink-800 py-2 px-4 rounded">
                            <option value="january">Janeiro</option>
                            <option value="february">Fevereiro</option>
                            <option value="march">Março</option>
                        </select>
                    </div>

                    <div className="mt-8 bg-pink-100 p-6 rounded shadow-md">
                        <h2 className="text-xl font-semibold text-pink-800">Lucros Diários</h2>
                        <p className="text-pink-700 mt-4">Selecione um mês para ver o relatório.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financeiro;
