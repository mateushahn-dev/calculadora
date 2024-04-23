import React, { Component } from 'react';
import Botao from './Button';
import Visor from './Display';

export default class Calculadora extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorExibido: '0',
            valorAnterior: null,
            operadorAtual: null,
            aguardandoOperando: false
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.lidarComTeclaPressionada);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.lidarComTeclaPressionada);
    }

    lidarComTeclaPressionada = event => {
        const { key } = event;
        if (/\d/.test(key)) {
            this.adicionarDigito(parseInt(key, 10));
        } else if (key === '.') {
            this.adicionarPontoDecimal();
        } else if (key === '+') {
            this.adicionarOperador('+');
        } else if (key === '-') {
            this.adicionarOperador('-');
        } else if (key === '*') {
            this.adicionarOperador('*');
        } else if (key === '/') {
            this.adicionarOperador('/');
        } else if (key === 'Enter' || key === '=') {
            this.lidarComIgual();
        } else if (key === 'Escape') {
            this.limparVisor();
        }
    };

    adicionarDigito = digito => {
        const { valorExibido, aguardandoOperando } = this.state;

        if (aguardandoOperando) {
            this.setState({
                valorExibido: String(digito),
                aguardandoOperando: false
            });
        } else {
            this.setState(prevState => ({
                valorExibido: prevState.valorExibido === '0' ? String(digito) : prevState.valorExibido + digito
            }));
        }

        this.limitarCaracteres();
    };

    adicionarOperador = operador => {
        const { valorExibido, valorAnterior, operadorAtual } = this.state;

        if (operadorAtual !== null) {
            this.calcular();
        } else {
            this.setState({
                valorAnterior: valorExibido
            });
        }

        this.setState({
            aguardandoOperando: true,
            operadorAtual: operador
        });

        this.limitarCaracteres();
    };

    adicionarPontoDecimal = () => {
        const { valorExibido } = this.state;

        if (!valorExibido.includes('.')) {
            this.setState({
                valorExibido: valorExibido + '.',
                aguardandoOperando: false
            });
        }

        this.limitarCaracteres();
    };

    lidarComIgual = () => {
        this.calcular();
        this.limitarCaracteres();
    };

    limparVisor = () => {
        this.setState({
            valorExibido: '0',
            valorAnterior: null,
            operadorAtual: null,
            aguardandoOperando: false
        });
    };

    calcular = () => {
        let resultado = 0;
        const { valorExibido, valorAnterior, operadorAtual } = this.state;

        switch (operadorAtual) {
            case '+':
                resultado = parseFloat(valorAnterior) + parseFloat(valorExibido);
                break;
            case '-':
                resultado = parseFloat(valorAnterior) - parseFloat(valorExibido);
                break;
            case '*':
                resultado = parseFloat(valorAnterior) * parseFloat(valorExibido);
                break;
            case '/':
                resultado = parseFloat(valorAnterior) / parseFloat(valorExibido);
                break;
            default:
                return;
        }

        if (resultado.toString().length > 15) {
            this.setState({
                valorExibido: 'Número muito grande'
            });
        } else {
            this.setState({
                valorExibido: String(resultado)
            });
        }

        this.setState({
            valorAnterior: null,
            aguardandoOperando: true,
            operadorAtual: null
        });

        this.limitarCaracteres();
    };

    limitarCaracteres = () => {
        const maxLength = 15;
        const { valorExibido } = this.state;
        if (valorExibido.length > maxLength) {
            this.setState({
                valorExibido: valorExibido.substring(0, maxLength)
            });
        }
    };

    render() {
        return (
            <div className='container'>
                <main>
                    <Visor valorExibido={this.state.valorExibido} />
                    <Botao className='btn-limpar' valor='AC' onClick={this.limparVisor} />
                    <Botao className='bg-operador' valor='/' onClick={() => this.adicionarOperador('/')} />
                    <Botao valor='7' onClick={() => this.adicionarDigito(7)} />
                    <Botao valor='8' onClick={() => this.adicionarDigito(8)} />
                    <Botao valor='9' onClick={() => this.adicionarDigito(9)} />
                    <Botao className='bg-operador' valor='*' onClick={() => this.adicionarOperador('*')} />
                    <Botao valor='4' onClick={() => this.adicionarDigito(4)} />
                    <Botao valor='5' onClick={() => this.adicionarDigito(5)} />
                    <Botao valor='6' onClick={() => this.adicionarDigito(6)} />
                    <Botao className='bg-operador' valor='-' onClick={() => this.adicionarOperador('-')} />
                    <Botao valor='1' onClick={() => this.adicionarDigito(1)} />
                    <Botao valor='2' onClick={() => this.adicionarDigito(2)} />
                    <Botao valor='3' onClick={() => this.adicionarDigito(3)} />
                    <Botao className='bg-operador' valor='+' onClick={() => this.adicionarOperador('+')} />
                    <Botao className='btn-0' valor='0' onClick={() => this.adicionarDigito(0)} />
                    <Botao valor='.' onClick={this.adicionarPontoDecimal} />
                    <Botao className='bg-operador' valor='=' onClick={this.lidarComIgual} />
                </main>
            </div>
        );
    }
}