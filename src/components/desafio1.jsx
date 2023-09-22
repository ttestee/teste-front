import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ServerStatus extends Component {
    constructor() {
        super();
        this.state = {
            serverStatus: null,
            servidorInput: '', 
        };
    }

    handleServidorInputChange = (event) => {
        this.setState({ servidorInput: event.target.value });
    }

    checkServerStatus = () => {
        const { servidorInput } = this.state;

        axios.get(`http://localhost/api-backend/sites_avaliable/index.php?servidor=${servidorInput}`)
            .then((response) => {
                if (response.data === 'online') {
                    this.setState({ serverStatus: 'online' });
                } else {
                    this.setState({ serverStatus: 'offline' });
                }
            })
            .catch((error) => {
                this.setState({ serverStatus: 'offline' });
                console.error('Erro ao verificar o status do servidor:', error);
            });
    }

    render() {
        return (
            <div className="home-container"> 
                <h1 className="form-title">Status do Servidor</h1> 
                <input
                    type="text"
                    className="form-input" 
                    placeholder="Endereço do servidor"
                    value={this.state.servidorInput}
                    onChange={this.handleServidorInputChange}
                />
                <button className="form-button" onClick={this.checkServerStatus}>Verificar</button>
                                {this.state.serverStatus !== null && (
                    <p>O servidor está {this.state.serverStatus}.</p>
                )}
          <Link to="/" className="return-link">Retornar à página inicial</Link>

            </div>
        );
    }
}

export default ServerStatus;
