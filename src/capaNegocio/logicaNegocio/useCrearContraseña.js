import React, { Fragment, useState, useContext, Component, useEffect } from 'react';
//import datosBody from '../../capaDatos/Post/datosBody.js';
import datosBody from '../../capaDatos/Put/datosBody.js';
import { UserContext } from "../context/UserContext.js";
import { Redirect, Switch, NavLink, useHistory } from "react-router-dom";
//import { useNavigate } from "@reach/router"

import ComponenteCorreo from '../../capaPresentacion/vista/Login/ComponenteCorreo.js';
import ComponenteCorreoFijo from '../../capaPresentacion/vista/Login/ComponenteCorreoFijo.js';
import ComponenteContraseña from '../../capaPresentacion/vista/Login/ComponenteContraseña.js';
import ComponenteBotonRegresar from '../../capaPresentacion/vista/Login/ComponenteBotonRegresar.js';
import MostrarMensaje from '../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';

const useCrearContraseña = () => {

    const { correo, setCorreo } = useContext(UserContext);
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);

    const [mostrarMensaje, setMostrarMensaje] = useState("");

    let login = true;

    //const navigate = useNavigate();
    const history = useHistory();
    let respuestaServidor = "";

    const verificarDatos = async (e, datos) => {

        e.preventDefault();

        try {
            if (datos.contraseña == datos.Recontraseña && datos.contraseña != "" && datos.Recontraseña != "") {

                console.log("Datos desde crear contraseña");
                console.log(datos);
                let arrayDatos = { "contraseña": datos.contraseña }
                const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/" + correo + "/update-one";
                respuestaServidor = await datosBody(arrayDatos, url);
                console.log(respuestaServidor);
                
                if(respuestaServidor.status == 200){
                    setCambiarEstado("Contraseña creada correctamente");
                    history.push("/login");
                }else if(respuestaServidor.code == 500 || respuestaServidor.code == 404 || respuestaServidor.code == 400){
                    
                    setMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
                    
                }
    
            } else if (datos.contraseña == "" || datos.Recontraseña == "") { /*Se verifica que no existan campos vacios*/
    
                //console.log("Campos vacios");
                setMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);
                //setToken("Campos vacios");
                /*console.log(respuestaServidor);*/
    
    
            } else { /*Si las contraseñas son distintas*/
                
                console.log("Contraseñas distintas");
                setMostrarMensaje(<MostrarMensaje mensaje={"Los campos no son iguales, verifique información."} />);
                /*console.log("Entre");*/
                /*setRespuestaServidor("Incorrecto");*/
                //setToken("Incorrecto");
    
                /*console.log(respuestaServidor);*/
    
        }
        } catch (error) {
            setMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);
        }
    };


    const estadoInicial = async (e) => {

        e.preventDefault();
        
        setCambiarEstado("Estado inicial");
        //history.push("/login");


    }

    useEffect(() => {
        console.log("Hola");
        console.log("Estado con el que sale de crear contraseña");
        console.log(cambiarEstado);
        if (cambiarEstado == "Estado inicial") {

            //setMostrarMensaje(<MostrarMensaje mensaje={""} />);
            //setCambiarEstado("");
            history.push("/login");

        }
    }, [cambiarEstado])

    return { verificarDatos, mostrarMensaje, estadoInicial };
};

export default useCrearContraseña;
