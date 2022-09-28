/*Se usa para mostrar columna modifcar/eliminar en las distintas
tablas si es administrador*/
function ColumnaModificarEliminar(props) {
    
    return (
        
        <th id={props.id} scope="col" title={props.title}>Modificar/Eliminar</th>
    
    );
}

export default ColumnaModificarEliminar;