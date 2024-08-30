"use client";
import Sidebar from '../../Components/SideBar/SideBar.jsx';

const Servicos = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Serviços</h1>
                    <p className="mb-4 text-pink-700">Cadastre ou edite os tipos de serviços oferecidos.</p>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="nome" className="formlabel">Nome do Serviço:</label>
                            <input type="text" id="nome" className="Custom-input" placeholder="Digite o nome do serviço" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="duracao" className="formlabel">Duração (min):</label>
                            <input type="number" id="duracao" className="Custom-input" placeholder="Digite a duração em minutos" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="valor" className="formlabel">Valor (R$):</label>
                            <input type="text" id="valor" className="Custom-input" placeholder="Digite o valor em reais" />
                        </div>
                        <button type="submit" className="save">Salvar Serviço</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Servicos;
