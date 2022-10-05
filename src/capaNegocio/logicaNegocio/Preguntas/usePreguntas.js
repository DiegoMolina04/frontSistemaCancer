//React
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Context
import { UserContext } from "../../context/UserContext.js";
//Datos
import getAutorization from '../../../capaDatos/Get/getAutorization.js';
import putBodyAutorization from '../../../capaDatos/Put/putBodyAutorization.js';
import deleteAutorization from '../../../capaDatos/Delete/deleteAutorization.js';
//Componentes
import MostrarMensaje from '../../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';
import NombreOpcion from '../../../capaPresentacion/vista/ComponentesComunes/NombreOpcion.js';
import ColumnaModificarEliminar from '../../../capaPresentacion/vista/ComponentesComunes/ColumnaModificarEliminar.js';
import ComponenteTabla from '../../../capaPresentacion/vista/ComponentesComunes/ComponenteTabla';
import ComponenteAgregarPregunta from '../../../capaPresentacion/vista/Preguntas/ComponenteAgregarPregunta.js';

const usePreguntas = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext); //Cambia estado
    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Datos para mostrar en modal
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext); //Datos que se van modificando en el handleChange.
    const { datosOriginales, setDatosOriginales } = useContext(UserContext); //Datos originales para comparar.
    const { token, setToken } = useContext(UserContext); //Token para saber si esta logeado
    const { es_admin, setEs_admin } = useContext(UserContext); //Para saber roles tienen

    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext); //Elementos del textarea
    const { guardarID, setGuardarID } = useContext(UserContext); //Se guarda el id del elemento seleccionado en el checkbox

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState(""); //Mensajes informativos
    const [componenteAgregarPregunta, setComponenteBtnAgregarPregunta] = useState(""); //Boton agregar si es admin
    const [componenteNombreOpcion, setComponenteNombreOpcion] = useState(""); //Nombre opcion
    const [componenteCabeceraModificarEliminar, setComponenteCabeceraModificarEliminar] = useState(""); //Columna modificar/eliminar
    const [componenteListarPreguntas, setComponenteListarPreguntas] = useState([]); //Guardar resultados
    const [componenteListarSintomas, setComponenteListarSintomas] = useState([]); //Guardar para tabla modificar

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta
    const [sintomaId, setSintomaId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const history = useHistory(); //Redireccionar
    let respuestaServidor = ""; //Guardar respuesta del servidor
    let url = ""; //Guardar url a consumir
    let datosExtraidos = ""; //Guarda los items a listar

    let vectorID = []; //Guarda los id de los elementos seleccionados con el checkbox
    let vectorMensaje = []; //Guarda los mensajes de los elementos seleccionados con el checkbox

    function cargarElementosTabla(datosExtraidos, funcion, es_admin) {

        try {
            let tabla = "";
            if ((es_admin == true && funcion == "listar") || (es_admin == true && funcion == "filtrar")) { //Se muestra tabla con botones de modificar y eliminar*/
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td> {/*Se cargan los items listandolos*/}
                        <td id="modificarEliminarTablaFila-AdministrarPreguntas">

                            <button id="botonModificar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarPreguntas">
                                <i id="iconoModificar-AdministrarPreguntas" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarPreguntas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarPreguntas">
                                <i id="iconoEliminar-AdministrarPreguntas" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))
            } else if ((es_admin == false && funcion == "listar") || (es_admin == false && funcion == "filtrar")) { //Se muestra tabla sin botones de modificar y eliminar
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>{/*Se cargan los items listandolos*/}
                    </tr>
                ))
            } else if (funcion == "sintomas") {
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <td scope="row">{elemento.sintoma}</td>
                        <td id="columnaCheckbox-AgregarPreguntas">
                            <input id="checkbox-AgregarPreguntas" class="form-check-input" type="checkbox" value={elemento.sintoma} onChange={(e) => handleChange(e, elemento)} name="checkBox"></input>
                        </td>
                    </tr>
                ))
            }

            return tabla;

        } catch (error) {
            setCodigo(504);

        }


    }

    function tomarDecision(respuesta, funcion) { //Se usa para identificar si retorna un codigo o array con items

        try {

            if (respuesta.code !== undefined) {
                setCodigo(respuestaServidor.code);

            } else {
                datosExtraidos = respuestaServidor.result.items;

                if (datosExtraidos.length > 0) { //Si hay algún resultado

                    if (funcion == "listar" || funcion == "filtrar") {
                        setComponenteListarPreguntas(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);

                    } else if (funcion == "sintomas") {
                        setComponenteListarSintomas(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);

                    }

                } else {

                    if (funcion == "listar") {
                        setCodigo(206); //No hay nada en la BD sobre lo tratado de mostrar.

                    } else if (funcion == "filtrar") {
                        setCodigo(404); //No se encuentra nada en el filtro.

                    }

                }
            }
        } catch (error) {
            setCodigo(504);
        }
    }

    const listarElementos = async (event, funcion, datos) => { //Carga las tablas

        try {

            event.preventDefault();

            if (funcion == "listar") {

                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all";
                respuestaServidor = await getAutorization(token, url);
                tomarDecision(respuestaServidor, funcion);


            } else if (funcion == "filtrar") {

                setCodigo("");

                if (datos.categoria === "Seleccione Categoria..." || datos.inputFiltro === "" || datos.categoria === undefined || datos.inputFiltro === undefined) {
                    setCodigo(408);

                } else {

                    switch (datos.categoria) {

                        case "pregunta":
                            url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all?pregunta=" + datos.inputFiltro;
                            respuestaServidor = await getAutorization(token, url);
                            tomarDecision(respuestaServidor, funcion);

                            break;

                    }
                }

            } else if (funcion == "sintomas") {
                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/get-all";
                respuestaServidor = await getAutorization(token, url);
                tomarDecision(respuestaServidor, funcion);
            }

            respuestaServidor = "";
            url = "";
            datosExtraidos = "";

        } catch (error) {
            setCodigo(504);
        }
    }

    function setearDatos(elemento) { //Se usa para poder setear los valores en los modales

        setDatosGuardados(elemento); //Datos que se modificaran y mostraran en los modales.

        setDatosOriginales(elemento); //Datos originales para comparar.

        setDatosIntroducidos(""); //Datos que se van modificando en el handleChange.

        setDatosTablaModificar(""); //Elementos del textarea

    }


    const handleChange = (e, elemento) => { //Guarda el estado de los checkbox

        const { value, checked } = e.target;

        if (checked) {
            vectorID.push(elemento.id); //Se guarda el id en array local
            vectorMensaje.push(value); //Se guarda el mensaje en array local
            setSintomaId(vectorID); //Se guarda el array id en estado
            setSintomaMensaje(vectorMensaje); //Se guarda el array mensaje en estado
            setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        } else {
            vectorID = vectorID.filter((e) => e !== elemento.id); //Se saca el id del array local
            vectorMensaje = vectorMensaje.filter((e) => e !== value); //Se saca el mensaje del array local
            setSintomaId(vectorID); //Se guarda el array id en estado 
            setSintomaMensaje(vectorMensaje); //Se guarda el array mensaje en estado
            setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        }

    };


    const modificarPregunta = async (event, preguntaOriginal, preguntaModificada, idSintoma) => {

        event.preventDefault();
        setCodigo("");

        if (preguntaModificada.pregunta === "" || idSintoma === "") { //Si alguno de los campos esta vacio
            setCodigo(408);

        } else {

            let sintomasNuevosOrganizados = JSON.stringify(idSintoma.sort());
            let sintomasOriginalesOrganizados = JSON.stringify((preguntaOriginal.sintomas).sort());
            let url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" + preguntaOriginal.id + "/update-one";

            if ((preguntaModificada.pregunta == preguntaOriginal.pregunta) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)) { //Si la pregunta y sintomas no se modificaron
                setCodigo(207);

            } else if ((preguntaModificada.pregunta == preguntaOriginal.pregunta) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)) { //Si la pregunta es igual y los sintomas cambian

                let sintomasOriginales = preguntaOriginal.sintomas;
                const sintomasNuevos = [];

                idSintoma.map(elemento => (

                    (preguntaOriginal.sintomas.includes(elemento)) ? (sintomasOriginales = sintomasOriginales.filter(id => id !== elemento)) : sintomasNuevos.push(elemento)
                ));

                if (sintomasOriginales.length == 0) { //Si solo hay que insertar sintomas

                    const arrayDatos = { 'sintomas': sintomasNuevos }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (sintomasNuevos.length == 0) { //Si solo hay que borrar sintomas

                    const arrayDatos = { 'remover_sintomas': sintomasOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (sintomasNuevos.length != 0 && sintomasOriginales.length != 0) { //Si hay que insertar sintomas y borrar sintomas

                    const arrayDatos = { 'sintomas': sintomasNuevos, 'remover_sintomas': sintomasOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                }



            } else if ((preguntaModificada.pregunta !== preguntaOriginal.pregunta) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)) { //Si pregunta diferente y sintomas iguales

                const arrayDatos = { 'pregunta': preguntaModificada.pregunta }
                respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

            } else if ((preguntaModificada.pregunta != preguntaOriginal.pregunta) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)) { //Si Pregunta y sintomas diferentes

                let sintomasOriginales = preguntaOriginal.sintomas;
                const sintomasNuevos = [];

                idSintoma.map(elemento => (

                    (preguntaOriginal.sintomas.includes(elemento)) ? (sintomasOriginales = sintomasOriginales.filter(id => id !== elemento)) : sintomasNuevos.push(elemento)
                ));

                if (sintomasOriginales.length == 0) { //Si solo hay que insertar sintomas e insertar pregunta

                    const arrayDatos = { 'pregunta': preguntaModificada.pregunta, 'sintomas': sintomasNuevos }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (sintomasNuevos.length == 0) { //Si solo hay que borrar sintomas e insertar pregunta

                    const arrayDatos = { 'pregunta': preguntaModificada.pregunta, 'remover_sintomas': sintomasOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (sintomasNuevos.length != 0 && sintomasOriginales.length != 0) { //Si hay que insertar sintomas, borrar sintomas y pregunta

                    const arrayDatos = { 'pregunta': preguntaModificada.pregunta, 'sintomas': sintomasNuevos, 'remover_sintomas': sintomasOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);
                }
            }

            if (respuestaServidor.status === undefined) {

                setCodigo(respuestaServidor.code);

            } else { //Si es diferente
                setCodigo(respuestaServidor.status);

            }

        }

        reiniciarModal(); //Regresa valores iniciales a el modal seleccionado.

    }

    const eliminarPregunta = async (event, datosOriginales) => {

        try {
            event.preventDefault();

            let url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/" + datosOriginales.id + "/delete-one";
            respuestaServidor = await deleteAutorization(token, url);

            if (respuestaServidor.status == undefined) {
                setCodigo(respuestaServidor.code);
            } else {
                setCodigo(respuestaServidor.status);
            }

        } catch (error) {
            setCodigo(504);
        }

    }

    function redireccionarAgregarPregunta() { //Redirecciona al agregar

        history.push("/agregarpregunta");
    }

    function reiniciarModal() { //Reinicia el modal.
        setComponenteListarSintomas();
        setGuardarID("");

    }

    //Muestra mensajes informativos al usuario y cambia estado
    useEffect(() => {

        if (cambiarEstado == "Correcto") {
            setCodigo(201);
            setCambiarEstado("");

        } else if (cambiarEstado == "Lista seleccionada") {

            setGuardarID(sintomaId);
            setDatosTablaModificar(sintomaMensaje);
            setCambiarEstado("");
        }

        switch (codigo) {

            case 200: //Se modifica correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Pregunta modificada correctamente, recargue para ver cambios."} />);
                break;

            case 201: //Se crea correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Pregunta creada correctamente, recargue para ver cambios."} />);
                break;

            case 204: //Se elimina correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Pregunta eliminada correctamente, recargue para ver cambios."} />);
                break;

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                break;

            case 207: //No se modifica nada
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se realizaron modificaciones en la pregunta."} />);
                break;

            case 401: //No tiene token
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrió un error, debe iniciar sesión."} />);
                break;

            case 403: //No autenicado
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrió un error, debe iniciar sesión."} />);
                break;

            case 404: //No encontrado en filtro
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se ha encontrado resultado, detalle más la búsqueda."} />);
                break;

            case 406: //No se a encontrado correo para actualizar/eliminar
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se ha encontrado la pregunta a actualizar."} />);
                break;

            case 408: //Campos vacios
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 500: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"La pregunta ya está registrada."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                break;

            default:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
                break;
        }
    }, [codigo, cambiarEstado])


    //Se ejecuta una sola vez al ser renderizado. Verifica que rol se tiene para mostrar diferentes componentes.
    useEffect(() => {
        if (es_admin == true && token != undefined) { //Si es admin

            setComponenteBtnAgregarPregunta(<ComponenteAgregarPregunta />);
            setComponenteNombreOpcion(<NombreOpcion opcion={"Administrar Preguntas"} />);
            setComponenteCabeceraModificarEliminar(<ColumnaModificarEliminar
                id={"modificarEliminarTablaCabecera-AdministrarPreguntas"}
                title={"Modificar/Eliminar preguntas"} />);

        } else { //Si no lo es

            setComponenteBtnAgregarPregunta("");
            setComponenteNombreOpcion(<NombreOpcion opcion={"Preguntas"} />);
            setComponenteCabeceraModificarEliminar("");

        }
    }, [])

    return { listarElementos, setearDatos, componenteListarPreguntas, componenteListarSintomas, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarPregunta, modificarPregunta, eliminarPregunta, redireccionarAgregarPregunta, handleChange, reiniciarModal };
};

export default usePreguntas;
