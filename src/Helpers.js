export const revisarPresupuesto = (presupuesto, restante) => {
    // Cuando el presupuesto tenga más del 75% disponible lo vamos a mostrar en verde
    // Cuando el presupuesto tenga entre el 50 y el 75% disponible lo vamos a mostrar en amarillo
    // Cuando el presupuesto tenga menos del 25% disponible lo vamos a mostrar en rojo

    let clase;

    if( (presupuesto / 4) > restante) {
        clase = 'alert alert-danger';
    } else if ( (presupuesto / 2) > restante ){
        clase = 'alert alert-warning';
    } else {
        clase= 'alert alert-success'
    }

    return clase;
}