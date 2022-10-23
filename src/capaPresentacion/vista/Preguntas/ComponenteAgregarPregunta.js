import usePreguntas from "../../../capaNegocio/logicaNegocio/Preguntas/usePreguntas";

function ComponenteAgregarPregunta() {

    const { redireccionarAgregarPregunta } = usePreguntas();

    return (
  
        <div>
            <label id="labelAgregarPregunta-AdministrarPreguntas">
            ¿Desea agregar una nueva pregunta?
        </label>
                <button id="agregarPregunta-AdministrarPreguntas" type="button" className="btn btn-success" onClick={redireccionarAgregarPregunta} title="Agregar nueva pregunta">
                    <i className="fas fa-plus-circle"></i>
                    Agregar Pregunta
                </button>
        </div>
        
    );
}

export default ComponenteAgregarPregunta;