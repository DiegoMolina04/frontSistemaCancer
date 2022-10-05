//React
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../context/UserContext.js";
import { useHistory } from "react-router-dom";
//Datos
import postBodyAutorization from '../../../capaDatos/Post/postBodyAutorization.js';
//Componentes
import MostrarMensaje from '../../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';
import ComponenteBotonesRespuesta from '../../../capaPresentacion/vista/Diagnosticar/ComponenteBotonesRespuesta.js';
import ComponenteBotonIniciarDiagnostico from '../../../capaPresentacion/vista/Diagnosticar/ComponenteBotonIniciarDiagnostico.js';
import ComponentePreguntaDiagnostico from '../../../capaPresentacion/vista/Diagnosticar/ComponentePreguntaDiagnostico.js';
import ComponenteBotonesGuardar from '../../../capaPresentacion/vista/Diagnosticar/ComponenteBotonesGuardar.js';

const useDiagnosticar = () => {

    //Contexto
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext); //Para entrar en el effect
    const { datosOriginales, setDatosOriginales } = useContext(UserContext); //Guardar las preguntas
    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Preguntas para mostrar en el textarea
    const { token, setToken } = useContext(UserContext); //Token de autenticación

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState(""); //Muestra mensaje informativo al usuario
    const [componenteBotones, setComponenteBotones] = useState(""); //Botones a mostrar
    const [componentePregunta, setComponentePregunta] = useState(""); //Muestra la pregunta y diagnóstico
    const [componenteMensajeGuardar, setComponenteMensajeGuardar] = useState(""); //Muestra mensaje si quiere guardar diagnóstico
    const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState(""); //Guarda las preguntas seleccionadas
    

    //Estado
    const [codigo, setCodigo] = useState(null); //Codigo respuesta

    const history = useHistory(); //Redireccionar
    let respuestaServidor = "";
    let url = "https://secure-brushlands-86892.herokuapp.com/v1/inference-motor/run-diagnosis";
    let datosExtraidos = "";
    let arrayDatos = "";
    let arrayPreguntas = [];

    const iniciarDiagnostico = async (e) => {

        try {

            e.preventDefault();

            arrayDatos = { //Datos iniciales para que el motor funcione
                "id_pregunta_respondida": 0,
                "respuesta": false,
                "sintomas_pregunta_a_responder": [],
                "preguntas_respondidas": [],
                "preguntas_a_responder": [],
                "pregunta_a_responder": {},
                "punto_inicial": false,
                "conteo_sintomas": []
            }

            respuestaServidor = await postBodyAutorization(arrayDatos, token, url);


            if (respuestaServidor.code !== undefined) { //
                verificarCodigo(respuestaServidor.code);

            } else if (respuestaServidor.status !== 200) { //Si es diferente
                //setCodigo(respuestaServidor.status);
                verificarCodigo(respuestaServidor.status);

            } else {
                console.log("Datos extraidos");
                //datosExtraidos = respuestaServidor.result.pregunta_a_responder.pregunta;
                //console.log(datosExtraidos);
                setDatosOriginales(respuestaServidor);
                setCambiarEstado("Pregunta recibida");

            }

        } catch (error) {
            setCodigo(504);

        }

    }

    const responderPregunta = async (e, respuestaUsuario) => {

        try {
            e.preventDefault();
            console.log("El valor del botón");
            console.log(respuestaUsuario);
            console.log("Datos desde el responder");
            console.log(datosOriginales);

            datosExtraidos = datosOriginales.result;

            arrayDatos = {
                'respuesta': respuestaUsuario, 
                'id_pregunta_respondida': datosExtraidos.pregunta_a_responder.id,
                'sintomas_pregunta_a_responder': datosExtraidos.sintomas_pregunta_a_responder,
                'preguntas_respondidas': datosExtraidos.preguntas_respondidas,
                'preguntas_a_responder': datosExtraidos.preguntas_a_responder,
                'pregunta_a_responder': datosExtraidos.pregunta_a_responder,
                'punto_inicial': datosExtraidos.punto_inicial,
                'conteo_sintomas': datosExtraidos.conteo_sintomas
            }

            console.log("Mi ARRAY a enviar");
            console.log(arrayDatos);

            respuestaServidor = await postBodyAutorization(arrayDatos, token, url);
            console.log("Mi respuesta del servidor");
            console.log(respuestaServidor);

            console.log("VALOR DEL TIPO DE DEPRESION");
            console.log(respuestaServidor.result.tipo_depresion);

            if (respuestaServidor.result.tipo_depresion === null) { //Si aún no hay diagnóstico

                if(respuestaUsuario){
                    arrayPreguntas.push(datosExtraidos.pregunta_a_responder.pregunta);
                    console.log("MI ARRAY DE PREGUNTAS");
                    console.log(arrayPreguntas);
                    setPreguntasSeleccionadas(arrayPreguntas);
                }

                setDatosOriginales(respuestaServidor);
                setCambiarEstado("Pregunta recibida");

            }else if(respuestaServidor.result.tipo_depresion !== null){ //Si ya se recibe un diagnóstico
                
                //let diagnostico = ;
                setDatosOriginales("");
                setDatosOriginales(respuestaServidor.result.tipo_depresion);
                setCambiarEstado("Diagnostico");
                //console.log("RESULTADO FINAL");
                

            }

        } catch (error) {
            setCodigo(504);

        }

    }

    const tomarDecision = (e, decision) => {
        try {
            e.preventDefault();
            
            if(decision){
                history.push("/guardardiagnostico");

            }else{
                setCambiarEstado("Reiniciar");
                
            }

        } catch (error) {
            setCodigo(504);
        }
    }

    const handleChange = () => { //Para guardar evento de los checkbox

        //arrayPreguntas.push();
        // if (checked) { //Si es seleccionado

        //     vectorID.push(elemento.id); //Se guarda el id en array local
        //     vectorMensaje.push(value); //Se guarda el mensaje en array local
        //     setSintomaId(vectorID); //Se guarda el array id en estado
        //     setSintomaMensaje(vectorMensaje); //Se guarda el array mensaje en estado
        //     setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        // } else { //Si es deseleccionado

        //     vectorID = vectorID.filter((e) => e !== elemento.id); //Se saca el id del array local
        //     vectorMensaje = vectorMensaje.filter((e) => e !== value); //Se saca el mensaje del array local
        //     setSintomaId(vectorID); //Se guarda el array id en estado 
        //     setSintomaMensaje(vectorMensaje); //Se guarda el array mensaje en estado
        //     setCambiarEstado("Lista seleccionada"); //Se guarda en contexto

        // }

    };

    function verificarCodigo(codigo) {

        switch (codigo) {

            case 200: //Se modifica correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Resultado modificado correctamente, recargue para ver cambios."} />);
                break;

            case 201: //Se crea correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Resultado guardado correctamente, recargue para ver cambios."} />);
                break;

            case 204: //Se elimina correctamente
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Resultado eliminado correctamente, recargue para ver cambios."} />);
                break;

            case 206: //Tabla vacia
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                break;

            case 400: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
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
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se a encontrado el resultado a actualizar."} />);
                break;

            case 408: //Campos vacios
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 500: //Error de almacenamiento
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
                break;

            default:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
                break;
        }
    }

    //Muestra mensajes informativos al usuario
    useEffect(() => {

        if (cambiarEstado === "Pregunta recibida") {

            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"¿La pregunta corresponde con el paciente?"} />);
            setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={datosOriginales.result.pregunta_a_responder.pregunta} />);
            setComponenteBotones(<ComponenteBotonesRespuesta />);
            setCambiarEstado("");
            setDatosGuardados(preguntasSeleccionadas);

        }else if(cambiarEstado === "Diagnostico"){
            
            setCambiarEstado("");
            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Diagnóstico"} />);
            setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={datosOriginales} />);
            setComponenteMensajeGuardar("¿Desea guardar el diagnóstico?");
            setComponenteBotones(<ComponenteBotonesGuardar />);
            
        }else if(cambiarEstado === "Reiniciar"){
            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Haga clic en el botón para iniciar diagnóstico"} />);
            setComponenteBotones(<ComponenteBotonIniciarDiagnostico />);
            setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={""} />);
            setComponenteMensajeGuardar("");
            setDatosOriginales("");
        }

    }, [cambiarEstado])

    //Se ejecuta una sola vez al ser renderizado. Muestra mensaje inicial y botón para iniciar.
    useEffect(() => {
        setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Haga clic en el botón para iniciar diagnóstico"} />);
        setComponenteBotones(<ComponenteBotonIniciarDiagnostico />);
        setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={""} />);
        setComponenteMensajeGuardar("");
        setDatosGuardados("");
    }, [])


    return { componenteMostrarMensaje, componentePregunta, componenteMensajeGuardar, componenteBotones, iniciarDiagnostico, responderPregunta, tomarDecision, handleChange };
};

export default useDiagnosticar;