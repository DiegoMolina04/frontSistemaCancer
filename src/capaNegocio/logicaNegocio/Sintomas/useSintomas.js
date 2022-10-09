//React
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../context/UserContext.js";
import { useHistory } from "react-router-dom";
//Datos
import getAutorization from '../../../capaDatos/Get/getAutorization.js';
import putBodyAutorization from '../../../capaDatos/Put/putBodyAutorization.js';
import deleteAutorization from '../../../capaDatos/Delete/deleteAutorization.js';
//Componentes
import MostrarMensaje from '../../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';
import NombreOpcion from '../../../capaPresentacion/vista/ComponentesComunes/NombreOpcion.js';
import ColumnaModificarEliminar from '../../../capaPresentacion/vista/ComponentesComunes/ColumnaModificarEliminar.js';
import ComponenteTabla from '../../../capaPresentacion/vista/ComponentesComunes/ComponenteTabla';
import ComponenteAgregarSintoma from '../../../capaPresentacion/vista/Sintomas/ComponenteAgregarSintoma.js';

const useSintomas = () => {

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
    const [componenteAgregarSintoma, setComponenteBtnAgregarSintoma] = useState(""); //Boton agregar si es admin
    const [componenteNombreOpcion, setComponenteNombreOpcion] = useState(""); //Nombre opcion
    const [componenteCabeceraModificarEliminar, setComponenteCabeceraModificarEliminar] = useState(""); //Columna modificar/eliminar
    const [componenteListarSintomas, setComponenteListarSintomas] = useState([]); //Guardar resultados
    const [componenteListarTiposDepresion, setComponenteListarTiposDepresion] = useState([]); //Guardar para tabla modificar

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta
    const [tipoDepresionId, setTipoDepresionId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [tipoDepresionMensaje, setTipoDepresionMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

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
                        <th id="sintomaTablaFila-AdministrarSintomas" scope="row">{elemento.sintoma}</th>
                        <td id="tipoDepresionTablaFila-AdministrarSintomas">{<ol>{elemento.depresion_types.map(tipoDepresion => (<li>{tipoDepresion.tipo_depresion}</li>))}</ol>}</td> {/*Se cargan los items listandolos*/}
                        <td id="modificarEliminarTablaFila-AdministrarSintomas">

                            <button id="botonModificar-AdministrarSintomas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar sintoma" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarSintomas">
                                <i id="iconoModificar-AdministrarSintomas" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarSintomas" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar sintoma" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarSintomas">
                                <i id="iconoEliminar-AdministrarSintomas" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))
            } else if ((es_admin == false && funcion == "listar") || (es_admin == false && funcion == "filtrar")) { //Se muestra tabla sin botones de modificar y eliminar
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="sintomaTablaFila-AdministrarSintomas" scope="row">{elemento.sintoma}</th>
                        <td id="tipoDepresionTablaFila-AdministrarSintomas">{<ol>{elemento.depresion_types.map(tipoDepresion => (<li>{tipoDepresion.tipo_depresion}</li>))}</ol>}</td> {/*Se cargan los items listandolos*/}
                    </tr>
                ))
            } else if (funcion == "tipos depresion") {
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <td scope="row">{elemento.tipo_depresion}</td>
                        <td id="columnaCheckbox-AgregarSintomas">
                            <input id="checkbox-AgregarSintomas" class="form-check-input" type="checkbox" value={elemento.tipo_depresion} onChange={(e) => handleChange(e, elemento)} name="checkBox"></input>
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
                        setComponenteListarSintomas(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);

                    } else if (funcion == "tipos depresion") {
                        setComponenteListarTiposDepresion(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);

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
                url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/get-all";
                respuestaServidor = await getAutorization(token, url);
                tomarDecision(respuestaServidor, funcion);


            } else if (funcion == "filtrar") {

                setCodigo("");

                if (datos.categoria === "Seleccione Categoria..." || datos.inputFiltro === "" || datos.categoria === undefined || datos.inputFiltro === undefined) {
                    setCodigo(408);

                } else {

                    switch (datos.categoria) {

                        case "sintoma":
                            url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/get-all?sintoma=" + datos.inputFiltro;
                            respuestaServidor = await getAutorization(token, url);
                            tomarDecision(respuestaServidor, funcion);

                            break;

                    }
                }

            } else if (funcion == "tipos depresion") {
                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all";
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
            setTipoDepresionId(vectorID); //Se guarda el array id en estado
            setTipoDepresionMensaje(vectorMensaje); //Se guarda el array mensaje en estado
            setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        } else {
            vectorID = vectorID.filter((e) => e !== elemento.id); //Se saca el id del array local
            vectorMensaje = vectorMensaje.filter((e) => e !== value); //Se saca el mensaje del array local
            setTipoDepresionId(vectorID); //Se guarda el array id en estado 
            setTipoDepresionMensaje(vectorMensaje); //Se guarda el array mensaje en estado
            setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        }

    };


    const modificarSintoma = async (event, sintomaOriginal, sintomaModificado, idTipoDepresion) => {

        event.preventDefault();
        setCodigo("");

        if (sintomaModificado.sintoma === "" || idTipoDepresion === "") { //Si alguno de los campos esta vacio
            setCodigo(408);

        } else {

            let tiposDepresionNuevosOrganizados = JSON.stringify(idTipoDepresion.sort());
            let tiposDepresionOriginalesOrganizados = JSON.stringify((sintomaOriginal.tipos_depresion).sort());
            let url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/" + sintomaOriginal.id + "/update-one";

            if ((sintomaModificado.sintoma == sintomaOriginal.sintoma) && (tiposDepresionNuevosOrganizados == tiposDepresionOriginalesOrganizados)) { //Si el sintoma y tipos depresion no se modificaron
                setCodigo(207);

            } else if ((sintomaModificado.sintoma == sintomaOriginal.sintoma) && (tiposDepresionNuevosOrganizados != tiposDepresionOriginalesOrganizados)) { //Si el sintoma es igual y los tipos depresion cambian

                let tiposDepresionOriginales = sintomaOriginal.tipos_depresion;
                const tiposDepresionNuevos = [];

                idTipoDepresion.map(elemento => (

                    (sintomaOriginal.tipos_depresion.includes(elemento)) ? (tiposDepresionOriginales = tiposDepresionOriginales.filter(id => id !== elemento)) : tiposDepresionNuevos.push(elemento)
                ));

                if (tiposDepresionOriginales.length == 0) { //Si solo hay que insertar tipos depresion

                    const arrayDatos = { 'tipos_depresion': tiposDepresionNuevos }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (tiposDepresionNuevos.length == 0) { //Si solo hay que borrar tipos depresion

                    const arrayDatos = { 'remover_tipos_depresion': tiposDepresionOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (tiposDepresionNuevos.length != 0 && tiposDepresionOriginales.length != 0) { //Si hay que insertar tipos depresion y borrar tipos depresion

                    const arrayDatos = { 'tipos_depresion': tiposDepresionNuevos, 'remover_tipos_depresion': tiposDepresionOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                }



            } else if ((sintomaModificado.sintoma !== sintomaOriginal.sintoma) && (tiposDepresionNuevosOrganizados == tiposDepresionOriginalesOrganizados)) { //Si sintoma diferente y tipos depresion iguales

                const arrayDatos = { 'sintoma': sintomaModificado.sintoma }
                respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

            } else if ((sintomaModificado.sintoma != sintomaOriginal.sintoma) && (tiposDepresionNuevosOrganizados != tiposDepresionOriginalesOrganizados)) { //Si sintoma y tipos depresion diferentes

                let tiposDepresionOriginales = sintomaOriginal.tipos_depresion;
                const tiposDepresionNuevos = [];

                idTipoDepresion.map(elemento => (

                    (sintomaOriginal.tipos_depresion.includes(elemento)) ? (tiposDepresionOriginales = tiposDepresionOriginales.filter(id => id !== elemento)) : tiposDepresionNuevos.push(elemento)
                ));

                if (tiposDepresionOriginales.length == 0) { //Si solo hay que insertar tipos_depresion e insertar sintoma

                    const arrayDatos = { 'sintoma': sintomaModificado.sintoma, 'tipos_depresion': tiposDepresionNuevos }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (tiposDepresionNuevos.length == 0) { //Si solo hay que borrar tipos depresion e insertar sintoma

                    const arrayDatos = { 'sintoma': sintomaModificado.sintoma, 'remover_tipos_depresion': tiposDepresionOriginales }
                    respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                } else if (tiposDepresionNuevos.length != 0 && tiposDepresionOriginales.length != 0) { //Si hay que insertar tipos depresion, borrar tipos depresion y sintoma
                    const arrayDatos = { 'sintoma': sintomaModificado.sintoma, 'tipos_depresion': tiposDepresionNuevos, 'remover_tipos_depresion': tiposDepresionOriginales }
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

    const eliminarSintoma = async (event, datosOriginales) => {

        try {
            event.preventDefault();

            let url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/" + datosOriginales.id + "/delete-one";
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

    function redireccionarAgregarSintoma() { //Redirecciona al agregar

        history.push("/agregarsintoma");
    }

    function reiniciarModal() { //Reinicia el modal.
        setDatosTablaModificar("");
        setComponenteListarTiposDepresion();
        setGuardarID("");

    }

    //Muestra mensajes informativos al usuario y cambia estado
    useEffect(() => {

        if (cambiarEstado == "Correcto") {
            setCodigo(201);
            setCambiarEstado("");

        } else if (cambiarEstado == "Lista seleccionada") {

            setGuardarID(tipoDepresionId);
            setDatosTablaModificar(tipoDepresionMensaje);
            setCambiarEstado("");
        }

        switch (codigo) {

            case 200: //Se modifica correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Síntoma modificado correctamente, recargue para ver cambios."} />);
                break;

            case 201: //Se crea correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Síntoma creado correctamente, recargue para ver cambios."} />);
                break;

            case 204: //Se elimina correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Síntoma eliminado correctamente, recargue para ver cambios."} />);
                break;

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                break;

            case 207: //No se modifica nada
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se realizaron modificaciones en la síntoma."} />);
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
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se ha encontrado el síntoma a actualizar."} />);
                break;

            case 408: //Campos vacios
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 500: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El síntoma ya está registrado."} />);
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

            setComponenteBtnAgregarSintoma(<ComponenteAgregarSintoma />);
            setComponenteNombreOpcion(<NombreOpcion opcion={"Administrar Síntomas"} />);
            setComponenteCabeceraModificarEliminar(<ColumnaModificarEliminar
                id={"modificarEliminarTablaCabecera-AdministrarSintomas"}
                title={"Modificar/Eliminar sintomas"} />);

        } else { //Si no lo es

            setComponenteBtnAgregarSintoma("");
            setComponenteNombreOpcion(<NombreOpcion opcion={"Síntomas"} />);
            setComponenteCabeceraModificarEliminar("");

        }
    }, [])

    return { listarElementos, setearDatos, componenteListarSintomas, componenteListarTiposDepresion, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarSintoma, modificarSintoma, eliminarSintoma, redireccionarAgregarSintoma, handleChange, reiniciarModal };
};

export default useSintomas;
