//React
import { useState, useContext, useEffect } from 'react';
//Context
import { UserContext } from '../../../../capaNegocio/context/UserContext';

const useChange = () => {

    //Estados para guardar datos
    const [datos, setDatos] = useState({ termino: '', descripcion: '' });

    //Context
    const { setDatosGuardados } = useContext(UserContext);

    const handleInputChange = (event) => { //Captura los datos ingresados

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