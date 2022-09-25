async function postBody(datos, url) {

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