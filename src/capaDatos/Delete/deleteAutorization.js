async function deleteAutorization(token, url) {

    const data = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    })

    const respuesta = await data;

    return (
        await respuesta

    );
};

export default deleteAutorization;