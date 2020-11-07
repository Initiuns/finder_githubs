import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Profile from './Profile';
import Repo from './Repo';
//import Search from './Search';

class App extends Component {
  constructor(){
    super();
    this.state = {
      github: {
        url: "https://api.github.com/users",
        client_id: "39c62a990fbccb22",
        client_secret: "a758e05dcada1ebcbccf6e4c97b04f789eb18baa",
        count: 7,
        sort: "created: asc"
      },
      user: [],
      repos: []
    }
  }

  getUser = (e) => {
      const user = e.target.value;

      const { url, client_id, client_secret, count, sort } = this.state.github;
        axios
          .get(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
          )
          .then(({ data }) => this.setState({user: data}))
  
        axios
            .get(
              `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
            )
            .then(({ data }) => this.setState({ repos: data }));
  };

  // Essa função vai renderizar o Profile e os repositórios lado a lado
  renderProfile = () => {
    const { user, repos } = this.state;

    return (
      <div className="row">
        <div className="col-md-4">
          <Profile user={user} />
        </div>
        <div className="col-md-8">
          {repos.map(repo => <Repo key={repo.name} repo={repo} /> )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <Search /> */}
        <div className="container">
        <div className="card card-body">
            <h1>Pesquisar usuários do Github</h1>
            <p className="lead">
                Digite um nome para encontrar usuários e repositórios.
            </p>
            <input onChange={this.getUser} id="search" type="text" className="form-control" required />
        </div>

        { this.state.user.length !== 0 ? this.renderProfile() : null }

        </div>
      </div>
    )
  }
}

export default App;
