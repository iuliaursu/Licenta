import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Search extends Component {
    render() {
        return (
            <form  style = {{display: 'inline-block'}}>
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Images extends Component {
    render() {
        return (
            <form  style = {{display: 'inline-block'}}>
                <input type="text" name="name" />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}


class MenuItem extends Component {
    render() {
        return (
            <div className="dropdown">
                <button className="dropbtn">Obito
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <div className="header">
                        <h2>Sharingan</h2>
                    </div>
                    <div className="row">
                        <div className="column">
                            <h3>Susanoo</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                        <div className="column">
                            <h3>Genjutsu</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                        <div className="column">
                            <h3>Ninjutsu</h3>
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PetBar extends Component {
    render() {
        return (
            <div className="navbar">
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
            </div>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <h1 className="Logo" style = {{display: 'inline-block'}}>Logo</h1>
                <Search/>
                <h1 className="Favorite" style = {{display: 'inline-block'}}>Favorite</h1>
                <h1 className="Cont" style = {{display: 'inline-block'}}>Cont</h1>
                <h1 className="Cos" style = {{display: 'inline-block'}}>Cos</h1>
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <PetBar/>
      </div>
    );
  }
}

export default App;
