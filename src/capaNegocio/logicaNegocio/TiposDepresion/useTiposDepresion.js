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
import ComponenteAgregarTipoDepresion from '../../../capaPresentacion/vista/TiposDepresion/ComponenteAgregarTiposDepresion.js';
import NombreOpcion from '../../../capaPresentacion/vista/ComponentesComunes/NombreOpcion.js';
import ColumnaModificarEliminar from '../../../capaPresentacion/vista/ComponentesComunes/ColumnaModificarEliminar.js';

const useTiposDepresion = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);
    const { datosOriginales, setDatosOriginales } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { es_admin, setEs_admin } = useContext(UserContext);

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState(""); //Agrega el mensaje informativo
    const [componenteAgregarTipoDepresion, setComponenteBtnAgregarTipoDepresion] = useState(""); //Agrega el botoón agregar
    const [componenteListarTipoDepresion, setComponenteListarTipoDepresion] = useState([]); //Guardar resultados
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
            if ((es_admin == true && funcion == "listar") || (es_admin == true && funcion == "filtrar")) { //Se muestra tabla con botones de modificar y eliminar*/
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="tipoDepresionTablaFila-AdministrarTipoDepresion" scope="row">{elemento.tipo_depresion}</th>
                        <th id="cantidadSintomasFila-AdministrarTipoDepresion" scope="row">{elemento.cantidad_sintomas}</th>

                        <td id="modificarEliminarTablaFila-AdministrarTipoDepresion">

                            <button id="botonModificar-AdministrarTipoDepresion" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar tipo depresión" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarTipoDepresion">
                                <i id="iconoModificar-AdministrarTipoDepresion" class="fas fa-cog"></i>
                            </button>

                            <button id="botonEliminar-AdministrarTipoDepresion" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar tipo depresión" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarTipoDepresion">
                                <i id="iconoEliminar-AdministrarTipoDepresion" class="fas fa-times-circle"></i>
                            </button>

                        </td>
                    </tr>
                ))
            } else if ((es_admin == false && funcion == "listar") || (es_admin == false && funcion == "filtrar")) { //Se muestra tabla sin botones de modificar y eliminar
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="tipoDepresionTablaFila-AdministrarTipoDepresion" scope="row">{elemento.tipo_depresion}</th>
                        <th id="cantidadSintomasFila-AdministrarTipoDepresion" scope="row">{elemento.cantidad_sintomas}</th>
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

            if (respuesta.code != undefined) {
                setCodigo(respuestaServidor.code);

            } else {
                datosExtraidos = respuestaServidor.result.items;

                if (datosExtraidos.length > 0) { //Si hay algún resultado

                    setComponenteListarTipoDepresion(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);

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

    const listarTiposDepresion = async (event, funcion, datos) => {

        try {
            event.preventDefault();

            if (funcion == "listar") {

                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all";
                respuestaServidor = await getAutorization(token, url);
                tomarDecision(respuestaServidor, funcion);


            } else if (funcion == "filtrar") {

                setCodigo("");

                if (datos.categoria == "Seleccione Categoria..." || datos.inputFiltro == "" || datos.categoria == undefined || datos.inputFiltro == undefined) {
                    setCodigo(408);

                } else {

                    switch (datos.categoria) {

                        case "tipoDepresion":
                            url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all?tipo_depresion=" + datos.inputFiltro;
                            respuestaServidor = await getAutorization(token, url);
                            tomarDecision(respuestaServidor, funcion);

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

    const modificarTipoDepresion = async (event, datosModificados, datosOriginales) => {

        try {
            event.preventDefault();
            setDatosGuardados("");

            //Se valida que no existan campos vacios.
            if (datosModificados.tipo_depresion == "" || datosModificados.cantidad_sintomas == "") {
                setCodigo(408);
            } else {

                /*Se valida que campo se modifico, si no se modifico alguno,
                se setean los datos originales*/
                let varTiposDepresion = datosModificados.tipo_depresion;
                let varCantidadSintomas = datosModificados.cantidad_sintomas;

                if (varTiposDepresion == undefined) {
                    varTiposDepresion = datosOriginales.tipo_depresion;
                }

                if (varCantidadSintomas == undefined) {
                    varCantidadSintomas = datosOriginales.cantidad_sintomas;
                }

                //Se crea el array con los datos
                let arrayDatos = {
                    tipo_depresion: varTiposDepresion,
                    cantidad_sintomas: varCantidadSintomas,

                };

                let url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/" + datosOriginales.id + "/update-one";
                respuestaServidor = await putBodyAutorization(arrayDatos, token, url);

                if (respuestaServidor.status == 404) { //Correo a modificar no encontrado
                    setCodigo(406);

                } else { //Si es diferente
                    setCodigo(respuestaServidor.status);

                }
            }
        } catch (error) {
            setCodigo(504);
        }

    }

    const eliminarTipoDepresion = async (event, datosOriginales) => {

        try {
            event.preventDefault();

            let url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/" + datosOriginales.id + "/delete-one";
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

    function redireccionarAgregarTiposDepresion() {

        history.push("/agregartipodepresion");
    }

    //Muestra mensajes informativos al usuario
    useEffect(() => {

        if (cambiarEstado == "Correcto") {
            setCodigo(201);
            setCambiarEstado("");

        }

        switch (codigo) {

            case 200: //Se modifica correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Tipo depresión modificado correctamente, recargue para ver cambios."} />);
                break;

            case 201: //Se crea correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Tipo depresión creado correctamente, recargue para ver cambios."} />);
                break;

            case 204: //Se elimina correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Tipo depresión eliminado correctamente, recargue para ver cambios."} />);
                break;

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                break;

            case 401: //No tiene token
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 403: //No autenicado
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
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
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El tipo depresión ya está registrado."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
                break;

            default:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
                break;
        }
    }, [codigo, cambiarEstado])


    //Se ejecuta una sola vez al ser renderizado. Verifica si es admin y si tiene token para mostrar botones.
    useEffect(() => {
        if (es_admin == true && token != undefined) { //Si es admin
            setComponenteBtnAgregarTipoDepresion(<ComponenteAgregarTipoDepresion />);
            setComponenteNombreOpcion(<NombreOpcion opcion={"Admin. Tipos Depresión"} />);
            setComponenteCabeceraModificarEliminar(<ColumnaModificarEliminar
                id={"modificarEliminarTablaCabecera-AdministrarTipoDepresion"}
                title={"Modificar/Eliminar tipo depresión"} />);

        } else { //Si no lo es
            setComponenteBtnAgregarTipoDepresion("");
            setComponenteNombreOpcion(<NombreOpcion opcion={"Tipos Depresión"} />);
            setComponenteCabeceraModificarEliminar("");
        }
    }, [])


    return { listarTiposDepresion, setearDatos, componenteListarTipoDepresion, componenteMostrarMensaje, componenteNombreOpcion, componenteCabeceraModificarEliminar, componenteAgregarTipoDepresion, modificarTipoDepresion, eliminarTipoDepresion, redireccionarAgregarTiposDepresion };
};

export default useTiposDepresion;
