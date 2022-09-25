//React
import React, { useState, useContext, useEffect } from 'react';
//Context
import { UserContext } from '../../../capaNegocio/context/UserContext';

const useChange = () => {

    //Estado para guardar datos
    const [datos, setDatos] = useState({ email: '', contraseña: '' });
    //Context
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);

    const handleInputChange = (event) => { //Captura evento de los cambio en inputs

        event.preventDefault();

        setDatos({
            ...datos,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }

    //Cada vez que se escriben los datos, se guarda en el contexto para ser enviado a la logica de negocio.
    useEffect(() => {
        setDatosGuardados(datos);
    }, [datos])

    return { handleInputChange }; //Se regresa el handleInput para poder ser usado desde donde se desea

};

export default useChange;