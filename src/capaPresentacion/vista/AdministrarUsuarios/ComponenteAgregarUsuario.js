import useAdministrarUsuarios from "../../../capaNegocio/logicaNegocio/AdministrarUsuarios/useAdministrarUsuarios";

function ComponenteAgregarUsuario() {

    const { redireccionarAgregarUsuario } = useAdministrarUsuarios();

    return (

        <div><label id="labelAgregarAdministrarUsuarios-AdministrarUsuarios">
            ¿Desea agregar un nuevo usuario?
        </label>

            <button id="agregarAdministrarUsuarios-AdministrarUsuarios" type="button" className="btn btn-success" onClick={redireccionarAgregarUsuario} title="Agregar un nuevo usuario">
                <i className="fas fa-plus-circle"></i>
                Agregar Usuario
            </button>

        </div>

    );
}

export default ComponenteAgregarUsuario;