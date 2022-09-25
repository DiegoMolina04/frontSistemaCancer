async function postBody(datos, url) {

  console.log("Estos son mis datos " + JSON.stringify(datos));

  const data = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {

      "Content-Type": "application/json"

    },
    body: JSON.stringify(datos)
  })

  const respuesta = await data.json();

  return (
    await respuesta

  );
};

export default postBody;