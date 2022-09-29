//React
import { useContext, useEffect } from 'react';
//Context
import { UserContext } from '../../../capaNegocio/context/UserContext';

const useChange = () => {

    //Contexto
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar

        setDatosIntroducidos({
            ...datosIntroducidos,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }

    //Cada vez que se escriben los datos, se guarda en el contexto para ser enviado a la logica de negocio.
    useEffect(() => {
        setDatosGuardados(datosIntroducidos);

    }, [datosIntroducidos])

    return { handleInputChangeModificar };

};

export default useChange;