function ComponenteGenerarPDF(props) {

    return (
  
        <div>
            <label id="labelGenerarPDF-ResultadoDiagnostico">
            {props.mensaje}
        </label>
                <button id="generarDiagnostico-ResultadoDiagnostico" type="button" className="btn btn-success" onClick={props.funcion} title="Generar PDF">
                    <i className="fas fa-file-pdf"></i>
                    Generar PDF
                </button>
        </div>
        
    );
}

export default ComponenteGenerarPDF;