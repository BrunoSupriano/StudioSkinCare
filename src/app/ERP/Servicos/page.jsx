"use client";
import Sidebar from '../Components/SideBar/SideBar.jsx';

const Servicos = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex-1 p-8 bg-pink-50 min-h-screen ml-72"> {/* Ajuste o ml-72 para o tamanho da sidebar */}
                <h1 className="text-3xl font-bold text-pink-800 mb-6">Gestão de Serviços</h1>
                <section id="servicos" className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Serviços</h2>
                    <p className="mb-4">Cadastre ou edite tipos de serviços (nome, duração, valor).</p>
                    <div className="bg-pink-100 p-4 rounded">
                        {/* Componente de cadastro de serviços vai aqui */}
                        <p>Formulário de cadastro/edição de serviços.</p>
                    </div>
                </section>
                <p className="mb-4 text-pink-700">Cadastre ou edite os tipos de serviços oferecidos.</p>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="nome" className="block text-pink-800 font-semibold mb-2">Nome do Serviço:</label>
                            <input type="text" id="nome" className="bg-pink-100 text-pink-800 py-2 px-4 rounded w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="duracao" className="block text-pink-800 font-semibold mb-2">Duração (min):</label>
                            <input type="number" id="duracao" className="bg-pink-100 text-pink-800 py-2 px-4 rounded w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="valor" className="block text-pink-800 font-semibold mb-2">Valor (R$):</label>
                            <input type="text" id="valor" className="bg-pink-100 text-pink-800 py-2 px-4 rounded w-full" />
                        </div>
                        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Salvar Serviço</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Servicos;
