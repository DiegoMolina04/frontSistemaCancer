import { render } from '@testing-library/react';
import React, {Fragment, useState, useContext, useEffect} from 'react';
import { UserContext } from '../../../capaNegocio/context/UserContext';

const useChange = () => {

    const {respuestaServidor, setRespuestaServidor} = useContext(UserContext);
    const [datos, setDatos] = useState({ email:'', contraseña:''})
    const {datosGuardados, setDatosGuardados} = useContext(UserContext);

    const handleInputChange = (event) => {
        
        event.preventDefault();
        console.log(event.currentTarget.name)
        console.log(event.currentTarget.value)
        console.log("Hola desde useChange");

        
        console.log("Datos antes")
        //console.log(respuestaServidor)
        console.log(datos)
        setDatos({
            ...datos,
            [event.currentTarget.name]: event.currentTarget.value
        })
        

        /*setRespuestaServidor({
            ...respuestaServidor,
            [event.target.name]: event.target.value
        })*/

        console.log("Datos despues")
        console.log(datos)

        //obtenerDatos(datos);
        //console.log(respuestaServidor)


      }

    function obtenerDatos (informacion) {

        /*const miPrueba = JSON.stringify(informacion)
        console.log("Desde obtenerDatos")
        console.log(miPrueba);

        return miPrueba*/
        console.log("Desde obtener datos")
        console.log(informacion)
        
    }

    /*useEffect(() => {
        
        setDatos(datos)
        
    }, [datos])*/

    setDatosGuardados(datos)
    
      
      return { handleInputChange, obtenerDatos };

      
      
};

export default useChange;