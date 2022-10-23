//React
import { useState, useContext, useEffect } from 'react';
//Context
import { UserContext } from '../../../../capaNegocio/context/UserContext';

const useChange = () => {

    //Estado para guardar datos
    const [datos, setDatos] = useState({ pregunta: '' });
    //Contexto
    const { setDatosGuardados } = useContext(UserContext);

    const handleInputChange = (event) => { //Captura datos ingresados

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

    return { handleInputChange };

};

export default useChange;