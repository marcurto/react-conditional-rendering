import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error'

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    // Definimos el state de la pregunta. Emprezamos con una cantidad de 0 euros.
    const [ cantidad, guardarCantidad ] = useState(0);
    // Definimos el state del error. Por defecto, serà 0.
    const [ error, guardarError ] = useState(false);

    // Función input presupueseto. Tenemos que acceder a los valores del evento (e.target, e.value, e.name), por eso le pasamos el evento e
    // Otra cosa a tener en cuenta es que necesitamos que necesitamos que los valores introducidos sean numeros, por eso usamos parseInt 
    const definirPresupuesto = e => {
        guardarCantidad( parseInt(e.target.value, 10))
    }

    // Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        // Validación.
        // Cuando introducimos algo en el input y luego lo borramos, en el state se nos guarda una variable del tipo NaN; por eso, debemos validar también esa posibilidad
        if(cantidad < 1 || isNaN(cantidad)) {
            guardarError(true);
            return;
        }

        // Comportamiento según imput introducido.
        // Si introducimos un input válido, el estado del error va a cambiar a falso y el tanto el valor de la cantidad como del restante, de momento, va a ser la introducida
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);


    }

    return (
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            {/* Como vamos a reutilizar el div del error, lo vamos a crear como un componente y le vamos a pasar como props "mensaje" para poder personalizarlo en función de la pantalla en la que estemos */}
            { error ? <Error mensaje="El Presupuesto es incorrecto"/> : null }

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir prespuesto"
                />

            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;