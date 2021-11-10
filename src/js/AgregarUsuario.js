import '../css/AgregarUsuario.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoAgregarUsuario from '../image/logo.png'
import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";

function AgregarUsuario() {

    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        contraseña: '',
        es_admin: false
    })
    {/*,
    es_admin: ''*/}
    
    const handleInputChange = (event) => {
          // console.log(event.target.name)
          // console.log(event.target.value)
          setDatos({
              ...datos,
              [event.target.name] : event.target.value
        })
    }

    const handleRadioChange = (event) => {
        
        const es_admin = event.currentTarget.value === 'true' ? true: false;

        setDatos({
           es_admin
      })
  }
    
    const enviarDatos = (event) => {
       
          event.preventDefault()
            fetch("http://4f3a-186-154-36-85.ngrok.io/user",{
              method:"POST",
              mode:"cors",
              headers:{
                
                "Content-Type":"application/json"
              },
              body: JSON.stringify(datos)
          })
          console.log(JSON.stringify(datos))

    }
    {/* const enviarDatos = async(event) => {
       
          event.preventDefault()
          await fetch("http://4104-186-154-36-85.ngrok.io/user",{
              method:"POST",
              mode:"no-cors",
              headers:{
                "Access-Control-Allow-Origin":"http://localhost:3000",
                "Access-Control-Allow-Methods": "POST",
                "Content-Type":"application/"
              },
              body: JSON.stringify(datos)
          })
          console.log(JSON.stringify(datos))

    } */}
    return ( 

        <div id="fondo-AgregarUsuario">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarUsuario">
                
                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarUsuario">

                    <img id="logo-AgregarUsuario" src={logoAgregarUsuario} alt=""/>

                </div>

                
                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarUsuario"/>
                
                <div id="cajaNuevoUsuario-AgregarUsuario">
                    <label id="labelNuevoUsuario-AgregarUsuario">Nuevo usuario</label>
                </div>


                {/*Contenedor de todo el formulario*/}
                <form className="row" onSubmit={enviarDatos}>

                <div id="formulario-AgregarUsuario">

                    {/*Sección ingrese nombre*/}
                    <label>Ingrese su nombre completo</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                        <input id="nombre-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su nombre de usuario" title="Digite su nombre completo" onChange={handleInputChange} name="nombre"/>
                    </div>

                    <br />
                    
                    {/*Sección ingrese email*/}
                    <label>Ingrese su email</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>
                        <input id="correo-AgregarUsuario" type="email" className="form-control" placeholder="Ingrese su email" title="Digite su email" onChange={handleInputChange} name="email"/>
                    </div>

                    <br />

                    {/*Sección ingrese contraseña*/}
                    <label>Ingrese su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseña-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su contraseña" title="Digite su contraseña" onChange={handleInputChange} name="contraseña"/>
                    </div>

                    <br />

                    {/*Sección rectifique contraseña*/}
                    <label>Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseñaRe-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese nuevamente su contraseña" title="Reingrese su contraseña" onChange={handleInputChange} name="Recontraseña"/>
                    </div>

                    <br />

                    {/*Sección tipo de usuario*/}
                    <label id="tipoCuenta-AgregarCuenta">Tipo de cuenta</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="true" title="Cuenta para administrador" onChange={handleRadioChange} name="es_admin"/>
                        <p id="pAdministrador-AgregarCuenta" for="inlineRadio1">Administrador</p>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option2" title="Cuenta para usuario"/>
                        <p id="pUsuario-AgregarCuenta" for="inlineRadio2">Usuario</p>
                    </div>
                      
                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarCuenta">

                        
                        <div id="cajaRegresar-AgregarCuenta">

                            <Link to='/plataforma'>
                            <button id="botonRegresar-AgregarCuenta" type="button" class="btn btn-primary" title="Regresar a la plataforma">Regresar</button>
                            </Link>

                        </div>
                        
                        
                        <div id="cajaEnviar-AgregarCuenta">
                            <button id="botonEnviar-AgregarCuenta" type="submit" class="btn btn-primary" title="Crear nuevo usuario">Enviar</button>
                        </div>
                        

                    </div>
                    
                    {/*<button type="button" class="btn btn-primary">Primary</button>*/}
                    <br />

                    {/*
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">1</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">2</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
                        <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                    </div>
                    */}
                </div>
                </form>

            </div>

        </div>
    );
}

export default AgregarUsuario;