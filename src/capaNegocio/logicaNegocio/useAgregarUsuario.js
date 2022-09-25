import React, { Fragment, useState, useContext, Component, useEffect } from 'react';
import putBody from '../../capaDatos/Put/putBody.js';
import { UserContext } from "../context/UserContext.js";
import { Redirect, Switch, NavLink, useHistory } from "react-router-dom";

import postBodyAutorization from '../../capaDatos/Post/postBodyAutorization.js';

import ComponenteCorreo from '../../capaPresentacion/vista/Login/ComponenteCorreo.js';
import ComponenteCorreoFijo from '../../capaPresentacion/vista/Login/ComponenteCorreoFijo.js';
import ComponenteContraseña from '../../capaPresentacion/vista/Login/ComponenteContraseña.js';
import ComponenteBotonRegresar from '../../capaPresentacion/vista/Login/ComponenteBotonRegresar.js';
import MostrarMensaje from '../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';

const useAgregarUsuario = () => {

    const { correo, setCorreo } = useContext(UserContext);
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    const { token, setToken } = useContext(UserContext);

    const [mostrarMensaje, setMostrarMensaje] = useState("");
    const [codigo, setCodigo] = useState(null);
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState("");

    let login = true;

    //const navigate = useNavigate();
    const history = useHistory();
    let respuestaServidor = "";

    const verificarDatos = async (e, datos) => {

        try {
            e.preventDefault();

            if (datos.cedula == "" || datos.nombre == "" || datos.email == "" || datos.es_admin == null) { //Campos vacios
                //setMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                verificarCodigo(408);
            } else {
                let url = "https://secure-brushlands-86892.herokuapp.com/v1/users/create-one";
                respuestaServidor = await postBodyAutorization(datos, token, url);

                if (respuestaServidor.status == undefined) { //
                    console.log("Es indefinido");
                    verificarCodigo(respuestaServidor.code);
                    //console.log(respuesta.code);
                } else { //Si es diferente
                    verificarCodigo(respuestaServidor.status);
                }


            }

        } catch (error) {
            //history.push("/login");
            //setCambiarEstado(201);
            setMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
        }
    };


    const estadoInicial = async (e) => {

        e.preventDefault();

        setCambiarEstado("Estado inicial");
        //history.push("/login");


    }

    function verificarCodigo(codigo) {

        switch (codigo) {

            case 201: //Correcto

                //setRespuestaServidor("Usuario creado");
                //setRespuestaServidor(201);
                setCambiarEstado("Correcto");
                //return <Redirect to="/plataforma/administrarusuarios" />

                break;

            case 401: //No tiene token
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 403: //No autenicado
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Ocurrio un error, debe iniciar sesión."} />);
                break;

            case 404:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"El correo ingresado ya esta registrado."} />);
                break;

            case 408:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                break;

            case 410:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Sucedio algo inesperado, vuelva a intentar."} />);
                break;

            case 500:
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"La cedula ingresada ya esta registrada."} />);
                break;

            case 504: //Error en el try catch
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
                break;

            default: //Si no coincide con ninguno

                break;
        }
    }

    useEffect(() => {
        console.log("Hola");
        console.log("Estado con el que sale de crear contraseña");
        console.log(cambiarEstado);

        if (cambiarEstado == "Estado inicial") {
            //setMostrarMensaje(<MostrarMensaje mensaje={""} />);
            //setCambiarEstado("");
            history.push("/plataforma/administrarusuarios");

        }else if(cambiarEstado == "Correcto"){
            history.push("/plataforma/administrarusuarios");

        }
    }, [cambiarEstado])

    return { verificarDatos, componenteMostrarMensaje, estadoInicial };
};

export default useAgregarUsuario;
