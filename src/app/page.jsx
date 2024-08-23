"use client";

function Home() {
  return (
    <div
      className="flex flex-col h-screen w-full bg-pink-100 bg-cover bg-center relative">
      <header className="flex items-center justify-between p-5 bg-pink-50 bg-opacity-90 absolute top-0 left-0 w-full z-20">
        <div className="text-2xl font-bold text-pink-600">Logo</div>
        <nav className="flex gap-5">
          <a href="#about" className="text-pink-800 no-underline text-lg font-bold transition-colors duration-300 hover:text-pink-600">Sobre</a>
          <a href="#clients" className="text-pink-800 no-underline text-lg font-bold transition-colors duration-300 hover:text-pink-600">Clientes</a>
          <a href="#services" className="text-pink-800 no-underline text-lg font-bold transition-colors duration-300 hover:text-pink-600">Serviços</a>
        </nav>
        <a href="/auth/login" className="bg-pink-500 text-white py-2 px-4 rounded-lg no-underline font-bold transition-colors duration-300 hover:bg-pink-600">Login</a>
      </header>
      <div className="absolute inset-0 bg-pink-200 flex items-center justify-center z-10">
        <div className="text-center text-pink-800 z-20">
          <h1 className="text-5xl mb-5 font-bold">Bem-vindo</h1>
          <h1 className="text-9xl mb-5 font-sacramento text-pink-600">Daros Glow Care</h1>
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
