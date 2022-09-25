async function postBodyAutorization(datos, token, url) {
  
    const data = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            })
  
    const respuesta = await data.json();
  
    return (
      await respuesta
  
    );
  };
  
  export default postBodyAutorization;