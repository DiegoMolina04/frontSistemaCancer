//React
import { useState, useContext, useEffect } from 'react';
//Context
import { UserContext } from '../../../capaNegocio/context/UserContext';

const useChange = () => {

    //Contexto
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);
    const { filtro, setFiltro } = useContext(UserContext);

    //Estado
    const [rol, setRol] = useState({ es_admin: null });

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar

        setDatosIntroducidos({
            ...datosIntroducidos,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }

    const handleFiltrarChange = (event) => { //Para guardar la categoria seleccionada en el filtrar

        setFiltro({
            ...filtro,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }


    //Cada vez que se escriben los datos, se guarda en el contexto para ser enviado a la logica de negocio.
    useEffect(() => {
        setDatosGuardados(datosIntroducidos);

    }, [datosIntroducidos, rol])

    return { handleInputChangeModificar, handleFiltrarChange };

};

export default useChange;