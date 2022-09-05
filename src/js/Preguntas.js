import '../css/Preguntas.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";
import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
/*import { Link } from "react-router-dom";*/
import { UserContext } from "../context/UserContext.js";


function Preguntas() {

    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { es_admin, setEs_admin } = useContext(UserContext); //Se verifica si se debe o no mostrar componentes para el usuario
    /*console.log("Renderizado !);*/
    /*    const userData = [{}]*/

    const [preguntas, setPreguntas] = useState([]); //Se guardan todos los usuarios
    const [codigo, setCodigo] = useState(null); //Se guarda identificador si se trata del boton para listar o filtrar
    const [filtro, setFiltro] = useState([]); //Se guarda la opción del dropdown y lo ingresado en el input
    const [sintomas, setSintomas] = useState(null); //Se guardan todos los sintomas
    const [sintomaId, setSintomaId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const [editarPregunta, setEditarPregunta] = useState({ //Se guarda las modificaciones del modificar pregunta
        pregunta: "",
        symptoms: { "": "" }
    });

    const [preguntaOriginal, setPreguntaOriginal] = useState({ //Se guarda la pregunta y sintomas original al quererlos modificar
        pregunta: "",
        symptoms: { "": "" }
    });

    const [rol, setRol] = useState(null);

    /*console.log("El estado ! " + rol);
    console.log("Contenido del filtro " + JSON.stringify(filtro));*/
    /*console.log("El sintoma mensaje");
    console.log(sintomaMensaje);*/
    /*console.log("El sintoma ID");
    console.log(sintomaId);
    console.log("El tamaño de sintoma ID");
    console.log(sintomaId.length);*/
    console.log(editarPregunta);
    /*console.log("Este es el pregunta original");
    console.log(JSON.stringify(preguntaOriginal.symptoms));*/

    const [id, setId] = useState({
        id: ''
    });

    let componenteListarPreguntas = null;

    let componenteListarSintomas = null;

    let componenteAgregarPregunta = null;

    let componenteMensajeTabla = null;

    let componenteFiltro = null;

    let componenteNombreOpcion = null;

    let componenteCabeceraModificarEliminar = null;

    console.log("El token es " + token);

    /*let componenteMensajeModal = null;*/

    /*Se verifica si es admin para mostrar los componentes necesarios de este rol*/
    if (es_admin == true) { /*Si es admin*/

        componenteNombreOpcion = <label>Administrar Preguntas</label>
        componenteAgregarPregunta = <div><label id="labelAgregarPregunta-AdministrarPreguntas">
            ¿Desea agregar una nueva pregunta?
        </label>
            <Link to='/agregarpregunta' >
                {/* <button id="agregarPregunta-AdministrarPreguntas" type="button" className="btn btn-success" title="Agregar un nuevo usuario" data-bs-toggle="modal" data-bs-target="#modalAgregarAdministrarUsuarios-AdministrarUsuarios"> */}
                <button id="agregarPregunta-AdministrarPreguntas" type="button" className="btn btn-success" title="Agregar nueva pregunta">
                    <i class="fas fa-plus-circle"></i>
                    Agregar Pregunta
                </button>
            </Link>
        </div>

        componenteCabeceraModificarEliminar = <th id="modificarEliminarTablaCabecera-AdministrarPreguntas" scope="col" title="Modificar/Eliminar preguntas">Modificar/Eliminar</th>

    } else { /*Si no lo es*/

        componenteNombreOpcion = <label>Preguntas</label>
    }

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.target.name)
        console.log(event.target.value)
        setEditarPregunta({
            ...editarPregunta,
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

    const handleInputChangeFiltrar = (event) => { //Para guardar los datos ingresados en el filtrar
        /*console.log(event.target.name)
        console.log(event.target.value)*/
        setFiltro({
            ...filtro,
            [event.target.name]: event.target.value
        })

    }

    const handleDropdownChangeFiltrar = (event) => { //Para guardar la categoria seleccionada en el filtrar
        /*console.log(event.target.name)
        console.log(event.target.value)
        console.log("Este es el valor de la seleccion " + event.currentTarget.value);*/

        const categoria = event.currentTarget.value;
        setFiltro({
            ...filtro,
            categoria
        })

    }

    async function consultarPreguntas() {
        setRespuestaServidor("");
        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all", {
            method: "GET",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        })


        const respuesta = await data.json();
        //console.log(respuesta);

        if (respuesta.code == 401) {
            setRespuestaServidor(401);
        } else if(respuesta.status == 200) {
            setPreguntas(respuesta.result.items);
        } else {

        }
    }

    async function enviarModificarPregunta(arrayDatos){
        /*let datos = {
            pregunta: editarPregunta.pregunta
        };*/

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" +editarPregunta.id+ "/update-one";

        const data = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(arrayDatos)
        })

        const respuesta = await data.json();
        console.log(respuesta);

        if (respuesta.status === undefined) { //Si el correo ya existe -> Error 404
            //console.log("Es indefinido");
            setRespuestaServidor(respuesta.code);
            //console.log(respuesta.code);
        } else { //Si es diferente
            setRespuestaServidor(respuesta.status);
        }

        setRol(null);
    }

    const modificarPreguntas = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");
        console.log("Entre al modificarPregunta");
        let sintomasNuevosOrganizados = JSON.stringify(sintomaId.sort());
        let sintomasOriginalesOrganizados = JSON.stringify((preguntaOriginal.sintomas).sort());

        if(editarPregunta.pregunta == "" || sintomaId.length == 0){ //Si alguno de los campos esta vacio
            setRespuestaServidor(408);
        }else if((editarPregunta.pregunta == preguntaOriginal.pregunta) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados) ){ //Si la pregunta y sintomas no se modificaron
            
            console.log("No hubo cambios");
            setRespuestaServidor(207);

        }else if((editarPregunta.pregunta == preguntaOriginal.pregunta) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)){ //Si la pregunta es igual y los sintomas cambian
            
            //console.log(preguntaOriginal.sintomas);
            /*console.log(sintomaId);
            console.log(preguntaOriginal.sintomas);*/
            /*const contieneSintoma = [];
            const sintomasNuevos = [];*/
            console.log("Pregunta igual y sintomas diferentes");
            console.log("Este es el ID de la pregunta "+editarPregunta.id);
            console.log("Antes !!");
            let sintomasOriginales = preguntaOriginal.sintomas;//let sintomasOriginales = preguntaOriginal.sintomas;
            //const sintomasNuevos = sintomaId;
            const sintomasNuevos = [];
            console.log("Sintomas originales "+sintomasOriginales);
            //console.log("Sintomas organizados "+sintomasOriginales.sort());
            console.log("Sintomas nuevos "+sintomaId);

            sintomaId.map(elemento => (

                (preguntaOriginal.sintomas.includes(elemento)) ? (sintomasOriginales = sintomasOriginales.filter(id => id !== elemento)) : sintomasNuevos.push(elemento)//(sintomasOriginales = sintomasOriginales.filter(id => id !== elemento) && sintomasNuevos.push(elemento))
                ));

            console.log("Despues !!");
            console.log("Sintomas a borrar "+sintomasOriginales);
            console.log("Sintomas nuevos "+sintomasNuevos);
            if(sintomasOriginales.length == 0){ //Si solo hay que insertar sintomas
                console.log("solo hay que insertar sintomas");
                const arrayDatos = {'sintomas':sintomasNuevos}
                //console.log(arrayDatos);
                //console.log(arrayDatos);
                //const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" +editarPregunta.id+ "/update-one";
                enviarModificarPregunta(arrayDatos);

            }else if(sintomasNuevos.length == 0){ //Si solo hay que borrar sintomas
                console.log("solo hay que borrar sintomas");
                const arrayDatos = {'remover_sintomas':sintomasOriginales}
                enviarModificarPregunta(arrayDatos);

            }else if(sintomasNuevos.length != 0 && sintomasOriginales.length != 0){ //Si hay que insertar sintomas y borrar sintomas
                console.log("hay que insertar sintomas y borrar sintomas");
                //const sintomasBorrar = JSON.stringify(sintomasOriginales);
                const arrayDatos = {'sintomas':sintomasNuevos, 'remover_sintomas':sintomasOriginales}//const arrayDatos = {'sintomas':sintomasNuevos, 'remover_sintomas':sintomasOriginales}
                //console.log("Sintomas a remover "+sintomasOriginales);
                //console.log(arrayDatos);
                //console.log(arrayDatos);
                enviarModificarPregunta(arrayDatos);
            }

            //enviarModificarPregunta(editarPregunta.id, url, arrayDatos);

        }else if((editarPregunta.pregunta !== preguntaOriginal.pregunta) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)){ //Si pregunta diferente y sintomas iguales

            console.log("Pregunta diferente y sintomas iguales");
            const arrayDatos = {'pregunta':editarPregunta.pregunta}
            enviarModificarPregunta(arrayDatos);

        }else if((editarPregunta.pregunta != preguntaOriginal.pregunta) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)){ //Si Pregunta y sintomas diferentes
            
            console.log("Pregunta y sintomas diferente");
            console.log("Antes !!");
            let sintomasOriginales = preguntaOriginal.sintomas;//let sintomasOriginales = preguntaOriginal.sintomas;
            //const sintomasNuevos = sintomaId;
            const sintomasNuevos = [];
            console.log("Sintomas originales "+sintomasOriginales);
            //console.log("Sintomas organizados "+sintomasOriginales.sort());
            console.log("Sintomas nuevos "+sintomaId);

            sintomaId.map(elemento => (
                //console.log(elemento)
                //contieneSintoma = sintomaId.includes(elemento)
                //contieneSintoma ? console.log() : console.log()
                
                (preguntaOriginal.sintomas.includes(elemento)) ? (sintomasOriginales = sintomasOriginales.filter(id => id !== elemento)) : sintomasNuevos.push(elemento)//(sintomasOriginales = sintomasOriginales.filter(id => id !== elemento) && sintomasNuevos.push(elemento))
                ));

            console.log("Despues !!");
            console.log("Sintomas a borrar "+sintomasOriginales);
            console.log("Sintomas nuevos "+sintomasNuevos);
            if(sintomasOriginales.length == 0){ //Si solo hay que insertar sintomas e insertar pregunta
                console.log("solo hay que insertar sintomas e insertar pregunta");
                const arrayDatos = {'pregunta':editarPregunta.pregunta, 'sintomas':sintomasNuevos}
                //console.log(arrayDatos);
                //console.log(arrayDatos);
                //const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" +editarPregunta.id+ "/update-one";
                enviarModificarPregunta(arrayDatos);

            }else if(sintomasNuevos.length == 0){ //Si solo hay que borrar sintomas e insertar pregunta
                console.log("solo hay que borrar sintomas e insertar pregunta");
                const arrayDatos = {'pregunta':editarPregunta.pregunta, 'remover_sintomas':sintomasOriginales}
                enviarModificarPregunta(arrayDatos);

            }else if(sintomasNuevos.length != 0 && sintomasOriginales.length != 0){ //Si hay que insertar sintomas, borrar sintomas y pregunta
                console.log("hay que insertar sintomas, borrar sintomas y pregunta");
                //const sintomasBorrar = JSON.stringify(sintomasOriginales);
                const arrayDatos = {'pregunta':editarPregunta.pregunta, 'sintomas':sintomasNuevos, 'remover_sintomas':sintomasOriginales}
                enviarModificarPregunta(arrayDatos);
            }
        }

        setEditarPregunta({ 
            pregunta: "",
            symptoms: { "": "" }});

    }

    const filtrarPregunta = async (event) => {

        event.preventDefault();
        setRespuestaServidor("");
        setCodigo("");

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all?pregunta=" + filtro.inputFiltro;//+ 

        const data = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            //body: JSON.stringify(datos)
        })

        const respuesta = await data.json();
        //console.log(respuesta.status);
        console.log("Este es lo de filtrar pregunta");
        console.log(JSON.stringify(respuesta));
        /*console.log(respuesta);*/
        /*setRespuestaServidor(respuesta);
        setCodigo("filtrar");*/
        console.log("Esta es la respuesta");
        console.log();
        if (respuesta.code == 401) {
            setRespuestaServidor(401);
        } else if ((respuesta.result.items).length == 0) { /*Si no se tiene nada en el array del get*/
            console.log("Vector vacio");
            console.log(preguntas);
            setRespuestaServidor(404);
        } else {
            setPreguntas(respuesta.result.items);
            setCodigo("filtrar");
        }


    }

    const eliminarPreguntas = async (event) => {

        event.preventDefault();

        //console.log(editarUsuario.id);

        const url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" + id + "/delete-one";

        //console.log(url);

        //console.log("Este es el usuario " + editarUsuario.email + " | el id " + editarUsuario.id + " | el rol " + rol);

        const data = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            //body: JSON.stringify(datos)
        })

        const respuesta = await data;
        //console.log(respuesta.status);
        setRespuestaServidor(respuesta.status);

    }

    async function cargarSintomas() { //const cargarSintomas = async (event) => {
        
        /*event.preventDefault();*/
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
            setCodigo("listarSintomas");
        }


    }


    /*Se verfica si se hizo click en botón recargar tabla o buscar en el filtro*/
    if (codigo == "listar") {
        if (es_admin == true) { /*Si codigo == listar y rol = admin, se muestra tabla con botones de modificar y eliminar*/
            componenteListarPreguntas = preguntas.map(elemento => (
                <tr>
                    <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                    <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td> {/*elemento.symptoms*/}
                    {/*elemento.es_admin = null*/}
                    <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                        <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                            <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                        </button>

                        <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                            <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                        </button>

                    </td>
                </tr>
            ))
        } else { /*Si codigo == listar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            componenteListarPreguntas = preguntas.map(elemento => (
                <tr>
                    <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                    <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td> {/*elemento.symptoms*/}
                </tr>
            ))
        }
    } else if (codigo == "filtrar") {

        if (es_admin == true) {/*Si codigo == filtrar y rol = admin, se muestra tabla con botones de modificar y eliminar*/

            console.log("Esto es lo del filtrar");
            console.log(filtro);
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro != undefined && filtro.inputFiltro !== "") {
                console.log("Entre al filtro");
                console.log(preguntas);
                componenteListarPreguntas = preguntas.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>

                        <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                            <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                                <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { reiniciarSetearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                                <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }

        } else {/*Si codigo == filtrar y rol = usuario, se muestra tabla sin botones de modificar y eliminar*/
            console.log("Esto es lo del filtrar");
            console.log(filtro);
            if (filtro.categoria !== undefined && filtro.categoria !== "Seleccione Categoria..." && filtro.inputFiltro != undefined && filtro.inputFiltro !== "") {
                console.log("Entre al filtro");
                console.log(preguntas);
                componenteListarPreguntas = preguntas.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>
                    </tr>
                ))

            } else { //Campos vacios
                setRespuestaServidor(408);
            }
        }

    } else if(codigo == "listarSintomas"){ //Se listan los sintomas en modificar pregunta

        componenteListarSintomas = sintomas.map(elemento => (
            <tr>
                <td scope="row">{elemento.sintoma}</td>
                <td id="columnaCheckbox-AgregarPreguntas">
                    <input id="checkbox-AgregarPreguntas" class="form-check-input" type="checkbox" onChange={(e) => handleCheckboxChange(e, elemento)}></input>
                </td>
            </tr>
        ))

    }

    const listarUsuarios = async (event) => {

        event.preventDefault();
        console.log("Entre al listarUsuarios");
        setCodigo("listar");
        //console.log("Este es el valor del form "+event.currentTarget.value);

        setRespuestaServidor("");
        consultarPreguntas();


    }

    const filtrarUsuarios = async (event) => {
        event.preventDefault();
        console.log("Entre al filtrarUsuarios");
        setCodigo("filtrar");
        //console.log("Este es el valor del form "+event.currentTarget.value);

        setRespuestaServidor("");
        consultarPreguntas();
    }

    function setearDatos(elemento) {
        setEditarPregunta(elemento);
        setId(elemento.id);
        setRespuestaServidor("");
    }

    function cargarSintomasModificar() {

        try {
            /*return editarPregunta.symptoms.map(elemento => (elemento.sintoma))*/
            return sintomaMensaje.map(elemento => (elemento));

        } catch (error) {
            return "Error!"
        }
    }

    function reiniciarSetearDatos(elemento){
        
        setearDatos(elemento); //Se guardan los valores originales a modificar
        setPreguntaOriginal(elemento); //Se guardan los valores originales
        
        //Se reinician los datos guardados en el textarea
        setSintomaId([]);
        setSintomaMensaje([]);
    }

    switch (respuestaServidor) {

        case 200:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Pregunta modificada correctamente, recargue para ver cambios.</h5>

            break;

        case 201:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Pregunta creada correctamente, recargue para ver cambios.</h5>
            break;

        case 204:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Pregunta eliminada correctamente, recargue para ver cambios.</h5>
            break;

        case 207:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">No se realizaron modificaciones en la pregunta.</h5>
            break;

        case 401:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 403:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Ocurrio un error, debe iniciar sesión.</h5>
            break;

        case 404:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">No se a encontrado la pregunta, detalle más la busqueda.</h5>
            break;

        case 408:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">Por favor llene todos los campos.</h5>
            break;

        case 500:
            componenteMensajeTabla = <h5 id="mensajeRespuesta-AdministrarPreguntas">El correo/cedula ya esta registrado.</h5>
            break;

        default:
            componenteMensajeTabla = null;
            break;
    }

    return (

        <div id="fondo-AdministrarPreguntas">

            <div id="cabeceraAdministrarPreguntas-AdministrarPreguntas">

                <div id="cajaNombreOpcion-AdministrarPreguntas">

                    {/*<p>Administrar Preguntas</p>*/}
                    {componenteNombreOpcion}

                </div>

                <div id="busqueda">

                    <form id="formato" onSubmit={filtrarPregunta}>

                        <select class="form-select" onChange={handleDropdownChangeFiltrar} name="categoria" title="Seleccione categoria para buscar palabra" >

                            <option selected >Seleccione Categoria...</option> {/*disabled*/}
                            <option value="pregunta">Pregunta</option>
                            {/*<option value="sintoma">Sintoma</option>*/}

                        </select>

                        {/*<input type="text" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>*/}
                        <input id="filtrar" type="text" className="form-control" onChange={handleInputChangeFiltrar} name="inputFiltro" placeholder="¿Busca algo puntual?" title="Ingrese valor a buscar" />

                        {/*<Link to='/plataforma/buscar'></Link>*/}
                        <button id="enviarBuscar-Plataforma" type="submit" className="btn btn-success" title="Buscar" >
                            <i class="fas fa-search"></i>
                        </button>

                    </form>
                </div>

                {/*<div id="cajaLabelAdministrarUsuarioss-AdministrarUsuarios">
                    <label>Administrar Usuarios</label>
                </div>*/}


                <div id="cajaAgregarAdministrarPreguntas-AdministrarPreguntas">

                    {componenteAgregarPregunta}

                </div>

            </div>

            <form id="formato" onSubmit={listarUsuarios}> {/*listarUsuarios*/}

                <div id="cajaTabla-AdministrarPreguntas">

                    <div id="cajaCabecera-AdministrarPreguntas">

                        <div id="cajaMensajeRespuesta-AdministrarPreguntas">
                            {componenteMensajeTabla}
                        </div>
                        <div id="cajaBotonRecargar-AdministrarPreguntas">
                            <button id="botonRecargar-AdministrarPreguntas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                        </div>
                    </div>

                    <table id="tabla-AdministrarPreguntas" class="table table-bordered">
                        <thead> {/*Cabeceras*/}
                            <tr>
                                <th id="preguntaTablaCabecera-AdministrarPreguntas" scope="col" title="Preguntas del sistema">Pregunta</th>
                                <th id="sintomaTablaCabecera-AdministrarPreguntas" scope="col" title="Sintomas ligados a preguntas">Sintoma</th>
                                {/*<th id="correoTablaCabecera-AdministrarUsuarios" scope="col" title="Correo del usuario">Correo</th>
                                <th id="rolTablaCabecera-AdministrarUsuarios" scope="col" title="Tipo de cuenta de usuario">Tipo De Cuenta</th>*/}

                                {/*Columna para agregar o elimina*/}
                                {componenteCabeceraModificarEliminar}
                            </tr>
                        </thead>
                        <tbody> {/*Filas*/}
                            {/*usuario.map(elemento=>(
                            <tr>
                                <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.cedula}</th>
                                <td id="sintomaTablaFila-AdministrarPreguntas">{elemento.nombre}</td>
                                <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                                    <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                                        <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                                    </button>
                                    
                                    <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                                        <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                                    </button>

                                </td>
                            </tr>
                    ))*/}

                            {componenteListarPreguntas}

                        </tbody>
                    </table>
                </div>
            </form>
            {/*Modal para el botón de Eliminar AdministrarUsuarios*/}
            <form className="row" onSubmit={eliminarPreguntas}>
                <div class="modal fade" id="modalEliminar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelEliminar-AdministrarPreguntas">

                                    <i class="fas fa-exclamation-triangle"></i>
                                    <label >Advertencia</label>

                                </h5>
                                {/*<button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrador de usuarios"></button>*/}
                            </div>
                            <div class="modal-body">

                                <label>¿Realmente desea eliminar la pregunta "{editarPregunta.pregunta}" ?</label>
                                <label id="labelRevertirCambios-AdministrarPreguntas">Los cambios no se podrán revertir.</label>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar preguntas">Cancelar</button>
                                <button type="submit" id="botonModalEliminar-AdministrarPreguntas" class="btn btn-primary" data-bs-dismiss="modal" title="Eliminar pregunta">Eliminar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/*Modal para el botón de Modificar AdministrarUsuarios*/}
            <form className="row" onSubmit={modificarPreguntas}>
                <div class="modal fade" id="modalModificar-AdministrarPreguntas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">

                                <h5 class="modal-title" id="modalLabelModificar-AdministrarUsuarios">

                                    <i class="fas fa-cog"></i>
                                    <label >Modificar Pregunta</label>

                                </h5>
                                {/*<button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresar a administrar usuarios"></button>*/}
                            </div>
                            <div class="modal-body">


                                {/*Sección Cedula*/}
                                {/*componenteMensajeModal*/}
                                
                                <div id="labelPreguntaModificar-AdministrarPreguntas">

                                    <label>Pregunta</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-address-card"></i></div>
                                    <input id="" type="text" className="form-control" value={editarPregunta.pregunta} placeholder="Ingrese la pregunta" onChange={handleInputChangeModificar} name="pregunta" title="Pregunta a modificar" />

                                </div>

                                <br />

                                {/*Sección AdministrarUsuarios*/}

                                <div id="labelSintomaModificar-AdministrarPreguntas">

                                    <label>Seleccione el/los sintomas</label>

                                </div>

                                <div className="input-group">
                                    <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-font"></i></div> {/*editarPregunta.symptoms.map(elemento => (elemento.sintoma))*/}
                                    {/*<input id="" type="text" className="form-control" value={cargarSintomasModificar()} placeholder="Seleccione sintomas" onChange={handleInputChangeModificar} name="nombre" title="Sintomas seleccionados" readonly="readonly"/>*/}
                                    <textarea class="form-control" placeholder="Seleccione los sintomas" readonly="readonly" value={cargarSintomasModificar()} onChange={handleInputChangeModificar} title="Sintomas seleccionados"></textarea>
                                </div>

                                <br />

                                {/*Sección Descripción*/}
                                
                                <div id="cajaTablaModificar-AdministrarPreguntas">

                                    <div id="cajaBotonRecargarModificar-AdministrarPreguntas"> 
                                    {/*<form className="row" onSubmit={cargarSintomas}></form>*/}
                                        <button id="botonRecargarModificar-AdministrarPreguntas" type='button' onClick={() => cargarSintomas()} className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                                    
                                    </div>
                                    <table id="tablaSintomas-AdministrarPreguntas" class="table table-bordered">

                                        <thead> {/*Cabeceras*/}
                                            <tr>
                                                <th id="sintomaTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Sintomas">Sintoma</th>
                                                <th id="seleccionTablaCabeceraModificar-AdministrarPreguntas" scope="col" title="Selecciones">Elegir</th>
                                                
                                            </tr>
                                            {componenteListarSintomas}
                                            
                                        </thead>
                                    </table>
                                </div>

                            </div>
                            <div class="modal-footer">

                                <button type="button" id="botonModalCancelar-AdministrarPreguntas" class="btn btn-secondary" data-bs-dismiss="modal" title="Regresa a administrar usuarios">Cancelar</button>
                                <button type="submit" id="botonModalModificar-AdministrarPreguntas" class="btn btn-primary" data-bs-dismiss="modal" title="Modificar usuario">Modificar</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}
export default Preguntas;