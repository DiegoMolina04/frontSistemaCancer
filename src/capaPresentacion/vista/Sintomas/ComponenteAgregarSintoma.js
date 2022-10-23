import useSintomas from "../../../capaNegocio/logicaNegocio/Sintomas/useSintomas";

function ComponenteAgregarSintoma() {

    const { redireccionarAgregarSintoma } = useSintomas();

    return (

        <div><label id="labelAgregarSintoma-AdministrarSintomas">
            ¿Desea agregar un nuevo síntoma?
        </label>

            <button id="agregarSintoma-AdministrarSintomas" type="button" className="btn btn-success" onClick={redireccionarAgregarSintoma} title="Agregar nuevo sintoma">
                <i className="fas fa-plus-circle"></i>
                Agregar Síntoma
            </button>

        </div>

    );
}

export default ComponenteAgregarSintoma;