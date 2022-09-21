import React, { Fragment, useState, useContext, Component } from 'react';
import { UserContext } from "../../../src/capaNegocio/context/UserContext.js";
import { Redirect } from "react-router-dom";
import { render } from '@testing-library/react';

import { useLogin } from './useLogin.js';
//import MensajeMostrar from "../../capaNegocio/logicaNegocio/LogicaLogin.js"

/*export function Prueba(e){

    e.preventDefault();

    const {increase} = useCounter();

    //const {respuestaServidor} = useUsers()
    //console.log("Esta es mi respuesta");
    //console.log(prueba);
    
}*/

function Prueba(e){
    /*e.preventDefault();
    console.log("Si funciona");
    const {increase} = useCounter();
    increase()*/
}

function LogicaLogin(e){
    /*e.preventDefault();
    console.log("Si funciona");*/
}

export default {LogicaLogin, Prueba}

