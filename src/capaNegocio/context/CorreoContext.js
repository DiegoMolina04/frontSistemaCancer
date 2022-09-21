import { createContext } from "react";

/*export const CorreoContext = createContext(
<div className="input-group">
<div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div> 
<input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo" required/>
</div>);*/

export const CorreoContext = createContext({email:'',
contraseña:''});