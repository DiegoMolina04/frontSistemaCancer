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

                <label id="labelSintoma-Diagnosticar">Sintomas o señales</label>

            </div>

            <hr />

            <div id="cajaRegla-Diagnosticar">

                <label>1.¿La mitad de un lunar de nacimiento no es igual a la otra mitad?</label>

            </div>

            <hr />

            <div id="cajaBotones-Diagnosticar">

                <div id="botonNegativo-Diagnosticar">
                    
                    <button type="button" class="btn btn-primary">
                        <i class="fas fa-times"></i>
                    </button>

                </div>
                
                <div id="botonPositivo-Diagnosticar">

                    <button type="button" class="btn btn-secondary">
                        <i class="fas fa-check"></i>
                    </button>

                </div>
                

            </div>

        </div>

    </div>
    
    );
}

export default Diagnosticar;