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

    const history = useHistory(); //Redireccionar
    let respuestaServidor = ""; //Guarda respuestas del servidor
    let url = "https://secure-brushlands-86892.herokuapp.com/v1/inference-motor/run-diagnosis"; //URL para realizar el diagnóstico
    let datosExtraidos = ""; //Extrae datos de la respuesta del servidor
    let arrayDatos = ""; //Se construye la respuesta para el servidor

    const iniciarDiagnostico = async (e) => {

        try {

            e.preventDefault();

            arrayDatos = { //Datos iniciales para que el motor inicie con el funcionamiento
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
                setDatosGuardados(respuestaServidor.code);
                setCambiarEstado("Error");

            } else if (respuestaServidor.status !== 200) { //Si es diferente
                setDatosGuardados(respuestaServidor.status);
                setCambiarEstado("Error");

            } else {
                setDatosOriginales(respuestaServidor);
                setCambiarEstado("Pregunta recibida");

            }

        } catch (error) {
            setDatosGuardados(504);
            setCambiarEstado("Error");

        }

    }

    const responderPregunta = async (e, respuestaUsuario) => {

        try {
            e.preventDefault();

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

            respuestaServidor = await postBodyAutorization(arrayDatos, token, url);

            if (respuestaServidor.result.tipo_depresion === null) { //Si aún no hay diagnóstico

                setDatosOriginales(respuestaServidor);
                setCambiarEstado("Pregunta recibida");

            } else if (respuestaServidor.result.tipo_depresion !== null) { //Si ya se recibe un diagnóstico

                setDatosOriginales("");
                setDatosOriginales(respuestaServidor.result.tipo_depresion);
                setCambiarEstado("Diagnostico");

            }

        } catch (error) {
            setDatosGuardados(504);
            setCambiarEstado("Error");

        }

    }

    const tomarDecision = (e, decision) => {
        try {
            e.preventDefault();

            if (decision) {
                history.push("/guardardiagnostico");

            } else {
                setCambiarEstado("Reiniciar");

            }

        } catch (error) {
            setDatosGuardados(504);
            setCambiarEstado("Error");
        }
    }

    //Muestra mensajes informativos al usuario
    useEffect(() => {

        if (cambiarEstado === "Pregunta recibida") {

            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"¿La pregunta corresponde con el paciente?"} />);
            setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={datosOriginales.result.pregunta_a_responder.pregunta} />);
            setComponenteBotones(<ComponenteBotonesRespuesta />);
            setCambiarEstado("");

        } else if (cambiarEstado === "Diagnostico") {

            setCambiarEstado("");
            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Diagnóstico"} />);
            setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={datosOriginales} />);
            setComponenteMensajeGuardar("¿Desea guardar el diagnóstico?");
            setComponenteBotones(<ComponenteBotonesGuardar />);

        } else if (cambiarEstado === "Reiniciar") {
            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Haga clic en el botón para iniciar diagnóstico"} />);
            setComponenteBotones(<ComponenteBotonIniciarDiagnostico />);
            setComponentePregunta(<ComponentePreguntaDiagnostico pregunta={""} />);
            setComponenteMensajeGuardar("");
            setDatosOriginales("");
            
        } else if(cambiarEstado === "Error"){

            switch (datosGuardados) {

                case 206: //Tabla vacia
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No hay datos registrados."} />);
                    break;

                case 400: //Error de almacenamiento
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                    break;

                case 401: //No tiene token
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrió un error, debe iniciar sesión."} />);
                    break;

                case 403: //No autenticado
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrió un error, debe iniciar sesión."} />);
                    break;

                case 404: //Error no encontrado
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"No se ha encontrado preguntas para diagnóstico."} />);
                    break;

                case 500: //Error de almacenamiento
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                    break;

                case 504: //Error en el try catch
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                    break;

                default:
                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={""} />);
                    break;
            }
            setCambiarEstado("");
            setDatosGuardados("");

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


    return { componenteMostrarMensaje, componentePregunta, componenteMensajeGuardar, componenteBotones, iniciarDiagnostico, responderPregunta, tomarDecision };
};

export default useDiagnosticar;