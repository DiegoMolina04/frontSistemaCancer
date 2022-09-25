async function getAutorization(token, url) {

    const data = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    })

    const respuesta = await data.json();

    return (
        await respuesta

    );
}

export default getAutorization;