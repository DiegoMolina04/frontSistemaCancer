//import usePreguntas from "../../../capaNegocio/logicaNegocio/Preguntas/usePreguntas";

function ComponenteGenerarPDF() {

    //const { redireccionarAgregarPregunta } = usePreguntas();
    /*onClick={redireccionarAgregarPregunta}*/

    return (
  
        <div>
            <label id="labelGenerarPDF-ResultadoDiagnostico">
            ¿Desea generar reporte en PDF?
        </label>
                <button id="generarDiagnostico-ResultadoDiagnostico" type="button" className="btn btn-success"  title="Generar PDF">
                    <i class="fas fa-file-pdf"></i>
                    Generar PDF
                </button>
        </div>
        
    );
}

export default ComponenteGenerarPDF;