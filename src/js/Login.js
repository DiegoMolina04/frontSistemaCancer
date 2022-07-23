//import logo from './logo.svg';
import '../css/Login.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/logo.png'
import React, {Fragment, useState, useContext} from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";


function Login() {

  const [datos, setDatos] = useState({
    email:'',
    contraseña:''
})

const handleInputChange = (event) => {
      console.log(event.target.name)
      console.log(event.target.value)
      setDatos({
          ...datos,
          [event.target.name] : event.target.value
    })
}

const consultarUsuario = async(event) => {
   
      event.preventDefault()

        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/login",{
          method:"POST",
          mode:"cors",
          headers:{
            
            "Content-Type":"application/json"
          },
          body: JSON.stringify(datos)
      })
      console.log(JSON.stringify(datos))
      /*console.log(await data.json())*/
      /*setUser(await data.json())*/
      const respuesta = await data.json();
      /*setUser(respuesta.result);*/

      setUser(respuesta.message);
}
  
  const {user, setUser} = useContext(UserContext);

  return (
  
    <div id="seccion">

      <div id="caja">
      
        <div id="cajaLogo">

            <img id="logo" src={logo} alt=""/>

        </div>

        <hr id="linea"/>

        <form className="row" onSubmit={consultarUsuario}>

          <p>Inicio de sesión</p>

          <div className="input-group">
              <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
              <input id="usuario" type="text" className="form-control" placeholder="Email" onChange={handleInputChange} name="email" title="Ingrese su correo"/>
          </div>

          <div className="input-group">
              <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
              <input id="contraseña" type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} name="contraseña" title="Ingrese su contraseña"/>
          </div>
          
          
          <div id="cajaBoton">
            
            {/*<pre>{JSON.stringify(user, null, 2)}</pre>*/}
            <pre>{JSON.stringify(user, null, 2)}</pre>
            
            {/*<Link to='/crearcontraseña' ></Link>*/}

              {/*<button type="button" className="btn btn-success" title="Iniciar sesión" onClick="prueba()">Enviar</button>*/}
              <button type="submit" class="btn btn-success" title="Iniciar sesión">Enviar</button>
            

          </div>
        
        </form>
      </div>

    </div>
  );
}

export default Login;
