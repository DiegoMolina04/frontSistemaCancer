import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../capaNegocio/context/UserContext';

const useChange = () => {

    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext);
    const [datos, setDatos] = useState({ contraseña: '', Recontraseña: '' })
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);

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

        console.log("Datos despues")
        console.log(datos)

        //obtenerDatos(datos);
        //console.log(respuestaServidor)


    }

    //Cada vez que se escriben los datos, se guarda en el contexto para ser enviado a la logica de negocio.
    useEffect(() => {
        setDatosGuardados(datos);
    }, [datos])

    return { handleInputChange };

};

export default useChange;