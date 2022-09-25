function verificarNumeros (e){
    
    if ((e.keyCode < '8' || e.keyCode > '57') && (e.keyCode < '96' || e.keyCode > '105')) {
        e.preventDefault()
    }
}

export default verificarNumeros;