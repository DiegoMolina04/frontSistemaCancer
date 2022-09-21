
async function datosLogin(datos){

    console.log("Estos son mis datos "+JSON.stringify(datos));

    const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/login",{
          method:"POST",
          mode:"cors",
          headers:{
            
            "Content-Type":"application/json"
            
          },
          body: JSON.stringify(datos)
      })
      
      const respuesta = await data.json();
      /*console.log("Respuesta");
      console.log(respuesta)*/

      //setRespuestaServidor(respuesta);
    return(
        await respuesta
        
    );
};
/*const consultarUsuario = async(event) => {
   
      event.preventDefault()

        const data = await fetch("https://secure-brushlands-86892.herokuapp.com/v1/users/login",{
          method:"POST",
          mode:"cors",
          headers:{
            
            "Content-Type":"application/json"
            
          },
          body: JSON.stringify(datos)
      })
      
      const respuesta = await data.json();


      setRespuestaServidor(respuesta);

  }*/

export default datosLogin