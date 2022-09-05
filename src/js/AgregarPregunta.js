import '../css/AgregarPregunta.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logoAgregarUsuario from '../image/logo.png'
import React, { Fragment, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

function AgregarPregunta() {

    /*const [datos, setDatos] = useState({
        pregunta: ''
    })*/
    const [datos, setDatos] = useState({
        pregunta: '',
        sintomas: []
    })
    {/*,
    es_admin: ''*/}
    
    const [codigo, setCodigo] = useState(null);
    const [mensaje, setMensaje] = useState();
    const [sintomas, setSintomas] = useState(null);
    //const [sintomaSeleccionado, setSintomaSeleccionado] = useState("");
    const [sintomaId, setSintomaId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
    const {token, setToken} = useContext(UserContext);

    let componenteListarSintomas = null;

    let componenteMostrarMensaje = <h5></h5>

    console.log("Esto es lo de datos");
    console.log(datos);
    console.log(sintomaId);

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

    function handleCheckboxChange (event, elemento) {//const handleCheckboxChange = (event) => {

        //console.log(event.currentTarget);
        //console.log(event.target.checked);
        console.log(event.target.checked);
        //console.log(elemento);

        //let elementoSintoma = elemento.sintoma;
        let elementoSintomaId = elemento.id;
        let elementoSintomaMensaje = elemento.sintoma;

        if(event.target.checked == true){ //Si el checkbox es seleccionado
            
            setSintomaId([
                ...sintomaId,
                elementoSintomaId
            ]);

            setSintomaMensaje([
                ...sintomaMensaje,
                elementoSintomaMensaje
            ]);

        }else{ //Si el checkbox es deseleccionado

            const arrayFiltradoId = sintomaId.filter((item) => item !== elementoSintomaId); //Se saca del array el id del sintoma guardado
            setSintomaId(arrayFiltradoId);
            
            const arrayFiltradoMensaje = sintomaMensaje.filter((item) => item !== elementoSintomaMensaje); //Se saca del array el id del sintoma guardado
            setSintomaMensaje(arrayFiltradoMensaje);

        }

    }

    const enviarDatos = async (event) => {

        event.preventDefault();
        
        console.log("Datos dentro del enviarDatos");
        console.log(datos);
        console.log(sintomaId);

        /*setDatos({
            ...datos,
            'sintomas':sintomaId
        });*/

        
        /*console.log("Tamaño sintoma ID");
        console.log((sintomaId).length);*/
        if (datos.pregunta !== "" && (sintomaId).length !== 0 ) { //Si los campos estan completados
            console.log("Vector creado");
            const arrayDatos = {'pregunta':datos.pregunta, 'sintomas':sintomaId}
            console.log(arrayDatos);
            /*console.log("Datos llenos");
            console.log(datos);*/
            const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/questions/create-one", {
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

        } else if (datos.pregunta == "" || (sintomaId).length == 0) { //Se verifica que no existan campos vacios

            //Codigo seteado para respuesta de campos vacios sin intervención del servidor
            //El servidor se agotó esperando el resto de la petición del navegador
            setRespuestaServidor(408);
            console.log("Estos son los datos erroneos " + datos);


        } else { //Si sucede algo inesperado

            //El recurso solicitado se ha ido y no volverá
            setRespuestaServidor(410);
            
        }

    }

    const cargarSintomas = async (event) => {

        event.preventDefault();
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/symptoms/get-all", {
            method: "GET",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        })

        const respuesta = await data.json();
        console.log(respuesta);

        if(respuesta.code == 401){
            setRespuestaServidor(401);
        }else{
            setSintomas(respuesta.result.items);
            setCodigo("listar");
        }


    }

    if(codigo == "listar"){
        componenteListarSintomas = sintomas.map(elemento => (
            <tr>
                <td scope="row">{elemento.sintoma}</td>
                <td id="columnaCheckbox-AgregarPreguntas">
                    <input id="checkbox-AgregarPreguntas" class="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, elemento)}></input>
                </td>
            </tr>
        ))
    }

    function regresarVistaPregunta(){

        setRespuestaServidor("");
        return <Redirect to="/plataforma/preguntas" />
    }

    switch (respuestaServidor) {

        case 401:
            componenteMostrarMensaje = <h5>Ocurrio un error, debe iniciar sesión.</h5>
            break;

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

            /*setRespuestaServidor("Usuario creado");*/
            setRespuestaServidor(201);
            return <Redirect to="/plataforma/preguntas" />

            break;

        default: //Si no coincide con ninguno

            break;

    }
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

        <div id="fondo-AgregarPregunta">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarPregunta">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarPregunta">

                    <img id="logo-AgregarPregunta" src={logoAgregarUsuario} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarPregunta" />

                <div id="cajaNuevaPregunta-AgregarPregunta">
                    <label id="labelNuevoPregunta-AgregarPregunta">Nueva pregunta</label>
                </div>

                <br />

                {componenteMostrarMensaje}


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-AgregarPregunta">

                    {/*Sección ingrese cedula*/}
                    <label>Ingrese la pregunta</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-question"></i></div>
                        <input id="inputIngresePregunta-AgregarPregunta" type="text" className="form-control" placeholder="Ingrese la pregunta" onChange={handleInputChange} name="pregunta" />
                    </div>

                    <br />

                    {/*Sección ingrese nombre*/}
                    <label>Seleccione el/los sintomas</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                        <textarea class="form-control" placeholder="Seleccione los sintomas" readonly="readonly" value={sintomaMensaje}></textarea>
                        {/*<input id="inputSeleccionSintomas-AgregarPregunta" type="text" className="form-control" placeholder="Seleccione los sintomas" title="Digite su nombre completo" name="sintoma" readonly="readonly" value={sintomaMensaje} />*/}{/*value={sintomaSeleccionado}*/}
                    </div>

                    <br />

                    <div id="cajaTabla-AgregarPreguntas">
                        <form className="row" onSubmit={cargarSintomas}>
                            <div id="cajaBotonRecargar-AgregarPreguntas">
                                <button id="botonRecargar-AgregarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                            </div>
                        </form>
                        <table id="tablaSintomas-AgregarPreguntas" class="table table-bordered">

                            <thead> {/*Cabeceras*/}
                                <tr>
                                    <th id="sintomaTablaCabecera-AgregarPreguntas" scope="col" title="Sintomas">Sintoma</th>
                                    <th id="seleccionTablaCabecera-AgregarPreguntas" scope="col" title="Selecciones">Elegir</th>

                                </tr>
                                {componenteListarSintomas}
                            </thead>
                        </table>

                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarPregunta">


                        <div id="cajaRegresar-AgregarPregunta">

                            {/**/}
                            <Link to='/plataforma/preguntas'>
                                <button id="botonRegresar-AgregarPregunta" type="button" class="btn btn-primary" title="Regresar a la plataforma" onClick={regresarVistaPregunta}>Regresar</button>
                            </Link>
                            
                        </div>

                        <form className="row" onSubmit={enviarDatos}>
                            <div id="cajaEnviar-AgregarPregunta">
                                <button id="botonEnviar-AgregarPregunta" type="submit" class="btn btn-primary" title="Crear nueva pregunta" data-bs-toggle="modal" data-bs-target="#modalMensaje-AgregarUsuario">Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarPregunta;