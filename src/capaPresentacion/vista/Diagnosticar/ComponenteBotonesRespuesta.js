import useDiagnosticar from "../../../capaNegocio/logicaNegocio/Diagnosticar/useDiagnosticar";

function ComponenteBotonesRespuesta() {

    const { responderPregunta } = useDiagnosticar();

    return (
        <>
            <div id="botonNegativo-Diagnosticar">

                <button type="button" class="btn btn-primary" title="No corresponde" onClick={(e) => responderPregunta(e, false)}>
                    <i class="fas fa-times"></i>
                </button>

            </div>

            <div id="botonPositivo-Diagnosticar">

                <button type="button" class="btn btn-secondary" title="Si corresponde" onClick={(e) => responderPregunta(e, true)}>
                    <i class="fas fa-check"></i>
                </button>

            </div>
        </>

    );
}

export default ComponenteBotonesRespuesta;