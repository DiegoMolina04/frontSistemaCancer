//Css
import '../../css/Diagnosticar.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logica negocio
import useDiagnosticar from '../../../capaNegocio/logicaNegocio/Diagnosticar/useDiagnosticar';

function Diagnosticar() {

    const { componenteMostrarMensaje, componentePregunta, componenteMensajeGuardar, componenteBotones } = useDiagnosticar();

    return (

        <div id="fondo-Diagnosticar">

            <div id="cabeceraDiagnosticar-Diagnosticar">

                <div id="cajaLabelDiagnosticar-Diagnosticar">
                    <label>Diagnosticar</label>
                </div>

            </div>

            <div id="cajaDiagnostico-Diagnosticar">

                <div id="cajalabelSintoma-Diagnosticar">

                    <label id="labelSintoma-Diagnosticar">{componenteMostrarMensaje}</label>

                </div>

                <hr />

                <div id="cajaRegla-Diagnosticar">

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

        </div>

    );
}

export default Diagnosticar;