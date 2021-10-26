import '../css/Diagnosticar.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import { Link } from "react-router-dom";

function Diagnosticar() {

    return ( 

    <div id="fondo-Diagnosticar">

        <div id="cabeceraDiagnosticar-Diagnosticar">
            
            <div id="cajaLabelDiagnosticar-Diagnosticar">
                <label>Diagnosticar</label>
            </div>

        </div>

        <div id="cajaDiagnostico-Diagnosticar">

            <div id="cajalabelSintoma-Diagnosticar">
                <label id="labelSintoma-Diagnosticar">Sintoma</label>
            </div>

            <div id="cajaRegla-Diagnosticar">
                <label>1. ¿La mitad de un lunar de nacimiento no es igual a la otra mitad?</label>
            </div>

        </div>

    </div>
    
    );
}

export default Diagnosticar;