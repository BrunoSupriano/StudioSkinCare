"use client";

const Servicos = () => {
    return (
        <div className="p-8 bg-pink-50 min-h-screen">
            <h1 className="text-3xl font-bold text-pink-800 mb-6">Gestão de Serviços</h1>
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
    );
};

export default Servicos;
