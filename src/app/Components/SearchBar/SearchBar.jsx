import React from 'react';

const SearchBar = ({ placeholder }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        // Lógica de pesquisa pode ser adicionada aqui
    };

    return (
        <form onSubmit={handleSearch} style={styles.form}>
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                style={styles.input}
            />
            <button type="submit" style={styles.button}>
                🔍
            </button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
    },
    input: {
        padding: '10px',
        border: '2px solid pink',
        borderRadius: '25px',
        outline: 'none',
        width: '100%',
        maxWidth: '400px',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'pink',
        fontSize: '20px',
        marginLeft: '-40px', // Alinha o ícone dentro do input
        cursor: 'pointer',
    },
};

export default SearchBar;
