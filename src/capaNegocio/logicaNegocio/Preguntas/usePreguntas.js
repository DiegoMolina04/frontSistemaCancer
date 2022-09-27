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
import ComponenteTabla from '../../../capaPresentacion/vista/AdministrarUsuarios/ComponenteTabla.js';
import ComponenteAgregarUsuario from '../../../capaPresentacion/vista/AdministrarUsuarios/ComponenteAgregarUsuario.js';
//Logica negocio
import useChange from '../../../capaPresentacion/vista/Preguntas/useChange.js';

const usePreguntas = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);
    const { datosOriginales, setDatosOriginales } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { es_admin, setEs_admin } = useContext(UserContext);

    const {correo, setCorreo} = useContext(UserContext);
    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext);//
    const { guardarID, setGuardarID } = useContext(UserContext);

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState("");
    const [componenteAgregarUsuario, setComponenteBtnAgregarUsuario] = useState("");
    const [componenteListarPreguntas, setComponenteListarPreguntas] = useState([]); //Guardar resultados
    const [componenteListarSintomas, setComponenteListarSintomas] = useState([]); //Guardar para tabla modificar

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta
    //const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const [sintomaId, setSintomaId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const [userinfo, setUserInfo] = useState("");

    const { handleInputChangeModificar, handleFiltrarChange, handleCheckboxChange } = useChange();

    const history = useHistory(); //Redireccionar
    let respuestaServidor = "";
    let url = "";
    let datosExtraidos = "";

    let vectorID = [];
    let vectorMensaje = [];

    function cargarElementosTabla(datosExtraidos, funcion, es_admin) {

        try {
            let tabla = "";
            if ((es_admin == true && funcion == "listar")||(es_admin == true && funcion == "filtrar")) { //Se muestra tabla con botones de modificar y eliminar*/
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
            } else if ((es_admin == false && funcion == "listar")||(es_admin == false && funcion == "filtrar")){ //Se muestra tabla sin botones de modificar y eliminar
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <th id="preguntaTablaFila-AdministrarPreguntas" scope="row">{elemento.pregunta}</th>
                        <td id="sintomaTablaFila-AdministrarPreguntas">{<ol>{elemento.symptoms.map(sintomas => (<li>{sintomas.sintoma}</li>))}</ol>}</td>{/*Se cargan los items listandolos*/}
                    </tr>
                ))
            } else if (funcion == "sintomas"){
                tabla = datosExtraidos.map(elemento => (
                    <tr>
                        <td scope="row">{elemento.sintoma}</td>
                        <td id="columnaCheckbox-AgregarPreguntas">{/*onChange={(e)=> handleCheckboxChange(e, elemento.sintoma)}*/}{/*onClick={() => capturarCambio(elemento.sintoma)}*/}{/*value={elemento.sintoma} onChange={handleChange}*/}
                            <input id="checkbox-AgregarPreguntas" class="form-check-input" type="checkbox" value={elemento.sintoma} onChange={(e)=> handleChange(e, elemento)} name="checkBox"></input>{/*onChange={(e) => handleCheckboxChange(e, elemento.sintoma)}*/}
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

            if (respuesta.code != undefined) {
                setCodigo(respuestaServidor.code);

            } else {
                datosExtraidos = respuestaServidor.result.items;

                if (datosExtraidos.length > 0) { //Si hay algún resultado

                    if(funcion == "listar" || funcion == "filtrar"){
                        setComponenteListarPreguntas(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />);
                        
                    }else if(funcion == "sintomas"){
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

    const listarElementos = async (event, funcion, datos) => {

        try {
            event.preventDefault();

            if (funcion == "listar") {

                setCodigo(""); //Se reinicia el mensaje de la tabla
                url = "https://secure-brushlands-86892.herokuapp.com/v1/questions/get-all";
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

            }else if(funcion == "sintomas"){
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
        
        /************ */
        
        //setCambiarEstado(cargarSintomasModificar);
        /*console.log("MIESTADO DEL CAMBIAR ESTADO");
        console.log(cargarSintomasModificar);*/

    }

    function capturarCambio (elemento){
        

    }

    const handleChange = (e, elemento) => {
        /// Destructuring
        const { value, checked } = e.target;

        console.log("Mi VALOR");
        console.log(elemento.id);
        //console.log(JSON.stringify(value));
        //console.log(e.target.value);
        //const { languages } = userinfo;
          
        /*console.log(`${value} is ${checked}`);
         
        // Case 1 : The user checks the box
        if (checked) {
          setUserInfo({
            languages: [...languages, value],
            response: [...languages, value],
          });
        }
      
        // Case 2  : The user unchecks the box
        else {
          setUserInfo({
            languages: languages.filter((e) => e !== value),
            response: languages.filter((e) => e !== value),
          });
        }*/

        if(checked){
            //vectorMensaje.push(value);
            vectorID.push(elemento.id);
            vectorMensaje.push(value);
            //setDatosTablaModificar(vectorMensaje);
            //setDatosIntroducidos(vectorMensaje);
            setSintomaId(vectorID);
            setSintomaMensaje(vectorMensaje);
            setCambiarEstado("Lista seleccionada");
        }else{
            //vectorMensaje = vectorMensaje.filter((e) => e !== value);
            vectorID = vectorID.filter((e) => e !== elemento.id);
            vectorMensaje = vectorMensaje.filter((e) => e !== value);
            //setDatosTablaModificar()
            setSintomaId(vectorID);
            setSintomaMensaje(vectorMensaje);
            setCambiarEstado("Lista seleccionada");
            
        }
        
        console.log("MI vectorMensaje");
        console.log(vectorMensaje);

      };

    /*const modificarPregunta = async (event, datosModificados, datosOriginales) => {

        try {
            event.preventDefault();
            setDatosGuardados("");

            //Se valida que no existan campos vacios.
            if (datosModificados.cedula == "" || datosModificados.nombre == "" || datosModificados.correo == "" || datosModificados.es_admin == undefined) {
                setCodigo(408);
            } else {

                //Se valida que campo se modifico, si no se modifico alguno,
                //se setean los datos originales
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
                    varCorreo = datosOriginales.correo;
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

                } else { //Si es diferente
                    setCodigo(respuestaServidor.status);

                }
            }
        } catch (error) {
            setCodigo(504);
        }

    }*/

    const modificarPregunta = async (event, datosOriginales, datosModificados, sintomasSeleccionados, idGuardar) => {

        event.preventDefault();
        setCodigo("");

        console.log("DATOS ORIGINALES");
        console.log(datosOriginales);

        console.log("DATOS MODIFICADOS");
        console.log(datosModificados);
        console.log(idGuardar);
        console.log(sintomasSeleccionados);

        // let sintomasNuevosOrganizados = JSON.stringify(sintomaId.sort());
        // let sintomasOriginalesOrganizados = JSON.stringify((preguntaOriginal.sintomas).sort());

        // if (editarPregunta.pregunta == "" || sintomaId.length == 0) { //Si alguno de los campos esta vacio

        //     setCodigo(408);

        // } else if ((editarPregunta.pregunta == preguntaOriginal.pregunta) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)) { //Si la pregunta y sintomas no se modificaron

        //     setCodigo(207);

        // } else if ((editarPregunta.pregunta == preguntaOriginal.pregunta) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)) { //Si la pregunta es igual y los sintomas cambian

        //     /*console.log("Pregunta igual y sintomas diferentes");
        //     console.log("Este es el ID de la pregunta "+editarPregunta.id);
        //     console.log("Antes !!");*/
        //     let sintomasOriginales = preguntaOriginal.sintomas;
        //     const sintomasNuevos = [];
        //     //console.log("Sintomas originales "+sintomasOriginales);
        //     //console.log("Sintomas organizados "+sintomasOriginales.sort());
        //     //console.log("Sintomas nuevos "+sintomaId);

        //     sintomaId.map(elemento => (

        //         (preguntaOriginal.sintomas.includes(elemento)) ? (sintomasOriginales = sintomasOriginales.filter(id => id !== elemento)) : sintomasNuevos.push(elemento)//(sintomasOriginales = sintomasOriginales.filter(id => id !== elemento) && sintomasNuevos.push(elemento))
        //     ));

        //     /*console.log("Despues !!");
        //     console.log("Sintomas a borrar "+sintomasOriginales);
        //     console.log("Sintomas nuevos "+sintomasNuevos);*/
        //     if (sintomasOriginales.length == 0) { //Si solo hay que insertar sintomas
        //         //console.log("solo hay que insertar sintomas");
        //         const arrayDatos = { 'sintomas': sintomasNuevos }

        //         enviarModificarPregunta(arrayDatos);

        //     } else if (sintomasNuevos.length == 0) { //Si solo hay que borrar sintomas
        //         //console.log("solo hay que borrar sintomas");
        //         const arrayDatos = { 'remover_sintomas': sintomasOriginales }
        //         enviarModificarPregunta(arrayDatos);

        //     } else if (sintomasNuevos.length != 0 && sintomasOriginales.length != 0) { //Si hay que insertar sintomas y borrar sintomas
        //         //console.log("hay que insertar sintomas y borrar sintomas");

        //         const arrayDatos = { 'sintomas': sintomasNuevos, 'remover_sintomas': sintomasOriginales }//const arrayDatos = {'sintomas':sintomasNuevos, 'remover_sintomas':sintomasOriginales}

        //         enviarModificarPregunta(arrayDatos);
        //     }

        // } else if ((editarPregunta.pregunta !== preguntaOriginal.pregunta) && (sintomasNuevosOrganizados == sintomasOriginalesOrganizados)) { //Si pregunta diferente y sintomas iguales

        //     //console.log("Pregunta diferente y sintomas iguales");
        //     const arrayDatos = { 'pregunta': editarPregunta.pregunta }
        //     enviarModificarPregunta(arrayDatos);

        // } else if ((editarPregunta.pregunta != preguntaOriginal.pregunta) && (sintomasNuevosOrganizados != sintomasOriginalesOrganizados)) { //Si Pregunta y sintomas diferentes

        //     /*console.log("Pregunta y sintomas diferente");
        //     console.log("Antes !!");*/
        //     let sintomasOriginales = preguntaOriginal.sintomas;
        //     const sintomasNuevos = [];
        //     /*console.log("Sintomas originales "+sintomasOriginales);
        //     console.log("Sintomas nuevos "+sintomaId);*/

        //     sintomaId.map(elemento => (

        //         (preguntaOriginal.sintomas.includes(elemento)) ? (sintomasOriginales = sintomasOriginales.filter(id => id !== elemento)) : sintomasNuevos.push(elemento)//(sintomasOriginales = sintomasOriginales.filter(id => id !== elemento) && sintomasNuevos.push(elemento))
        //     ));

        //     /*console.log("Despues !!");
        //     console.log("Sintomas a borrar "+sintomasOriginales);
        //     console.log("Sintomas nuevos "+sintomasNuevos);*/
        //     if (sintomasOriginales.length == 0) { //Si solo hay que insertar sintomas e insertar pregunta

        //         //console.log("solo hay que insertar sintomas e insertar pregunta");
        //         const arrayDatos = { 'pregunta': editarPregunta.pregunta, 'sintomas': sintomasNuevos }
        //         enviarModificarPregunta(arrayDatos);

        //     } else if (sintomasNuevos.length == 0) { //Si solo hay que borrar sintomas e insertar pregunta

        //         //console.log("solo hay que borrar sintomas e insertar pregunta");
        //         const arrayDatos = { 'pregunta': editarPregunta.pregunta, 'remover_sintomas': sintomasOriginales }
        //         enviarModificarPregunta(arrayDatos);

        //     } else if (sintomasNuevos.length != 0 && sintomasOriginales.length != 0) { //Si hay que insertar sintomas, borrar sintomas y pregunta

        //         //console.log("hay que insertar sintomas, borrar sintomas y pregunta");
        //         const arrayDatos = { 'pregunta': editarPregunta.pregunta, 'sintomas': sintomasNuevos, 'remover_sintomas': sintomasOriginales }
        //         enviarModificarPregunta(arrayDatos);
        //     }
        // }

        /*setEditarPregunta({ //Se reinician los valores al hacer click en modificar sintoma
            pregunta: "",
            symptoms: { "": "" }
        });*/

    }

    function cargarSintomasModificar() {//Se devuelven los sintomas a los que se les hace click y se muestran en textarea

        try {
            console.log("ENTRE AL CARGAR SINTOMAS");
            return vectorMensaje.map(elemento => (elemento));

        } catch (error) {
            return "Error!"
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

    function reiniciarModal(){
        setComponenteListarSintomas();
        //<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos, funcion, es_admin)} />
    }

    //Muestra mensajes informativos al usuario
    useEffect(() => {

        if (cambiarEstado == "Correcto") {
            setCodigo(201);
            setCambiarEstado("");

        }else if(cambiarEstado == "Lista seleccionada"){
            console.log("Si entre a listar")
            //setUserInfo(<MostrarMensaje mensaje={vectorMensaje}/>);
            setGuardarID(sintomaId);
            setDatosTablaModificar(sintomaMensaje);
            //setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Mi ejemplo"}/>);
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

            case 207:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se realizaron modificaciones en la pregunta."} />);
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

    /*useEffect(() => {
        //console.log("Este es mi sintoma mensaje");
        //console.log(userinfo);
        console.log("SI ENTREEEEEEEE")
        setDatosTablaModificar(vectorMensaje);
    }, [datosIntroducidos])*/


    return { listarElementos, setearDatos, componenteListarPreguntas, componenteListarSintomas, componenteMostrarMensaje, componenteAgregarUsuario, modificarPregunta, cargarSintomasModificar, eliminarUsuario, redireccionarAgregarUsuario, handleChange, userinfo, reiniciarModal };//verificarDatos, mostrarMensaje, estadoInicial
};

export default usePreguntas;
