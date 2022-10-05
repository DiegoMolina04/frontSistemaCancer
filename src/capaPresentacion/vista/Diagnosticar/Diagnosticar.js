//Css
import '../../css/Diagnosticar.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
//Logica negocio
import useDiagnosticar from '../../../capaNegocio/logicaNegocio/Diagnosticar/useDiagnosticar';

function Diagnosticar() {

    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Preguntas para mostrar en el textarea
    const { componenteMostrarMensaje, componentePregunta, componenteMensajeGuardar, componenteBotones, handleChange } = useDiagnosticar();

    return ( 

    <div id="fondo-Diagnosticar">
        
        <div id="cabeceraDiagnosticar-Diagnosticar">
            
            <div id="cajaLabelDiagnosticar-Diagnosticar">
                <label>Diagnosticar</label>
            </div>

        </div>

        <div id="cajaDiagnostico-Diagnosticar">

            <div id="cajalabelSintoma-Diagnosticar">

                <label id="labelSintoma-Diagnosticar">{componenteMostrarMensaje}</label>{/*Sintomas o señales*/}

            </div>

            <hr />

            <div id="cajaRegla-Diagnosticar">

                {/*<label>1.¿La mitad de un lunar de nacimiento no es igual a la otra mitad?</label>*/}
                {componentePregunta}

            </div>

            <hr />

            <div id="cajaMensajeGuardar-Diagnosticar">
                <label>{componenteMensajeGuardar}</label>
            </div>

            <br />

            <div id="cajaBotones-Diagnosticar">

                {componenteBotones}

            </div>

        </div>

        <div id="cajaTextarea-Diagnosticar">
            <textarea class="form-control" value={datosGuardados} onChange={handleChange} placeholder="Preguntas seleccionadas..." readOnly></textarea>
        </div>

    </div>
    
    );
}

export default Diagnosticar;