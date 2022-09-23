import useChange from "./useChange";

function ComponenteCorreo (){
    
    const {handleInputChange} = useChange();

    return(
        <div className="input-group">
            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div> 
            <input id="usuario" type="text" className="form-control" onChange={handleInputChange} placeholder="Email" name="email" title="Ingrese su correo" required/>
        </div>
        
    );
}

export default ComponenteCorreo;