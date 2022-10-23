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
import ComponenteTabla from '../../../capaPresentacion/vista/ComponentesComunes/ComponenteTabla.js';
import ComponenteAgregarDiccionario from '../../../capaPresentacion/vista/Diccionario/ComponenteAgregarDiccionario.js';
import NombreOpcion from '../../../capaPresentacion/vista/ComponentesComunes/NombreOpcion.js';
import ColumnaModificarEliminar from '../../../capaPresentacion/vista/ComponentesComunes/ColumnaModificarEliminar.js';

const useDiccionario = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    const { setDatosGuardados } = useContext(UserContext);
    const { setDatosIntroducidos } = useContext(UserContext);
    const { setDatosOriginales } = useContext(UserContext);
    const { token } = useContext(UserContext);
    const { es_admin } = useContext(UserContext);

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState(""); //Agrega el mensaje informativo
    const [componenteAgregarTermino, setComponenteBtnAgregarTermino] = useState(""); //Agrega el botoón agregar
    const [componenteListarTerminos, setComponenteListarTerminos] = useState([]); //Guardar resultados
    const [componenteNombreOpcion, setComponenteNombreOpcion] = useState(""); //Nombre opcion
    const [componenteCabeceraModificarEliminar, setComponenteCabeceraModificarEliminar] = useState(""); //Columna modificar/eliminar

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta

    const history = useHistory(); //Redireccionar
    let respuestaServidor = "";
    let url = "";
    let datosExtraidos = "";

    function cargarElementosTabla(datosExtraidos, funcion, es_admin) {
        try {
            let tabla = "";
            if ((es_admin === true && funcion === "listar") || (es_admin === true && funcion === "filtrar")) { //Se muestra tabla con botones de modificar y eliminar*/
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="terminoTablaFila-AdministrarTerminos" scope="row">{elemento.termino}</th>
                        <td id="descripcionTablaFila-AdministrarTerminos">{elemento.descripcion}</td> {/*Se cargan los items listandolos*/}
                        <td id="modificarEliminarTablaFila-AdministrarTerminos">

                            <button id="botonModificar-AdministrarTerminos" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarTerminos">
                                <i id="iconoModificar-AdministrarTerminos" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarTerminos" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarTerminos">
                                <i id="iconoEliminar-AdministrarTerminos" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))
            } else if ((es_admin === false && funcion === "listar") || (es_admin === false && funcion === "filtrar")) { //Se muestra tabla sin botones de modificar y eliminar
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="terminoTablaFila-AdministrarTerminos" scope="row">{elemento.termino}</th>
                        <td id="descripcionTablaFila-AdministrarTerminos">{elemento.descripcion}</td>
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

                    setComponenteListarTerminos(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);

                } else {

                    if (funcion === "listar") {
                        setCodigo(206); //No hay nada en la BD sobre lo tratado de mostrar.

                    } else if (funcion === "filtrar") {
                        setCodigo(404); //No se encuentra nada en el filtro.

                    }

                }
            }
        } catch (error) {
            setCodigo(504);
        }
    }

    const listarDiccionario = async (event, funcion, datos) => {

        try {
            event.preventDefault();

            if (funcion === "listar") {

                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all";
                respuestaServidor = await getAutorization(token, url);
                tomarDecision(respuestaServidor, funcion);


            } else if (funcion === "filtrar") {

                setCodigo("");

                if (datos.categoria === "Seleccione Categoria..." || datos.inputFiltro === "" || datos.categoria === undefined || datos.inputFiltro === undefined) {
                    setCodigo(408);

                } else {

                    switch (datos.categoria) {

                        case "termino":
                            url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all?termino=" + datos.inputFiltro;
                            respuestaServidor = await getAutorization(token, url);
                            tomarDecision(respuestaServidor, funcion);
                            break;

                        case "descripcion":
                            url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/get-all?descripcion=" + datos.inputFiltro;
                            respuestaServidor = await getAutorization(token, url);
                            tomarDecision(respuestaServidor, funcion);
                            break;

                        default:

                        break;

                    }
                }

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

    }

    const modificarTermino = async (event, datosModificados, datosOriginales) => {

        try {
            event.preventDefault();
            setDatosGuardados("");

            //Se valida que no existan campos vacios.
            if (datosModificados.termino === "" || datosModificados.descripcion === "") {
                setCodigo(408);
            } else {

                /*Se valida que campo se modifico, si no se modifico alguno,
                se setean los datos originales*/
                let varTermino = datosModificados.termino;
                let varDescripcion = datosModificados.descripcion;

                if (varTermino === undefined) {
                    varTermino = datosOriginales.termino;
                }

                if (varDescripcion === undefined) {
                    varDescripcion = datosOriginales.descripcion;
                }

                //Se crea el array con los datos
                let arrayDatos = {
                    termino: varTermino,
                    descripcion: varDescripcion,

                };

                let url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/" + datosOriginales.id + "/update-one";
                respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                if (respuestaServidor.status === 404) { //Correo a modificar no encontrado
                    setCodigo(406);

                } else { //Si es diferente
                    setCodigo(respuestaServidor.status);

                }
            }
        } catch (error) {
            setCodigo(504);
        }

    }

    const eliminarTermino = async (event, datosOriginales) => {

        try {
            event.preventDefault();

            let url = "https://secure-brushlands-86892.herokuapp.com/v1/dictionary/" + datosOriginales.id + "/delete-one";
            respuestaServidor = await deleteAutorization(token, url);

            if (respuestaServidor.status === undefined) {
                setCodigo(respuestaServidor.code);
            } else {
                setCodigo(respuestaServidor.status);
            }

        } catch (error) {
            setCodigo(504);
        }

    }

    function redireccionarAgregarDiccionario() {

        history.push("/agregardiccionario");
    }

    //Muestra mensajes informativos al usuario
    useEffect(() => {

        if (cambiarEstado === "Correcto") {
            setCodigo(201);
            setCambiarEstado("");

        }

        switch (codigo) {

            case 200: //Se modifica correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Término modificado correctamente, recargue para ver cambios."} />);
                break;

            case 201: //Se crea correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Término creado correctamente, recargue para ver cambios."} />);
                break;

            case 204: //Se elimina correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Término eliminado correctamente, recargue para ver cambios."} />);
                break;

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
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
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se ha encontrado el tipo depresión a actualizar."} />);
                break;

            case 408: //Campos vacios
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 500: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El término ya está registrado."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                break;

            default:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
                break;
        }
    }, [codigo, cambiarEstado])


    //Se ejecuta una sola vez al ser renderizado. Verifica si es admin y si tiene token para mostrar botones.
    useEffect(() => {
        if (es_admin === true && token !== undefined) { //Si es admin
            setComponenteBtnAgregarTermino(<ComponenteAgregarDiccionario />);
            setComponenteNombreOpcion(<NombreOpcion opcion={"Administrar Términos"} />);
            setComponenteCabeceraModificarEliminar(<ColumnaModificarEliminar
                id={"modificarEliminarTablaCabecera-AdministrarTerminos"}
                title={"Modificar/Eliminar terminos"} />);

        } else { //Si no lo es
            setComponenteBtnAgregarTermino("");
            setComponenteNombreOpcion(<NombreOpcion opcion={"Términos"} />);
            setComponenteCabeceraModificarEliminar("");
        }
    }, [])


    return { listarDiccionario, setearDatos, componenteListarTerminos, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarTermino, modificarTermino, eliminarTermino, redireccionarAgregarDiccionario };
};

export default useDiccionario;