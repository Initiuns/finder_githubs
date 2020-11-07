import React from 'react';

const Search = () => (

    <div className="container">
        <div className="card card-body">
            <h1>Pesquisar usuários do Github</h1>
            <p className="lead">
                Digite um nome para encontrar usuários e repositórios.
            </p>
            <input onChange={this.getUser} id="search" type="text" className="form-control" required />
        </div>
    </div>

)

export default Search;