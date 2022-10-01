//React
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../context/UserContext.js";
import { useHistory } from "react-router-dom";
//Datos
import getAutorization from '../../../capaDatos/Get/getAutorization.js';
import putBody from '../../../capaDatos/Put/putBody.js';
import deleteAutorization from '../../../capaDatos/Delete/deleteAutorization.js';
//Componentes
import MostrarMensaje from '../../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';
import ComponenteTabla from '../../../capaPresentacion/vista/ComponentesComunes/ComponenteTabla.js';
import ComponenteAgregarUsuario from '../../../capaPresentacion/vista/AdministrarUsuarios/ComponenteAgregarUsuario.js';

const useAdministrarUsuarios = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);
    const { datosOriginales, setDatosOriginales } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { es_admin, setEs_admin } = useContext(UserContext);

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState("");
    const [componenteAgregarUsuario, setComponenteBtnAgregarUsuario] = useState("");
    const [componenteListarUsuarios, setComponenteListarUsuarios] = useState([]); //Guardar resultados

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta

    const history = useHistory(); //Redireccionar
    let respuestaServidor = "";
    let url = "";
    let datosExtraidos = "";

    function cargarElementosTabla(datosExtraidos) {
        const tabla = datosExtraidos.map(elemento => (
            <tr>
                <th id="cedulaTablaFila-AdministrarUsuarios" scope="row">{elemento.cedula}</th>
                <td id="nombreUsuarioTablaFila-AdministrarUsuarios">{elemento.nombre}</td>
                <td id="correoTablaFila-AdministrarUsuarios">{elemento.email}</td>
                <td id="rolTablaFila-AdministrarUsuarios">{elemento.es_admin === true ? "Admin" : "Usuario"}</td>

                <td id="modificarEliminarTablaFila-AdministrarUsuarios">

                    <button id="botonModificar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Modificar termino" data-bs-toggle="modal" data-bs-target="#modalModificar-AdministrarUsuarios">
                        <i id="iconoModificar-AdministrarUsuarios" class="fas fa-cog"></i>
                    </button>

                    <button id="botonEliminar-AdministrarUsuarios" type="button" class="btn btn-success" onClick={() => { setearDatos(elemento) }} title="Eliminar termino" data-bs-toggle="modal" data-bs-target="#modalEliminar-AdministrarUsuarios">
                        <i id="iconoEliminar-AdministrarUsuarios" class="fas fa-times-circle"></i>
                    </button>

                </td>
            </tr>
        ))

        return tabla;
    }

    function tomarDecision(respuesta, funcion) { //Se usa para identificar si retorna un codigo o array con items

        try {

            if (respuesta.code != undefined) {
                setCodigo(respuestaServidor.code);

            } else {
                datosExtraidos = respuestaServidor.result.items;

                if (datosExtraidos.length > 0) { //Si hay algún resultado

                    setComponenteListarUsuarios(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos)} />);

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

    const listarUsuarios = async (event, funcion, datos) => {

        try {
            event.preventDefault();

            if (funcion == "listar") {

                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/users/get-all";
                respuestaServidor = await getAutorization(token, url);
                tomarDecision(respuestaServidor, funcion);


            } else if (funcion == "filtrar") {

                setCodigo("");

                if (datos.categoria == "Seleccione Categoria..." || datos.inputFiltro == "" || datos.categoria == undefined || datos.inputFiltro == undefined) {
                    setCodigo(408);

                } else {

                    switch (datos.categoria) {

                        case "correo":
                            url = "https://secure-brushlands-86892.herokuapp.com/v1/users/get-all?email=" + datos.inputFiltro;
                            respuestaServidor = await getAutorization(token, url);
                            tomarDecision(respuestaServidor, funcion);

                            break;

                        case "cuenta":
                            let datoIngresado = datos.inputFiltro.toLowerCase();
                            if (datoIngresado == "usuario") {
                                url = "https://secure-brushlands-86892.herokuapp.com/v1/users/get-all?es_admin=false";

                            } else if (datoIngresado == "admin") {
                                url = "https://secure-brushlands-86892.herokuapp.com/v1/users/get-all?es_admin=true";

                            }

                            if (url == "") {
                                setCodigo(404);

                            } else {
                                respuestaServidor = await getAutorization(token, url);
                                tomarDecision(respuestaServidor, funcion);

                            }

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

    const modificarUsuario = async (event, datosModificados, datosOriginales) => {

        try {
            event.preventDefault();
            setDatosGuardados("");

            //Se valida que no existan campos vacios.
            if (datosModificados.cedula == "" || datosModificados.nombre == "" || datosModificados.email == "" || datosModificados.es_admin == undefined) {
                setCodigo(408);
            } else {

                /*Se valida que campo se modifico, si no se modifico alguno,
                se setean los datos originales*/
                let varCedula = datosModificados.cedula;
                let varNombre = datosModificados.nombre;
                let varCorreo = datosModificados.email;
                let varCuenta = datosModificados.es_admin;

                if (varCedula == undefined) {
                    varCedula = datosOriginales.cedula;
                }

                if (varNombre == undefined) {
                    varNombre = datosOriginales.nombre;
                }

                if (varCorreo == undefined) {
                    varCorreo = datosOriginales.email;
                }

                if (varCuenta == undefined) {
                    varCuenta = datosOriginales.es_admin;
                }

                //Se crea el array con los datos
                let arrayDatos = {
                    cedula: varCedula,
                    nombre: varNombre,
                    email: varCorreo,
                    es_admin: varCuenta
                };

                let url = "https://secure-brushlands-86892.herokuapp.com/v1/users/" + datosOriginales.email + "/update-one";
                respuestaServidor = await putBody(arrayDatos, url);

                if (respuestaServidor.status == 404) { //Correo a modificar no encontrado
                    setCodigo(406);

                } else if(respuestaServidor.status !== undefined) { //Si es diferente
                    setCodigo(respuestaServidor.status);

                } else if(respuestaServidor.code !== undefined){
                    setCodigo(respuestaServidor.code);
                }
            }
        } catch (error) {
            setCodigo(504);
        }

    }

    const eliminarUsuario = async (event, datosOriginales) => {

        try {
            event.preventDefault();

            let url = "https://secure-brushlands-86892.herokuapp.com/v1/users/" + datosOriginales.id + "/delete-one";
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

    function redireccionarAgregarUsuario() {

        history.push("/agregarusuario");
    }

    //Muestra mensajes informativos al usuario
    useEffect(() => {

        if (cambiarEstado == "Correcto") {
            setCodigo(201);
            setCambiarEstado("");

        }

        switch (codigo) {

            case 200: //Se modifica correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Usuario modificado correctamente, recargue para ver cambios."} />);
                break;

            case 201: //Se crea correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Usuario creado correctamente, recargue para ver cambios."} />);
                break;

            case 204: //Se elimina correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Usuario eliminado correctamente, recargue para ver cambios."} />);
                break;

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                break;

            case 400: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El correo/cedula ya esta registrado."} />);
                break;

            case 401: //No tiene token
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 403: //No autenicado
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 404: //No encontrado en filtro
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se a encontrado resultado, detalle más la busqueda."} />);
                break;

            case 406: //No se a encontrado correo para actualizar/eliminar
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se a encontrado el correo a actualizar."} />);
                break;

            case 408: //Campos vacios
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 500: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El correo/cedula ya esta registrado."} />);
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
        if (es_admin == true && token != undefined) {
            setComponenteBtnAgregarUsuario(<ComponenteAgregarUsuario />);
        }
    }, [])


    return { listarUsuarios, setearDatos, componenteListarUsuarios, componenteMostrarMensaje, componenteAgregarUsuario, modificarUsuario, eliminarUsuario, redireccionarAgregarUsuario };//verificarDatos, mostrarMensaje, estadoInicial
};

export default useAdministrarUsuarios;
