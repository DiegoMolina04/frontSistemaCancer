import '../../css/AgregarUsuario.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
import logoAgregarUsuario from '../../image/logo.png'
import React, { Fragment, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";

import useChange from './useChange';
import useAgregarUsuario from '../../../capaNegocio/logicaNegocio/useAgregarUsuario';
import verificarNumeros from '../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';


function AgregarUsuario() {

    const [datos, setDatos] = useState({
        cedula: '',
        nombre: '',
        email: '',
        /*es_admin: false*/
        es_admin: ''
    })
    {/*,
    es_admin: ''*/}

    const [codigo, setCodigo] = useState(null);
    const [mensaje, setMensaje] = useState();
    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);

    const { handleInputChange } = useChange();
    const { verificarDatos, componenteMostrarMensaje, estadoInicial } = useAgregarUsuario();

    /*const handleInputChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }*/

    /*const handleRadioChange = (event) => {

        const es_admin = event.currentTarget.value === 'true' ? true : false;

        setDatos({
            ...datos,
            es_admin
        })
    }*/

    //let componenteMostrarMensaje = <h5></h5>

    const enviarDatos = async (event) => {

        event.preventDefault();
        console.log("Entre al boton");
        console.log(datos);

        if (datos.cedula !== "" && datos.nombre !== "" && datos.email !== "" && datos.es_admin !== "") { /*Si los campos estan completados*/

            const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/create-one", {
                method: "POST",
                mode: "cors",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            })

            const respuesta = await data.json();
            console.log(respuesta.status);

            if (respuesta.status === undefined) { //Si el correo ya existe -> Error 404
                console.log("Es indefinido");
                setCodigo(respuesta.code);
                //console.log(respuesta.code);
            } else { //Si es diferente
                setCodigo(respuesta.status);
            }

            /*setRespuestaServidor(201);*/


            /*setCorreo();*/

            //setRespuestaServidor(respuesta);

            /*setRespuestaServidor(respuesta);*/

            //setToken("Correcto");

            /*console.log(respuestaServidor);*/
            /*console.log("Esta es la respuesta "+JSON.stringify(respuestaServidor, null, 2));*/

            console.log("Estos son los datos correctos " + JSON.stringify(datos));

        } else if (datos.cedula == "" || datos.nombre == "" || datos.email == "" || datos.es_admin == "") { /*Se verifica que no existan campos vacios*/

            //setToken("Campos vacios");
            /*console.log(respuestaServidor);*/

            /*Codigo seteado para respuesta de campos vacios sin intervención del servidor*/
            //El servidor se agotó esperando el resto de la petición del navegador
            setCodigo(408);
            console.log("Estos son los datos erroneos " + datos);


        } else { /*Si sucede algo inesperado*/

            /*console.log("Entre");*/
            /*setRespuestaServidor("Incorrecto");*/
            //setToken("Incorrecto");
            //El recurso solicitado se ha ido y no volverá
            setCodigo(410);
            /*console.log(respuestaServidor);*/
            console.log("Sali al else");
        }

    }

    /*switch (codigo) {

        case 404:
            componenteMostrarMensaje = <h5>El correo ingresado ya esta registrado.</h5>
            break;

        case 408:
            componenteMostrarMensaje = <h5>Por favor llene todos los campos.</h5>
            break;

        case 410:
            componenteMostrarMensaje = <h5>Sucedio algo inesperado, vuelva a intentar.</h5>
            break;

        case 500:
            componenteMostrarMensaje = <h5>La cedula ingresada ya esta registrada.</h5>
            break;

        case 201:

            //setRespuestaServidor("Usuario creado");
            setRespuestaServidor(201);
            return <Redirect to="/plataforma/administrarusuarios" />

            break;

        default: //Si no coincide con ninguno

            break;

    }*/
    /*switch (token){
        
        case "Campos vacios":
            componenteMostrarMensaje = <h5>Por favor llene todos los campos.</h5>
        break;
        
        case "Incorrecto":
            componenteMostrarMensaje = <h5>Los campos no son iguales, verifique información.</h5>
        break;

        case "Correcto":
            /*setRespuestaServidor(200);*/
    /*console.log("Esta es la respuesta "+JSON.stringify(respuestaServidor.status, null, 2));*/
    /*return <Redirect to="/login" />
break;

/*404 intentar actualizar con correo que no existe
400 falla algo en la base de datos        
*/
    /* }*/

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

                    <img id="logo-AgregarUsuario" src={logoAgregarUsuario} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarUsuario" />

                <div id="cajaNuevoUsuario-AgregarUsuario">
                    <label id="labelNuevoUsuario-AgregarUsuario">Nuevo usuario</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}
                <form className="row" onSubmit={(e) => verificarDatos(e, datosGuardados)}>

                    <div id="formulario-AgregarUsuario">

                        {/*Sección ingrese cedula*/}
                        <label>Ingrese cedula de usuario</label>
                        <div className="input-group">
                            <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                            <input id="cedula-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese cedula de usuario" title="Digite su numero de cedula" onChange={handleInputChange}
                                onKeyDown={verificarNumeros} name="cedula" required />
                        </div>

                        <br />

                        {/*Sección ingrese nombre*/}
                        <label>Ingrese su nombre completo</label>
                        <div className="input-group">
                            <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-user"></i></div>
                            <input id="nombre-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su nombre de usuario" title="Digite su nombre completo" onChange={handleInputChange} name="nombre" required />
                        </div>

                        <br />

                        {/*Sección ingrese email*/}
                        <label>Ingrese su email</label>
                        <div className="input-group">
                            <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-envelope"></i></div>
                            <input id="correo-AgregarUsuario" type="email" className="form-control" placeholder="Ingrese su email" title="Digite su email" onChange={handleInputChange} name="email" required />
                        </div>

                        <br />

                        {/*{//Sección ingrese contraseña}
                    <label>Ingrese su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseña-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese su contraseña" title="Digite su contraseña" onChange={handleInputChange} name="contraseña"/>
                    </div>

                    <br />

                    {//Sección rectifique contraseña}
                    <label>Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseñaRe-AgregarUsuario" type="text" className="form-control" placeholder="Ingrese nuevamente su contraseña" title="Reingrese su contraseña" onChange={handleInputChange} name="Recontraseña"/>
                    </div>

                    <br />*/}

                        {/*Sección tipo de usuario*/}
                        <label id="tipoCuenta-AgregarCuenta">Tipo de cuenta</label>
                        <div class="form-check form-check-inline">
                            {/*<input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="true" title="Cuenta para administrador" onChange={handleRadioChange} name="es_admin"/> /* name="inlineRadioOptions" */}
                            <input class="form-check-input" type="radio" id="radioButton" value="true" title="Cuenta para administrador" onChange={handleInputChange} name="es_admin" /> {/* name="inlineRadioOptions" */}
                            <p id="pAdministrador-AgregarCuenta" for="inlineRadio1">Administrador</p>
                        </div>
                        <div class="form-check form-check-inline">
                            {/*<input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioButton" value="option2" title="Cuenta para usuario" onChange={handleRadioChange} name="es_admin"/> /* name="inlineRadioOptions" */}
                            <input class="form-check-input" type="radio" id="radioButton" value="false" title="Cuenta para usuario" onChange={handleInputChange} name="es_admin" /> {/* name="inlineRadioOptions" */}
                            <p id="pUsuario-AgregarCuenta" for="inlineRadio2">Usuario</p>
                        </div>

                        <br />

                        {/*Sección Botones Enviar y Regresar*/}
                        <div id="cajaBotones-AgregarCuenta">


                            <div id="cajaRegresar-AgregarCuenta">

                                {/*<Link to='/plataforma/administrarusuarios'> </Link>*/}
                                    <button id="botonRegresar-AgregarCuenta" type="button" class="btn btn-primary" onClick={(e) => estadoInicial(e)} title="Regresar a la plataforma">Regresar</button>
                                
                            </div>


                            <div id="cajaEnviar-AgregarCuenta">
                                <button id="botonEnviar-AgregarCuenta" type="submit" class="btn btn-primary" title="Crear nuevo usuario" data-bs-toggle="modal" data-bs-target="#modalMensaje-AgregarUsuario">Enviar</button>
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
            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            {/*<form className="row" >
                <div class="modal fade" id="modalMensaje-AgregarUsuario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarUsuarios">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                                
                            </div>
                            <div class="modal-body">

                                <label >Usuario creado correctamente</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar usuarios">Cancelar</button>
                                <button type="button" id="botonModalEliminar-AdministrarUsuarios" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar cuenta">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
                </form>*/}

        </div>
    );
}

export default AgregarUsuario;