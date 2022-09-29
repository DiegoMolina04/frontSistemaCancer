//React
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Componente
import ComponenteAdministrarUsuarios from '../../../capaPresentacion/vista/Plataforma/ComponenteAdministrarUsuarios';

const usePlataforma = () => {
    
    //Contexto
    const { token, setToken } = useContext(UserContext); //Token para saber si esta logeado
    const { es_admin, setEs_admin } = useContext(UserContext); //Para saber roles tienen
    const { correo, setCorreo } = useContext(UserContext); //Correo del usuario
    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Muestra dato en el input del modificar
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);
    //Componente
    const [componenteAdministrarUsuarios, setComponenteAdministrarUsuarios] = useState(""); //Boton agregar si es admin

    const history = useHistory(); //Redireccionar

    function redireccionarAdministrarUsuarios() { //Redirecciona

        history.push("/plataforma/administrarusuarios");
    }

    function redireccionarDiagnosticar() { //Redirecciona

        history.push("/plataforma/diagnosticar");
    }

    function redireccionarPreguntas() { //Redirecciona

        history.push("/plataforma/preguntas");
    }

    function redireccionarSintomas() { //Redirecciona

        history.push("/plataforma/sintomas");
    }

    function redireccionarTiposDepresion() { //Redirecciona

        history.push("/plataforma/tiposdepresion");
    }

    function redireccionarDiccionario() { //Redirecciona

        history.push("/plataforma/diccionario");
    }

    function redireccionarDiagrama() { //Redirecciona

        history.push("/plataforma/diagrama");
    }

    function redireccionarSalir() { //Redirecciona

        setToken("");
        setEs_admin("");
        setCorreo("");
        setCambiarEstado("");
        history.push("/login");
    }

    function cambiarContraseña () { //Redirecciona a vista crear contraseña para modificarla

        setCambiarEstado("Modificar Contraseña");
        history.push("/crearcontraseña");
    
    }

    useEffect(() => {
        
        if(cambiarEstado === "Reiniciar modal"){
            console.log("DATOS GUARDADOS");
            console.log(datosGuardados);
        }
    }, [cambiarEstado])
    
    useEffect(() => {

        if (es_admin == true && token != undefined) { //Si es admin

            setComponenteAdministrarUsuarios(<ComponenteAdministrarUsuarios />);

        } else { //Si no lo es

            setComponenteAdministrarUsuarios("");

        }
    }, [])
    return { componenteAdministrarUsuarios, redireccionarAdministrarUsuarios, redireccionarDiagnosticar, redireccionarPreguntas, redireccionarSintomas, redireccionarTiposDepresion, redireccionarDiccionario, redireccionarDiagrama, redireccionarSalir, cambiarContraseña };
};

export default usePlataforma;
