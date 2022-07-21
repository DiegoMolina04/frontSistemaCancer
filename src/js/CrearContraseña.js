import '../css/CrearContraseña.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoCrearContraseña from '../image/logo.png'
import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";

function CrearContraseña() {

    const [datos, setDatos] = useState({
        nombre:'',
        email:'',
        contraseña:'',
        es_admin: false
    })
    {/*,
    es_admin: ''*/}
    
    const handleInputChange = (event) => {
          //console.log(event.target.name)
          //console.log(event.target.value)
          setDatos({
              ...datos,
              [event.target.name] : event.target.value
        })
    }

    const handleRadioChange = (event) => {
        
        const es_admin = event.currentTarget.value === 'true' ? true: false;

        setDatos({
            ...datos,
            es_admin
      })
  }
    
    const enviarDatos = (event) => {
       
          event.preventDefault()
            fetch("https://abea-186-29-180-157.ngrok.io/v1/users/create-one",{
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

        <div id="fondo-CrearContraseña">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-CrearContraseña">
                
                {/*Contenedor del logo*/}
                <div id="cajaLogo-CrearContraseña">

                    <img id="logo-CrearContraseña" src={logoCrearContraseña} alt=""/>

                </div>

                
                {/*Linea debajo del logo*/}
                <hr id="linea-CrearContraseña"/>
                
                <div id="cajaNuevoUsuario-CrearContraseña">
                    <label id="labelNuevoUsuario-CrearContraseña">Registro Contraseña Primera Vez</label>
                </div>

                <br />
                {/*Contenedor de todo el formulario*/}
                <form className="row" onSubmit={enviarDatos}>

                <div id="formulario-CrearContraseña">

                    {/*Sección ingrese contraseña*/}
                    <label>Ingrese su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseña-CrearContraseña" type="text" className="form-control" placeholder="Ingrese su contraseña" title="Digite su contraseña" onChange={handleInputChange} name="contraseña"/>
                    </div>

                    <br />

                    {/*Sección rectifique contraseña*/}
                    <label>Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseñaRe-CrearContraseña" type="text" className="form-control" placeholder="Ingrese nuevamente su contraseña" title="Reingrese su contraseña" onChange={handleInputChange} name="Recontraseña"/>
                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarCuenta">

                        
                        <div id="cajaRegresar-AgregarCuenta">

                            <Link to='/login'>
                            <button id="botonRegresar-AgregarCuenta" type="button" class="btn btn-primary" title="Regresar a la plataforma">Cancelar</button>
                            </Link>

                        </div>
                        
                        <div id="cajaEnviar-AgregarCuenta">
                            <Link to='/plataforma/diagnosticar'>
                            <button id="botonEnviar-AgregarCuenta" type="submit" class="btn btn-primary" title="Crear nuevo usuario">Enviar</button>
                            </Link>
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

export default CrearContraseña;