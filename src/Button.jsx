import React from 'react';

export default function Botao(props) {
    return (
        <button className={props.className} type='button' onClick={props.onClick}>
            {props.valor}
        </button>
    );
}