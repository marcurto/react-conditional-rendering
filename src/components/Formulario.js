import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    // Definimos el state del nombre y de la cantidad de cada gasto
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    // Definimos la función submit de gastos
    const agregarGasto = e => {
        e.preventDefault();

        // Validación
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false)

        // Definición de gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate() 
        }

        // Pasamos el gasto al componente principal
        guardarGasto(gasto);
        // Pasará a true el código de App.js linia 29 (función de crear y guardar gastos automáticamente)
        // de manera que ya se podrán generar gastos cuando hagámos el submit del formulario
        guardarCrearGasto(true);

        // Reseteamos el form
        guardarNombre('');
        guardarCantidad(0);

    }

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto" /> : null}

            <div className="campo">
                <label>Nombre del gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="'Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />

<input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar Gasto"
                />
            </div>

            

        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;