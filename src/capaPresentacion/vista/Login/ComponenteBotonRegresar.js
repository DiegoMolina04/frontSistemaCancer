import useChange from "./useChange";
import useLogin from "../../../capaNegocio/logicaNegocio/useLogin";

function ComponenteBotonRegresar(props) {
    
    const {handleInputChange} = useChange();
    const {estadoInicial} = useLogin();

    return (

        <button id="btnRegresar" type="button" class="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
    
    );
}

export default ComponenteBotonRegresar;