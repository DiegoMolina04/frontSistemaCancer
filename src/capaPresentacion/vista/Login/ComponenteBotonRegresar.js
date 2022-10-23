import useLogin from "../../../capaNegocio/logicaNegocio/Login/useLogin";

function ComponenteBotonRegresar() {
    
    const {estadoInicial} = useLogin();

    return (

        <button id="btnRegresar" type="button" className="btn btn-secondary" onClick={estadoInicial} title="Regresar">Regresar</button>
    
    );
}

export default ComponenteBotonRegresar;