import useDiccionario from "../../../capaNegocio/logicaNegocio/Diccionario/useDiccionario";

function ComponenteAgregarDiccionario() {

    const { redireccionarAgregarDiccionario } = useDiccionario();

    return (

        <div><label id="labelAgregarTermino-AdministrarTerminos">
            ¿Desea agregar un nuevo termino?
        </label>

            <button id="agregarTermino-AdministrarTerminos" type="button" className="btn btn-success" onClick={redireccionarAgregarDiccionario} title="Agregar nuevo termino">
                <i class="fas fa-plus-circle"></i>
                Agregar Termino
            </button>

        </div>

    );
}

export default ComponenteAgregarDiccionario;