import useTiposDepresion from "../../../capaNegocio/logicaNegocio/TiposDepresion/useTiposDepresion";

function ComponenteAgregarTipoDepresion() {

    const { redireccionarAgregarTiposDepresion } = useTiposDepresion();

    return (

        <div>
            <label id="labelAgregarTipoDepresion-AdministrarTipoDepresion">
                ¿Desea agregar un tipo depresión?
            </label>

            <button id="agregarTipoDepresion-AdministrarTipoDepresion" type="button" className="btn btn-success" onClick={redireccionarAgregarTiposDepresion} title="Agregar nuevo tipo depresión">
                <i class="fas fa-plus-circle"></i>
                Agregar Tipo Depresión
            </button>
            
        </div>

    );
}

export default ComponenteAgregarTipoDepresion;