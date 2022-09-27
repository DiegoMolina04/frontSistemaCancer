//React
import { useState, useContext, useEffect } from 'react';
//Context
import { UserContext } from '../../../capaNegocio/context/UserContext';

const useChange = () => {

    //Contexto
    const { datosGuardados, setDatosGuardados } = useContext(UserContext);
    const { datosIntroducidos, setDatosIntroducidos } = useContext(UserContext);
    const { filtro, setFiltro } = useContext(UserContext);

    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext);//

    //Estado
    const [rol, setRol] = useState({ es_admin: null });

    const [sintomaId, setSintomaId] = useState([]); //Se guardan los id para crear el registro en la base de datos
    const [sintomaMensaje, setSintomaMensaje] = useState([]); //Se guarda el mensaje del id para mostrarlo en el textarea

    const handleInputChangeModificar = (event) => { //Para guardar los datos ingresados en el modificar
        console.log(event.currentTarget.name);
        console.log(event.currentTarget.value);
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

    // function handleCheckboxChange(event, elemento) {//Para guardar los cambios de los checkbox
    // //const handleCheckboxChange = (event) => {

    //     //console.log("VALOR DE DATOS GUARDADOS");
    //     //console.log(datosGuardados);
    //     //console.log(event.currentTarget);
    //     //console.log(event.target.checked);
    //     //console.log("Hola desde el checkBOX");
    //     //console.log(event.target.checked);
    //     //console.log(elemento);

    //     //let elementoSintoma = elemento.sintoma;
    //     //let elementoSintomaId = elemento.id;
    //     let elementoSintomaMensaje = elemento.sintoma;

    //     //console.log(elementoSintomaMensaje);

    //     if (event.target.checked == true) { //Si el checkbox es seleccionado

    //         //console.log("ENTREEEEEEEE AL TRUE")
    //         /*setSintomaId([
    //             ...sintomaId,
    //             elementoSintomaId
    //         ]);*/

    //         setSintomaMensaje([
    //             ...sintomaMensaje,
    //             elementoSintomaMensaje
    //         ]);

    //         /*setDatosIntroducidos([
    //             ...datosIntroducidos,
    //             "Hola"
    //             //[event.currentTarget.name]: [elemento]
    //         ])*/

    //         /*setDatosIntroducidos([
    //             ...datosIntroducidos,
    //             elemento
    //         ]);*/

    //         /*setDatosIntroducidos([
    //             ...sintomaMensaje,
    //             elementoSintomaMensaje
    //         ])*/

    //         /*setDatosIntroducidos([
    //             ...datosIntroducidos,
    //             elementoSintomaMensaje
    //         ])*/

    //         /*setDatosIntroducidos([
    //             ...datosTablaModificar,
    //             elementoSintomaMensaje
    //         ])*/

    //     } else { //Si el checkbox es deseleccionado

    //         /*const arrayFiltradoId = sintomaId.filter((item) => item !== elementoSintomaId); //Se saca del array el id del sintoma guardado
    //         setSintomaId(arrayFiltradoId);

    //         const arrayFiltradoMensaje = sintomaMensaje.filter((item) => item !== elementoSintomaMensaje); //Se saca del array el id del sintoma guardado
    //         console.log("Array FILTRADO");
    //         console.log(arrayFiltradoMensaje);
    //         setSintomaMensaje(arrayFiltradoMensaje);*/
    //         /*const arrayFiltradoMensaje = datosIntroducidos.filter((item) => item !== elementoSintomaMensaje); //Se saca del array el id del sintoma guardado
    //         setDatosIntroducidos(arrayFiltradoMensaje);*/

    //     }

    // }


    //Cada vez que se escriben los datos, se guarda en el contexto para ser enviado a la logica de negocio.
    useEffect(() => {
        setDatosGuardados(datosIntroducidos);

    }, [datosIntroducidos, rol])

    /*useEffect(() => {
        //setDatosTablaModificar(datosIntroducidos);
        console.log("El sintoma MENSAJE");
        console.log(sintomaMensaje);
    }, [sintomaMensaje])*/

    /*useEffect(() => {
        console.log("VALOR DE DATOS GUARDADOS");
        console.log(datosIntroducidos);
        //setSintomaMensaje(sintomaMensaje);
        setDatosTablaModificar(datosIntroducidos);


    }, [datosIntroducidos])*/

    return { handleInputChangeModificar, handleFiltrarChange, sintomaMensaje };

};

export default useChange;