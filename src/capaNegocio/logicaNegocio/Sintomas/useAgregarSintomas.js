//React
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../context/UserContext.js";
import { useHistory } from "react-router-dom";
//Datos
import getAutorization from '../../../capaDatos/Get/getAutorization.js';
import postBodyAutorization from '../../../capaDatos/Post/postBodyAutorization.js';
//Componentes
import MostrarMensaje from '../../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';
import ComponenteTabla from '../../../capaPresentacion/vista/ComponentesComunes/ComponenteTabla.js';

const useAgregarSintomas = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext); //Se guardan los estados
    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Se guarda valores del input
    const { token, setToken } = useContext(UserContext); //Se guarda token
    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext); //Se guardan datos del textarea
    const { guardarID, setGuardarID } = useContext(UserContext); //Se guardan los id de los elementos seleccionados con los checkbox

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState(""); //Mensaje informativo para el usuario
    const [componenteListarTiposDepresion, setComponenteListarTiposDepresion] = useState([]); //Guardar para tabla con sintomas

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta
    const [sintomaId, setSintomaId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const history = useHistory(); //Redireccionar
    let respuestaServidor = ""; //Se guardan respuestas del servidor
    let url = ""; //Se guarda la url a consumir
    let datosExtraidos = ""; //Se guardan los items para llenar tabla

    let vectorID = []; //Se guarda los id de los elementos seleccionados en los checkbox
    let vectorMensaje = []; //Se guarda los mensajes de los elementos seleccionados en los checkbox

    function cargarElementosTabla(datosExtraidos) { //Retorna los datos y los checkbox por cada dato

        try {
            let tabla = "";

            tabla = datosExtraidos.map(elemento => ( //Se recorren todos los datos
                <tr>
                    <td scope="row">{elemento.tipo_depresion}</td>
                    <td id="columnaCheckbox-AgregarSintomas">
                        <input id="checkbox-AgregarSintomas" class="form-check-input" type="checkbox" value={elemento.tipo_depresion} onChange={(e) => handleChange(e, elemento)} name="checkBox"></input>
                    </td>
                </tr>
            ))

            return tabla;

        } catch (error) {
            setCodigo(504);

        }


    }

    const cargarTiposDepresion = async (event) => {

        try {
            event.preventDefault();
            url = "https://secure-brushlands-86892.herokuapp.com/v1/depresion-type/get-all";
            respuestaServidor = await getAutorization(token, url);

            if (respuestaServidor.code !== undefined) {
                setCodigo(respuestaServidor.code);

            } else {
                datosExtraidos = respuestaServidor.result.items;

                if (datosExtraidos.length > 0) { //Si hay algún resultado

                    setComponenteListarTiposDepresion(<ComponenteTabla tabla={cargarElementosTabla(datosExtraidos)} />);

                } else {

                    setCodigo(206); //No hay nada en la BD sobre lo tratado de mostrar.

                }
            }

        } catch (error) {
            setCodigo(504);
        }

    }

    const enviarDatos = async (event, datos, idSintoma) => {

        try {
            event.preventDefault();

            if (datos.sintoma !== "" && (idSintoma).length !== 0 && datos !== "") { //Si los campos estan completos
                const arrayDatos = { 'sintoma': datos.sintoma, 'tipos_depresion': idSintoma }
                url = "https://secure-brushlands-86892.herokuapp.com/v1/symptoms/create-one";

                respuestaServidor = await postBodyAutorization(arrayDatos, token, url);

                if (respuestaServidor.code !== undefined) {
                    setCodigo(respuestaServidor.code);

                } else {

                    if (respuestaServidor.status == 201) {
                        setCambiarEstado("Correcto");
                        redireccionar(); //Se reinician datos y se redirecciona

                    } else {
                        setCodigo(respuestaServidor.status);

                    }

                }

            } else if (datos.sintoma === "" || idSintoma.length === 0 || datos === "") { //Se verifica que no existan campos vacios
                //Codigo seteado para respuesta de campos vacios sin intervención del servidor
                //El servidor se agotó esperando el resto de la petición del navegador
                setCodigo(408);

            } else { //Si sucede algo inesperado
                setCodigo(504);
            }

        } catch (error) {
            setCodigo(504);
        }

    }

    const handleChange = (e, elemento) => { //Para guardar evento de los checkbox

        const { value, checked } = e.target;

        if (checked) { //Si es seleccionado

            vectorID.push(elemento.id); //Se guarda el id en array local
            vectorMensaje.push(value); //Se guarda el mensaje en array local
            setSintomaId(vectorID); //Se guarda el array id en estado
            setSintomaMensaje(vectorMensaje); //Se guarda el array mensaje en estado
            setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        } else { //Si es deseleccionado

            vectorID = vectorID.filter((e) => e !== elemento.id); //Se saca el id del array local
            vectorMensaje = vectorMensaje.filter((e) => e !== value); //Se saca el mensaje del array local
            setSintomaId(vectorID); //Se guarda el array id en estado 
            setSintomaMensaje(vectorMensaje); //Se guarda el array mensaje en estado
            setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        }

    };

    function reiniciarDatos() { //Regresa vacios los datos globales

        setDatosTablaModificar(""); //Se reinicia el textarea con los datos del checkbox
        setDatosGuardados(""); //Se reinicia el valor del input
        setGuardarID(""); //Se reinicia los id guardados
        setCambiarEstado("");
        history.push("/plataforma/sintomas");

    }

    function redireccionar(){

        setDatosTablaModificar(""); //Se reinicia el textarea con los datos del checkbox
        setDatosGuardados(""); //Se reinicia el valor del input
        setGuardarID(""); //Se reinicia los id guardados
        history.push("/plataforma/preguntas");

    }

    //Muestra mensajes informativos al usuario y cambia estado
    useEffect(() => {

        if (cambiarEstado == "Lista seleccionada") { //Se guardan los datos seleccionados en la tabla con checkbox

            setGuardarID(sintomaId); //Se guardan los id de los checkbox seleccionados
            setDatosTablaModificar(sintomaMensaje); //Se guarda el mensaje de los checkbox seleccionados
            setCambiarEstado(""); //Se reinicia el estado
        }

        switch (codigo) {

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                break;

            case 401: //No tiene token
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 403: //No autenicado
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 408: //Campos vacios
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 500: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El sintoma ya esta registrado."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
                break;

            default:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
                break;

        }
    }, [codigo, cambiarEstado])

    return { cargarTiposDepresion, enviarDatos, componenteListarTiposDepresion, componenteMostrarMensaje, handleChange, reiniciarDatos };
};

export default useAgregarSintomas;
