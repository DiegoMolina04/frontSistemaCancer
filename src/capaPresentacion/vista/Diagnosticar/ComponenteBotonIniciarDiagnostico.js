import useDiagnosticar from "../../../capaNegocio/logicaNegocio/Diagnosticar/useDiagnosticar";

function ComponenteBotonIniciarDiagnostico() {

    const { iniciarDiagnostico } = useDiagnosticar();

    return (
        <>
            <div id="botonIniciar-Diagnosticar">

                <button type="button" className="btn btn-secondary" onClick={(e) => iniciarDiagnostico(e)} title="Iniciar diagnóstico">
                    <i className="fas fa-share"></i>
                </button>

            </div>
        </>

    );
}

export default ComponenteBotonIniciarDiagnostico;