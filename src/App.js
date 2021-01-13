import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';



function App() {

  // Definimos el state del presupuesto y del restante.
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  // Definimos el state de motrar pregunta para definir que se muestre cuándo no haya ningún
  // presupuesto introducido y que desaparezca una vez éste se haya introducido
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  // Definimos el array de gastos que nos van a llegar desde "formulario"
  const [gastos, guardarGastos] = useState([]);
  // Definimos el objeto gasto que vamos a guardar en el array de gastos
  const [gasto, guardarGasto] = useState({});
  // Cuando introducimos el presupuesto y pasamos a la siguiente pantalla, como hemos usado useEffect
  // se ejecuta tuomáticamente la función que contiene (guardarGastos) y, por lo tanto, crea un gasto vacío.
  // para eliminarlo, creamos un nuevo estado 
  const [creargasto, guardarCrearGasto] = useState(false);


  // Usamos useEffect para actualizar el restane cada vez que introducimos un gasto
  // A la vez que generamos el gasto automáticamente (*)
  useEffect(() => {
    if(creargasto){

      // Agrega nuevo presupuesto
        guardarGastos([
          ...gastos,
          gasto
        ])

        // Restamos el gasto del presupuesto actual
        const presupuestoRestante = restante - gasto.cantidad;
        guardarRestante(presupuestoRestante);

        // Resetamos a false
        guardarCrearGasto(false);      
      }

      // Cuando terminamos el proyecto, la consola nos dice que al useEffect le faltan dependencias
      // Recordemos que el parámetro entre corchetes de este Hook son las variables que se deben revisar para
      // comprovar si ha habido algún cambio en ellas. Por eso, debemos introducirlas todas, no solo gasto como teníamos hasta el momento.
  }, [gasto, gastos, restante, creargasto])

 // (*) Antes, la función que pasábamos al submit era esta, que únicamente creaba el gasto pero
 // no actualizaba automáticamente

  // const agregarNuevoGasto = gasto => {
  //   guardarGastos([
  //     ...gastos,
  //     gasto
  //   ])
  // }


  return (
    <div className="container">
      <header>
        <h1>Gasto semanal</h1>

        <div className="contenido-principal contenido">
          {mostrarpregunta ? (
             <Pregunta
                guardarPresupuesto={guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
           />
          ):(
            <div className="row">
              <div className="one-half column">
                <Formulario 
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos}
                />
                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  restante={restante}
                />
        
              </div>
            </div>
          )}
         

          
        </div>
      </header>
    </div>
  );
}

export default App;
