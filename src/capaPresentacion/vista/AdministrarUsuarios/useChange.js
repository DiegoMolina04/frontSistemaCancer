import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../capaNegocio/context/UserContext';
import useAdministrarUsuarios from '../../../capaNegocio/logicaNegocio/useAdministrarUsuarios';

const useChange = () => {

    const { respuestaServidor, setRespuestaServidor } = useContext(UserContext);
    const [datos, setDatos] = useState({ }); //cedula: '', nombre: '', email: '', es_admin: null
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { correo, setCorreo } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);
    const { filtro, setFiltro } = useContext(UserContext);

    const {editarUsuario, setEditarUsuario} = useAdministrarUsuarios();

    //const [rol, setRol] = useState(null);
    const [rol, setRol] = useState({es_admin: null});

    /*const handleInputChange = (event) => {

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


    }*/

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.target.name)
        console.log(event.target.value)
        console.log("Desde changeModificar");
        /*setEditarUsuario({
            ...editarUsuario,
            [event.target.name]: event.target.value
        })*/
        /*setDatos({
            ...datos,
            [event.currentTarget.name]: event.currentTarget.value
        })*/

        setDatosIntroducidos({
            ...datosIntroducidos,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }

    const handleFiltrarChange = (event) => { //Para guardar la categoria seleccionada en el filtrar
        console.log(event.target.name)
        console.log(event.target.value)
        console.log("Este es el valor de la seleccion desde useChange " + event.currentTarget.value);

        const categoria = event.currentTarget.value;
        /*setFiltro({
            ...filtro,
            categoria
        })*/
        setFiltro({
            ...filtro,
            [event.currentTarget.name]: event.currentTarget.value
        })

    }
    

    //Cada vez que se escriben los datos, se guarda en el contexto para ser enviado a la logica de negocio.
    useEffect(() => {
        //setDatos(datosGuardados);
        //let datosEnviar = {...datos, rol} 
        //let datosEnviar = { cedula: datos.cedula, nombre: datos.nombre, email: datos.email, es_admin: rol }
        //setCorreo({ cedula: datos.cedula, nombre: datos.nombre, email: datos.email, es_admin: rol });
        //setDatosGuardados(correo);
        /*console.log("Datos guardados en correo");
        console.log(correo);*/
        console.log("Efecto desde el cambio");
        console.log(datosIntroducidos);
        setDatosGuardados(datosIntroducidos);
    }, [datosIntroducidos, rol])//}, [datos, rol])

    /*useEffect(() => {
        setDatosIntroducidos({cedula: '', nombre: '', email: '', es_admin: null});
        console.log("Efecto numero dos");
        console.log(datosIntroducidos);
    }, [])*/

    return { handleInputChangeModificar, handleFiltrarChange };

};

export default useChange;