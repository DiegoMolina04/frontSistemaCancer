import '../css/AgregarTipoDepresion.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoAgregarTipoDepresion from '../image/logo.png'
import React, { Fragment, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

function AgregarTipoDepresion() {

    /*const [datos, setDatos] = useState({
        pregunta: ''
    })*/
    const [datos, setDatos] = useState({
        tipos_depresion: ""
    })

    const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
    const {token, setToken} = useContext(UserContext);

    let componenteMostrarMensaje = <h5></h5>

    console.log("Esto es lo de datos");
    console.log(datos);

    const handleInputChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = async (event) => {

        event.preventDefault();
        
        console.log("Datos dentro del enviarDatos");
        console.log(datos);

        /*setDatos({
            ...datos,
            'sintomas':sintomaId
        });*/

        
        /*console.log("Tamaño sintoma ID");
        console.log((sintomaId).length);*/
        if (datos.tipos_depresion !== "") { //Si los campos estan completados
            console.log("Vector creado");
            const arrayDatos = {'tipo_depresion':datos.tipos_depresion}
            console.log(arrayDatos);
            /*console.log("Datos llenos");
            console.log(datos);*/
            const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/create-one", {
                method: "POST",
                mode: "cors",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(arrayDatos)
            })

            const respuesta = await data.json();
            console.log(respuesta.status);

            setRespuestaServidor(respuesta.status);
            
            console.log("Estos son los datos correctos " + JSON.stringify(datos));

        } else if (datos.tipos_depresion == "") { //Se verifica que no existan campos vacios

            //Codigo seteado para respuesta de campos vacios sin intervención del servidor
            //El servidor se agotó esperando el resto de la petición del navegador
            setRespuestaServidor(408);
            console.log("Estos son los datos erroneos " + datos);


        } else { //Si sucede algo inesperado

            //El recurso solicitado se ha ido y no volverá
            setRespuestaServidor(410);
            
        }

    }

    function regresarVistaSintomas(){

        setRespuestaServidor("");
        return <Redirect to="/plataforma/tiposdepresion" />
    }

    switch (respuestaServidor) {

        case 401:
            componenteMostrarMensaje = <h5>Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 403:
            componenteMostrarMensaje = <h5>Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 404:
            componenteMostrarMensaje = <h5>Ocurrio un error, intente de nuevo.</h5>
            break;

        case 408:
            componenteMostrarMensaje = <h5>Por favor llene todos los campos.</h5>
            break;

        case 410:
            componenteMostrarMensaje = <h5>Sucedio algo inesperado, vuelva a intentar.</h5>
            break;

        case 500:
            componenteMostrarMensaje = <h5>Un error a sucedido, intente de nuevo.</h5>
            break;

        case 201:

            /*setRespuestaServidor("Usuario creado");*/
            setRespuestaServidor(201);
            return <Redirect to="/plataforma/tiposdepresion" />

            break;

        default: //Si no coincide con ninguno

            break;

    }
    
    return (

        <div id="fondo-AgregarTiposDepresion">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarTiposDepresion">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarTiposDepresion">

                    <img id="logo-AgregarTiposDepresion" src={logoAgregarTipoDepresion} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarTiposDepresion" />

                <div id="cajaNuevoTipoDepresion-AgregarTipoDepresion">
                    <label id="labelNuevoTipoDepresion-AgregarTipoDepresion">Nuevo tipo de depresión</label>
                </div>

                <br />

                {componenteMostrarMensaje}


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-AgregarTipoDepresion">

                    {/*Sección ingrese cedula*/}
                    <label>Ingrese el tipo de depresión</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-question"></i></div>
                        <input id="inputIngreseTipoDepresion-AgregarTipoDepresion" type="text" className="form-control" placeholder="Ingrese el tipo de depresión" onChange={handleInputChange} name="tipos_depresion" />
                    </div>

                    <br />

                    {/*Sección ingrese nombre*/}

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarTiposDepresion">


                        <div id="cajaRegresar-AgregarTiposDepresion">

                            {/**/}
                            <Link to='/plataforma/tiposdepresion'>
                                <button id="botonRegresar-AgregarTiposDepresion" type="button" class="btn btn-primary" title="Regresar a la plataforma" onClick={regresarVistaSintomas}>Regresar</button>
                            </Link>
                            
                        </div>

                        <form className="row" onSubmit={enviarDatos}>
                            <div id="cajaEnviar-AgregarTiposDepresion">
                                <button id="botonEnviar-AgregarTiposDepresion" type="submit" class="btn btn-primary" title="Crear nuevo tipo de depresión" >Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarTipoDepresion;