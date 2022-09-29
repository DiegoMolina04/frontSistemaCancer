import usePlataforma from "../../../capaNegocio/logicaNegocio/Plataforma/usePlataforma";

function ComponenteAdministrarUsuarios() {

    const { redireccionarAdministrarUsuarios } = usePlataforma();

    return (
        <>
            <button id="administrarUsuario" type="button" className="btn btn-success" onClick={redireccionarAdministrarUsuarios} title="Agregar un nuevo usuario" >
                <i className="fas fa-user"></i>
                Administrar Usuarios
            </button>
        </>

    );
}

export default ComponenteAdministrarUsuarios;