import '../css/CrearContraseña.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoCrearContraseña from '../image/logo.png'
import React, {Fragment, useState, useContext} from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import { Redirect } from "react-router-dom";

function CrearContraseña() {
    
    const [datos, setDatos] = useState({

        contraseña:''
    })
    
    const handleInputChange = (event) => {
          /*console.log(event.target.name)
          console.log(event.target.value)*/
          setDatos({
              ...datos,
              [event.target.name] : event.target.value
        })
    }
    
    /*Contextos para globalizar respuesta de servidor, consultar correo para crear contraseña y reutilizar 
    contexto token (sin realizar acciones referentes a este) para darle un estado a la pagina*/

    const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
    const {correo, setCorreo} = useContext(UserContext);
    const {token, setToken} = useContext(UserContext);

    /*Se inicia componente para mostrar mensajes correspondientes a errores*/
    let componenteMostrarMensaje = <h5></h5>

    const enviarDatos = async(event) => {
        
        event.preventDefault();
        
        if (datos.contraseña == datos.Recontraseña && datos.contraseña != "" && datos.Recontraseña != ""){
            
            const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/"+correo+"/update-one";
            
            const data = await fetch(url,{
                method:"PUT",
                mode:"cors",
                headers:{
                    
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(datos)
            })
            /*console.log(JSON.stringify(datos));*/
            
            /*console.log("Creado correctamente");
            
            console.log("El correo es "+correo);*/
            
            const respuesta = await data.json();
            /*setCorreo();*/
            setRespuestaServidor(respuesta);
            setRespuestaServidor(respuesta);
            setToken("Correcto");
            /*console.log(respuestaServidor);*/
            /*console.log("Esta es la respuesta "+JSON.stringify(respuestaServidor, null, 2));*/
            

        }else if(datos.contraseña == "" || datos.Recontraseña == ""){ /*Se verifica que no existan campos vacios*/
            
            setToken("Campos vacios");
            /*console.log(respuestaServidor);*/
            

        }else{ /*Si las contraseñas son distintas*/

            /*console.log("Entre");*/
            /*setRespuestaServidor("Incorrecto");*/
            setToken("Incorrecto");

            /*console.log(respuestaServidor);*/
            
        }
        
    }

    switch (token){
        
        case "Campos vacios":
            componenteMostrarMensaje = <h5>Por favor llene todos los campos.</h5>
        break;
        
        case "Incorrecto":
            componenteMostrarMensaje = <h5>Los campos no son iguales, verifique información.</h5>
        break;

        case "Correcto":
            /*setRespuestaServidor(200);*/
            /*console.log("Esta es la respuesta "+JSON.stringify(respuestaServidor.status, null, 2));*/
            return <Redirect to="/login" />
        break;

        /*404 intentar actualizar con correo que no existe
        400 falla algo en la base de datos        
        */
    }

    /*console.log("Desde crear contraseña "+correo);*/
    
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

                {componenteMostrarMensaje}

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
                            
                            {/*<Link to='/plataforma/diagnosticar'></Link>*/}

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

export default CrearContraseña;