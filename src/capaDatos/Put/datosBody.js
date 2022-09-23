async function datosBody(datos, url) {

    console.log("Estos son mis datos " + JSON.stringify(datos));

    const data = await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {

            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })

    const respuesta = await data.json();
    /*console.log("Respuesta");
    console.log(respuesta)
    respuestaServidor(respuesta);
    respuestaServidor(respuesta);
    setToken("Correcto");*/

    //setRespuestaServidor(respuesta);
    return (
        await respuesta

    );
};

export default datosBody;