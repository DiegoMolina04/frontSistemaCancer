//Css
import '../../../css/AgregarSintomas.css';
import '../../../css/fontawesome-free-5.15.4-web/css/all.css'
//Logo
import logoAgregarUsuario from '../../../image/logo.png'
//React
import React, { useContext } from 'react';
//Context
import { UserContext } from "../../../../../src/capaNegocio/context/UserContext.js";
//OnChange
import useChange from './useChange';
//Logica negocio
import useAgregarSintomas from '../../../../capaNegocio/logicaNegocio/Sintomas/useAgregarSintomas';

function AgregarSintomas() {

    const { datosTablaModificar, setDatosTablaModificar } = useContext(UserContext);//Se muestran datos del textarea
    const { guardarID, setGuardarID } = useContext(UserContext);//Se envia los id de los elementos seleccionados con los checkbox
    const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Se envia el cambio del input

    //Se llama al inputChange
    const { handleInputChange } = useChange();
    //Se llaman componentes y funciones necesarias
    const { cargarTiposDepresion, enviarDatos, componenteListarTiposDepresion, componenteMostrarMensaje, handleChange, reiniciarDatos } = useAgregarSintomas();

    return (

        <div id="fondo-AgregarSintomas">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-AgregarSintomas">

                {/*Contenedor del logo*/}
                <div id="cajaLogo-AgregarSintomas">

                    <img id="logo-AgregarSintomas" src={logoAgregarUsuario} alt="" />

                </div>


                {/*Linea debajo del logo*/}
                <hr id="linea-AgregarSintomas" />

                <div id="cajaNuevoSintoma-AgregarSintomas">
                    <label id="labelNuevoSintoma-AgregarSintomas">Nuevo sintoma</label>
                </div>

                <br />

                <h5>{componenteMostrarMensaje}</h5>


                {/*Contenedor de todo el formulario*/}


                <div id="formulario-AgregarSintomas">

                    {/*Sección ingrese cedula*/}
                    <label>Ingrese el sintoma</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-heartbeat"></i></div>
                        <input id="inputIngreseSintoma-AgregarSintomas" type="text" className="form-control" placeholder="Ingrese el sintoma" onChange={handleInputChange} name="sintoma" />
                    </div>

                    <br />

                    {/*Sección ingrese nombre*/}
                    <label>Seleccione el/los tipos de depresión</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-book"></i></div>
                        <textarea class="form-control" placeholder="Seleccione el/los tipos de depresión" readonly="readonly" value={datosTablaModificar} onChange={handleChange}></textarea>
                    </div>

                    <br />

                    <div id="cajaTabla-AgregarSintomas">
                        <form className="row" onSubmit={(e) => cargarTiposDepresion(e)}>
                            <div id="cajaBotonRecargar-AgregarSintomas">
                                <button id="botonRecargar-AgregarSintomas" type='submit' className="btn btn-success" title='Recargar tabla'><i class="fas fa-redo"></i></button>
                            </div>
                        </form>
                        <table id="tablaTiposDepresion-AgregarSintomas" class="table table-bordered">

                            <thead> {/*Cabeceras*/}
                                <tr>
                                    <th id="tiposDepresionTablaCabecera-AgregarSintomas" scope="col" title="Tipos de depresión">Tipos Depresión</th>
                                    <th id="seleccionTablaCabecera-AgregarSintomas" scope="col" title="Selecciones">Elegir</th>

                                </tr>
                                {componenteListarTiposDepresion}
                            </thead>
                        </table>

                    </div>

                    <br />

                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarSintomas">


                        <div id="cajaRegresar-AgregarSintomas">

                            <button id="botonRegresar-AgregarSintomas" type="button" class="btn btn-primary" title="Regresar a la plataforma" onClick={reiniciarDatos}>Regresar</button>

                        </div>

                        <form className="row" onSubmit={(e) => enviarDatos(e, datosGuardados, guardarID)}>
                            <div id="cajaEnviar-AgregarSintomas">
                                <button id="botonEnviar-AgregarSintomas" type="submit" class="btn btn-primary" title="Crear nuevo sintoma" >Enviar</button>
                            </div>
                        </form>

                    </div>
                    <br />
                </div>

            </div>

        </div>
    );
}

export default AgregarSintomas;