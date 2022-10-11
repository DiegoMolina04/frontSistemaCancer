async function getAutorizationPDF(token, url) {

    const data = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    })

    return (
        await data

    );
}

export default getAutorizationPDF;