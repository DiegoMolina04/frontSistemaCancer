//React
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//Context
import { UserContext } from "../context/UserContext.js";
//Datos
import putBody from '../../capaDatos/Put/putBody.js';
//Componentes
import MostrarMensaje from '../../capaPresentacion/vista/ComponentesComunes/MostrarMensaje.js';

const useCrearContraseña = () => {

    //Contextos
    const { correo, setCorreo } = useContext(UserContext);
    const { cambiarEstado, setCambiarEstado } = useContext(UserContext);

    //Componentes
    const [componenteMostrarMensaje, setComponenteMostrarMensaje] = useState("");

    const history = useHistory(); //Redirección de pestañas
    let respuestaServidor = ""; //Guarda las respuestas del servidor

    const verificarDatos = async (e, datos) => {

        e.preventDefault();

        try {
            if (datos.contraseña == datos.Recontraseña && datos.contraseña != "" && datos.Recontraseña != "") {
                
                let arrayDatos = { "contraseña": datos.contraseña }
                const url = "https://secure-brushlands-86892.herokuapp.com/v1/users/" + correo + "/update-one";
                respuestaServidor = await putBody(arrayDatos, url);

                if (respuestaServidor.status == 200) {
                    setCambiarEstado("Contraseña creada correctamente");
                    history.push("/login");

                } else if (respuestaServidor.code == 500 || respuestaServidor.code == 404 || respuestaServidor.code == 400) {

                    setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);

                }

            } else if (datos.contraseña == "" || datos.Recontraseña == "") { /*Se verifica que no existan campos vacios*/

                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Por favor llene todos los campos."} />);

            } else { /*Si las contraseñas son distintas*/
                setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Los campos no son iguales, verifique información."} />);

            }
        } catch (error) {
            setComponenteMostrarMensaje(<MostrarMensaje mensaje={"Un error a sucedido, regrese e intente de nuevo."} />);

        }
    };


    const estadoInicial = async (e) => {

        e.preventDefault();
        setCambiarEstado("Estado inicial");
        
    }

    useEffect(() => {
        if (cambiarEstado == "Estado inicial") {
            history.push("/login");

        }
    }, [cambiarEstado])

    return { verificarDatos, componenteMostrarMensaje, estadoInicial };
};

export default useCrearContraseña;
