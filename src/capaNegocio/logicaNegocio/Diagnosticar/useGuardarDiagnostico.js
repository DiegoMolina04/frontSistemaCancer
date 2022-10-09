//React
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Context
import { UserContext } from "../../context/UserContext.js";
//Datos
import postBodyAutorization from '../../../capaDatos/Post/postBodyAutorization.js';
//Componente
import MostrarMensaje from '../../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';

const useGuardarDiagnostico = () => {

    //Context
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);
    const { datosOriginales, setDatosOriginales } = useContext(UserContext);

    //Componente
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState("");
    const [componenteDiagnostico, setComponenteDiagnostico] = useState("");

    const history = useHistory(); //Redirecciona
    let respuestaServidor = "";

    const verificarDatos = async (e, datos) => {

        try {
            e.preventDefault();
            if (datos.cedula == "" || datos.nombre == "" || datos.observaciones == "") { //Campos vacios
                verificarCodigo(408);

            } else {

                let arrayDatos = { 'cedula': datos.cedula, 'nombre': datos.nombre, 'resultado': datosOriginales, 'observaciones': datos.observaciones };
                let url = "https://secure-brushlands-86892.herokuapp.com/v1/diagnosis/create-one";
                respuestaServidor = await postBodyAutorization(arrayDatos, token, url);

                if (respuestaServidor.status == undefined) { //
                    verificarCodigo(respuestaServidor.code);

                } else { //Si es diferente
                    verificarCodigo(respuestaServidor.status);
                }

            }

        } catch (error) {
            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);

        }
    };


    const estadoInicial = async (e) => {

        e.preventDefault();
        setCambiarEstado("Estado inicial");

    }

    function verificarCodigo(codigo) {

        switch (codigo) {

            case 201: //Correcto
                setCambiarEstado("Correcto");
                break;

            case 401: //No tiene token
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrió un error, debe iniciar sesión."} />);
                break;

            case 403: //No autenicado
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrió un error, debe iniciar sesión."} />);
                break;

            case 404:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                break;

            case 408:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 410:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Sucedió algo inesperado, vuelva a intentar."} />);
                break;

            case 500:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error ha sucedido, regrese e intente de nuevo."} />);
                break;

            default: //Si no coincide con ninguno

                break;
        }
    }

    useEffect(() => {
        if (cambiarEstado === "Estado inicial") {
            setCambiarEstado("");
            setDatosOriginales("");
            history.push("/plataforma/diagnosticar");

        } else if (cambiarEstado === "Correcto") {
            history.push("/plataforma/resultadodiagnostico");

        }
    }, [cambiarEstado])

    useEffect(() => {
        setComponenteDiagnostico(datosOriginales);
    }, [])

    return { verificarDatos, componenteMostrarMensaje, componenteDiagnostico, estadoInicial };
};

export default useGuardarDiagnostico;