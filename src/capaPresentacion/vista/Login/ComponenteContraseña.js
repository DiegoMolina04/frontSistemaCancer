import useChange from "./useChange";

function ComponenteContraseña() {

    const {handleInputChange} = useChange();

    return (

        <div className="input-group">
            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
            <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña" required />
        </div>

    );
}

export default ComponenteContraseña;