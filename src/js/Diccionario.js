import '../css/Diccionario.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'

function Diccionario() {

    return ( 

        <div id="fondo-Diccionario">

            <div id="cajaLabelTerminos-Diccionario">
                <label>Terminos</label>
            </div>
            
            <div id="cajaTabla-Diccionario">
                <table id="tabla-Diccionario" class="table table-bordered">
                    
                    <thead> {/*Cabeceras*/}
                        <tr>
                            <th id="idTablaCabecera-Diccionario" scope="col">ID</th>
                            <th id="palabraTablaCabecera-Diccionario" scope="col">Palabra</th>
                            <th id="descripcionTablaCabecera-Diccionario" scope="col">Descripción</th>
                          </tr>
                    </thead>
                    <tbody> {/*Filas*/}
                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">1</th>
                            <td id="palabraTablaFila-Diccionario">Cancer de piel</td>
                            <td id="descripcionTablaFila-Diccionario">El cáncer de piel —el crecimiento anormal de las células de la piel— se suele desarrollar en la piel expuesta al sol. Pero esta forma frecuente de cáncer también puede ocurrir en zonas de piel que normalmente no están expuestas a la luz solar.</td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">2</th>
                            <td id="palabraTablaFila-Diccionario">Melanoma</td>
                            <td id="descripcionTablaFila-Diccionario">El melanoma ocurre cuando las células productoras de pigmento que dan color a la piel se vuelven cancerosas.Los síntomas incluyen neoplasias inusuales y nuevas, o cambios en un lunar ya existente. Los melanomas pueden aparecer en cualquier lugar del cuerpo.</td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">3</th>
                            <td id="palabraTablaFila-Diccionario">Carcinoma basocelular</td>
                            <td id="descripcionTablaFila-Diccionario">Las células basales producen nuevas células de la piel a medida que las anteriores mueren. Limitar la exposición al sol puede prevenir que estas células se tornen cancerosas.Este tipo de cáncer generalmente se manifiesta como una protuberancia cerosa blanquecina o un área escamosa amarronada en las zonas que se exponen al sol, como el rostro y el cuello.</td>
                        </tr>

                        <tr>
                            <th id="idTablaFila-Diccionario" scope="row">4</th>
                            <td id="palabraTablaFila-Diccionario">Carcinoma espinocelular</td>
                            <td id="descripcionTablaFila-Diccionario">Las células escamosas (queratinocitos) son las principales células estructurales de la epidermis (la capa externa de la piel). El carcinoma de células escamosas es un cáncer de estas células. En Estados Unidos, más de un millón de personas son diagnosticadas anualmente de carcinoma de células escamosas y 2500 mueren a causa de este tipo de cáncer.El carcinoma de células escamosas, el segundo tipo de cáncer de piel más frecuente después del carcinoma de células basales, generalmente se desarrolla en áreas expuestas al sol, pero puede crecer en cualquier parte de la piel o en la boca, donde la exposición al sol es mínima. Sin embargo, las personas cuya piel ha sufrido mayor exposición solar corren un riesgo más alto de desarrollar cáncer de piel de células escamosas. Las personas de piel clara son mucho más susceptibles al carcinoma de células escamosas que las personas de piel más oscura.</td>
                        </tr>

                    </tbody>
                  </table>                  
            </div>

        </div>
    );
}

export default Diccionario;