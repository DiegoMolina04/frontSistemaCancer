import useDiagnosticar from "../../../capaNegocio/logicaNegocio/Diagnosticar/useDiagnosticar";

function ComponenteBotonesRespuesta() {

    const { responderPregunta } = useDiagnosticar();

    return (
        <>
            <div id="botonNegativo-Diagnosticar">

                <button type="button" className="btn btn-primary" title="No corresponde" onClick={(e) => responderPregunta(e, false)}>
                    <i className="fas fa-times"></i>
                </button>

            </div>

            <div id="botonPositivo-Diagnosticar">

                <button type="button" className="btn btn-secondary" title="Si corresponde" onClick={(e) => responderPregunta(e, true)}>
                    <i className="fas fa-check"></i>
                </button>

            </div>
        </>

    );
}

export default ComponenteBotonesRespuesta;