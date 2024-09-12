import React from 'react';

const SearchBar = ({ placeholder }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        // Lógica de pesquisa pode ser adicionada aqui
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-left ">
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                className="px-4 py-2 border-2 border-pink-500 rounded-lg outline-none focus:border-pink-200"
            />
            <button type="submit" className="bg-transparent border-none text-pink-500 text-2xl ml-[-40px] cursor-pointer">
                🔍
            </button>
        </form>
    );
};

export default SearchBar;
