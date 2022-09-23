import useChange from "./useChange";

function ComponenteCorreoFijo(props) {
    
    const {handleInputChange} = useChange();

    return (

        <div className="input-group">
            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
            <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" readonly="readonly" value={props.email} />
    </div>
    
    );
}

export default ComponenteCorreoFijo;