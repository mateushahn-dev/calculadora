import React from 'react';

export default function Visor(props) {
    return (
        <div className='visor'>
            <span>{props.valorExibido}</span>
        </div>
    );
}