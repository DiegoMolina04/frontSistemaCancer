import '../../css/CrearContraseña.css'; //Estilos
import '../../css/fontawesome-free-5.15.4-web/css/all.css' //Iconos
import logoCrearContraseña from '../../image/logo.png' //Logo universidad.
import React, {useContext} from 'react'; //Importación de hooks.
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js"; //Para poder crear contextos.
import useChange from "./useChange"; //Usado para guardar los datos ingresados.
import useCrearContraseña from '../../../capaNegocio/logicaNegocio/useCrearContraseña'; //Logica negocio.

function CrearContraseña() {
    
    //Contextos para globalizar datos
    //Datos guardados desde el handleChange y enviados a logica de negocio.
    const {datosGuardados, setDatosGuardados} = useContext(UserContext);

    //Custom hook para comunicación con lógica de negocio y useChange.
    const {handleInputChange} = useChange();
    const {verificarDatos, mostrarMensaje, estadoInicial} = useCrearContraseña();
    
    //Componente para mostrar el mensaje informativo en el lugar que se desea.
    let componenteMostrarMensaje = <h5>{mostrarMensaje}</h5>
    
    return ( 

        <div id="fondo-CrearContraseña">

            {/*Contenedor de agregar usuario*/}
            <div id="caja-CrearContraseña">
                
                {/*Contenedor del logo*/}
                <div id="cajaLogo-CrearContraseña">

                    <img id="logo-CrearContraseña" src={logoCrearContraseña} alt=""/>

                </div>

                {/*Linea debajo del logo*/}
                <hr id="linea-CrearContraseña"/>
                
                <div id="cajaNuevoUsuario-CrearContraseña">
                    <label id="labelNuevoUsuario-CrearContraseña">Registro Contraseña Primera Vez</label>
                </div>

                <br />

                {componenteMostrarMensaje}

                {/*Contenedor de todo el formulario*/}
                <form className="row" onSubmit={(e) => verificarDatos(e, datosGuardados)}>

                <div id="formulario-CrearContraseña">

                    {/*Sección ingrese contraseña*/}
                    <label>Ingrese su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseña-CrearContraseña" type="text" className="form-control" placeholder="Ingrese su contraseña" title="Digite su contraseña" onChange={handleInputChange} name="contraseña"/>
                    </div>

                    <br />

                    {/*Sección rectifique contraseña*/}
                    <label>Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i className="fas fa-key"></i></div>
                        <input id="contraseñaRe-CrearContraseña" type="text" className="form-control" placeholder="Ingrese nuevamente su contraseña" title="Reingrese su contraseña" onChange={handleInputChange} name="Recontraseña"/>
                    </div>

                    <br />


                    {/*Sección Botones Enviar y Regresar*/}
                    <div id="cajaBotones-AgregarCuenta">

                        
                        <div id="cajaRegresar-AgregarCuenta">

                            {/*<Link to='/login'></Link>*/}
                            <button id="botonRegresar-AgregarCuenta" type="button" class="btn btn-primary" onClick={(e) => estadoInicial(e)} title="Regresar a la plataforma">Cancelar</button>
                            

                        </div>
                        
                        <div id="cajaEnviar-AgregarCuenta">
                            
                            {/*<Link to='/plataforma/diagnosticar'></Link>*/}

                            <button id="botonEnviar-AgregarCuenta" type="submit" class="btn btn-primary" title="Crear nuevo usuario">Enviar</button>
                            
                        </div>
                        

                    </div>
                    
                    {/*<button type="button" class="btn btn-primary">Primary</button>*/}
                    <br />

                    {/*
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">1</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">2</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
                        <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                    </div>
                    */}
                </div>
                </form>

            </div>

        </div>
    );
}

export default CrearContraseña;