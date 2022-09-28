import useSintomas from "../../../capaNegocio/logicaNegocio/Sintomas/useSintomas";

function ComponenteAgregarSintoma() {

    const { redireccionarAgregarSintoma } = useSintomas();

    return (

        <div><label id="labelAgregarSintoma-AdministrarSintomas">
            ¿Desea agregar un nuevo sintoma?
        </label>

            <button id="agregarSintoma-AdministrarSintomas" type="button" className="btn btn-success" onClick={redireccionarAgregarSintoma} title="Agregar nuevo sintoma">
                <i class="fas fa-plus-circle"></i>
                Agregar Sintoma
            </button>

        </div>

    );
}

export default ComponenteAgregarSintoma;