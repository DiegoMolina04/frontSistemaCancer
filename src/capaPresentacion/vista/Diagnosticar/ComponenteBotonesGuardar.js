import useDiagnosticar from "../../../capaNegocio/logicaNegocio/Diagnosticar/useDiagnosticar";

function ComponenteBotonesGuardar() {

    const { tomarDecision } = useDiagnosticar();

    return (
        <>
            <div id="botonReiniciar-Diagnosticar">

                <button type="button" className="btn btn-primary" title="Reiniciar diagnóstico" onClick={(e) => tomarDecision(e, false)}>
                    No
                </button>

            </div>

            <div id="botonPositivo-Diagnosticar">

                <button type="button" className="btn btn-secondary" title="Guardar diagnóstico" onClick={(e) => tomarDecision(e, true)}>
                    Si
                </button>

            </div>
        </>

    );
}

export default ComponenteBotonesGuardar;