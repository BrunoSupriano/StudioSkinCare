"use client";

function Home() {
  return (
    <div
      className="flex flex-col h-screen w-full bg-cover bg-center relative">
      <header className="flex items-center justify-between p-5 bg-white bg-opacity-80 absolute top-0 left-0 w-full z-20">
        <div className="text-2xl font-bold text-pink-500">Logo</div>
        <nav className="flex gap-5">
          <a href="#about" className="text-gray-800 no-underline text-lg font-bold transition-colors duration-300 hover:text-pink-500">Sobre</a>
          <a href="#clients" className="text-gray-800 no-underline text-lg font-bold transition-colors duration-300 hover:text-pink-500">Clientes</a>
          <a href="#services" className="text-gray-800 no-underline text-lg font-bold transition-colors duration-300 hover:text-pink-500">Serviços</a>
        </nav>
        <a href="/auth/login" className="bg-pink-500 text-white py-2 px-4 rounded-lg no-underline font-bold transition-colors duration-300 hover:bg-pink-600">Login</a>
      </header>
      <div className="absolute inset-0 bg-pink-200 bg-opacity-50 flex items-center justify-center z-10">
        <div className="text-center text-white z-20">
          <h1 className="text-5xl mb-5 font-bold">Bem-vindo</h1>
          <h1 className="text-5xl mb-5 font-sacramento text-neon-pink">Daros Glow Care</h1>
          {/* A FONTE SACRAMENTO ERA PRA SER EMENDADA MAS POR ALGUM MOTIVO ESSA CARALHA NÃO TA CARREGANDO MUDAR IMPORT GOOGLE FONT DE LUGAR NO CSS PARECE RESOLVER*/}
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubra nossos tratamentos de pele personalizados e experimente a transformação que você merece.
          </p>
          <a href="/auth/login" className="inline-block py-2 px-4 text-lg text-white bg-pink-500 rounded-lg no-underline transition-colors duration-300 hover:bg-pink-600">
            Comece Agora
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
