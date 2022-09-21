import '../css/AgregarDiccionario.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoAgregarDiccionario from '../image/logo.png'
import React, { Fragment, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../src/capaNegocio/context/UserContext.js";

function AgregarDiccionario() {

    const [datos, setDatos] = useState({
        termino: "",
        descripcion: ""
    })

    const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
    const {token, setToken} = useContext(UserContext);

    let componenteMostrarMensaje = <h5></h5>

    console.log("Esto es lo de datos");
    console.log(datos);

    /*console.log("Datos sintomas");
    console.log((datos.sintomas).length);*/
    /*console.log("Elemento guardado");
    console.log(elementoGuardado);*/

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
        if (datos.termino !== "" && datos.descripcion !== "" ) { //Si los campos estan completados
            console.log("Vector creado");
            const arrayDatos = {'termino':datos.termino, 'descripcion':datos.descripcion}
            //console.log(arrayDatos);
            /*console.log("Datos llenos");
            console.log(datos);*/
            const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/dictionary/create-one", {
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

        } else if (datos.termino == "" || datos.descripcion == "" ) { //Se verifica que no existan campos vacios

            //Codigo seteado para respuesta de campos vacios sin intervención del servidor
            //El servidor se agotó esperando el resto de la petición del navegador
            setRespuestaServidor(408);
            console.log("Estos son los datos erroneos " + datos);


        } else { //Si sucede algo inesperado

            //El recurso solicitado se ha ido y no volverá
            setRespuestaServidor(410);
            
        }

    }


    function regresarVistaDiccionario(){

        setRespuestaServidor("");
        return <Redirect to="/plataforma/diccionario" />
    }

    switch (respuestaServidor) {

        case 401:
            componenteMostrarMensaje = <h5>Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 403:
            componenteMostrarMensaje = <h5>Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 404:
            componenteMostrarMensaje = <h5>Ocurrio un error.</h5>
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
            return <Redirect to="/plataforma/diccionario" />

            break;

        default: //Si no coincide con ninguno

            break;

    }
 
    return (

        <div id="fondo-AgregarTerminos">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarTerminos">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarTerminos">

                    <img id="logo-AgregarTerminos" src={logoAgregarDiccionario} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarTerminos" />

                <div id="cajaNuevoTermino-AgregarTerminos">
                    <label id="labelNuevoTermino-AgregarTerminos">Nuevo termino</label>
                </div>

                <br />

                {componenteMostrarMensaje}


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-AgregarTerminos">

                    {/*Sección ingrese cedula*/}
                    <label>Ingrese el termino</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-question"></i></div>
                        <input id="inputIngreseTermino-AgregarTerminos" type="text" className="form-control" placeholder="Ingrese el termino" onChange={handleInputChange} name="termino" />
                    </div>

                    <br />

                    {/*Sección ingrese nombre*/}
                    <label>Descripción</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                        <textarea class="form-control" placeholder="Ingrese la descripción del termino" onChange={handleInputChange} name="descripcion"></textarea>
                        {/*<input id="inputSeleccionSintomas-AgregarPregunta" type="text" className="form-control" placeholder="Seleccione los sintomas" title="Digite su nombre completo" name="sintoma" readonly="readonly" value={sintomaMensaje} />*/}{/*value={sintomaSeleccionado}*/}
                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarTerminos">


                        <div id="cajaRegresar-AgregarTerminos">

                            {/**/}
                            <Link to='/plataforma/diccionario'>
                                <button id="botonRegresar-AgregarTerminos" type="button" class="btn btn-primary" title="Regresar a la plataforma" onClick={regresarVistaDiccionario}>Regresar</button>
                            </Link>
                            
                        </div>

                        <form className="row" onSubmit={enviarDatos}>
                            <div id="cajaEnviar-AgregarTerminos">
                                <button id="botonEnviar-AgregarTerminos" type="submit" class="btn btn-primary" title="Crear nuevo termino" >Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarDiccionario;