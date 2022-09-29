
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";/////////////////////
import Plataforma from '../src/capaPresentacion/vista/Plataforma.js'
import Login from './capaPresentacion/vista/Login/Login';
import AgregarUsuario from "../src/capaPresentacion/vista/AdministrarUsuarios/AgregarUsuario/AgregarUsuario.js";
import CrearContraseña from "../src/capaPresentacion/vista/Login/CrearContraseña/CrearContraseña";
import Preguntas from "../src/capaPresentacion/vista/Preguntas/Preguntas.js";
import AgregarPregunta from "../src/capaPresentacion/vista/Preguntas/AgregarPregunta/AgregarPregunta.js";
import Sintomas from '../src/capaPresentacion/vista/Sintomas/Sintomas.js';
import AgregarSintomas from "../src/capaPresentacion/vista/Sintomas/AgregarSintomas/AgregarSintomas.js";
import TiposDepresion from "../src/capaPresentacion/vista/TiposDepresion/TiposDepresion.js";
import AgregarTipoDepresion from "../src/capaPresentacion/vista/TiposDepresion/AgregarTipoDepresion/AgregarTipoDepresion.js";
import Diagnosticar from '../src/capaPresentacion/vista/Diagnosticar.js'
import Diccionario from '../src/capaPresentacion/vista/Diccionario/Diccionario.js'
import AgregarDiccionario from "../src/capaPresentacion/vista/Diccionario/AgregarDiccionario/AgregarDiccionario.js";
import Diagrama from '../src/capaPresentacion/vista/Diagrama.js'
import AdministrarUsuarios from "../src/capaPresentacion/vista/AdministrarUsuarios/AdministrarUsuarios.js";

import { UserContext } from "../src/capaNegocio/context/UserContext.js";
import { useMemo, useState } from "react";

function App() {

    const [correo, setCorreo] = useState("");
    const email = useMemo(() => ({ correo, setCorreo }), [correo, setCorreo]);

    const [token, setToken] = useState("");
    const mostrarToken = useMemo(() => ({ token, setToken }), [token, setToken]);

    const [es_admin, setEs_admin] = useState("");
    const mostrarEs_admin = useMemo(() => ({ es_admin, setEs_admin }), [es_admin, setEs_admin]);

    const [respuestaServidor, setRespuestaServidor] = useState("");

    const [datosGuardados, setDatosGuardados] = useState(""); //Guarda y muestra datos modificados en modal

    const [cambiarEstado, setCambiarEstado] = useState("");

    const [datosIntroducidos, setDatosIntroducidos] = useState(""); //Guarda datos en los handleChange

    const [datosOriginales, setDatosOriginales] = useState(""); //Guarda los datos originales a modificar
    
    const [filtro, setFiltro] = useState(""); //Guarda valores del filtro

    const [datosTablaModificar, setDatosTablaModificar] = useState(""); //Muestra los datos que se van seleccionando en el modificar

    const [guardarID, setGuardarID] = useState(""); //Guarda ID seleccionados en el modificar
    
    const value = useMemo(() => ({ respuestaServidor, setRespuestaServidor, correo, setCorreo, token, setToken, es_admin, setEs_admin, datosGuardados, setDatosGuardados, cambiarEstado, setCambiarEstado, datosIntroducidos, setDatosIntroducidos, datosOriginales, setDatosOriginales, filtro, setFiltro, datosTablaModificar, setDatosTablaModificar, guardarID, setGuardarID }), [respuestaServidor, setRespuestaServidor, correo, setCorreo, token, setToken, es_admin, setEs_admin, datosGuardados, setDatosGuardados, cambiarEstado, setCambiarEstado, datosIntroducidos, setDatosIntroducidos, datosOriginales, setDatosOriginales, filtro, setFiltro, datosTablaModificar, setDatosTablaModificar, guardarID, setGuardarID]);



    return (


        <BrowserRouter>

            <Switch>

                <UserContext.Provider value={value}>

                    <Route exact path="/login" >
                        
                        
                        <Login />
                        
                    </Route>

                    {/*<Route exact path="/agregarusuario" render={() => token && es_admin ? <AgregarUsuario /> : <Login />}>*/}
                    <Route exact path="/agregarusuario" >
                        <AgregarUsuario />
                        
                    </Route>

                    <Route exact path="/crearcontraseña" >
                        <CrearContraseña />
                    </Route>

                    <Route exact path="/plataforma" >
                        <Plataforma />
                    </Route>

                    <Route exact path="/plataforma/preguntas" >
                        <Plataforma />
                        <div>
                            <Preguntas />
                        </div>
                    </Route>

                    {/*<Route exact path = "/agregarpregunta" >
                        
                        <AgregarPregunta />
                        
                    </Route>*/}
                    {/*<Route exact path="/agregarpregunta" render={() => token && es_admin ?
                        <AgregarPregunta />

                        : <Login></Login>

                    }>

                    </Route>*/}

                    <Route exact path="/agregarpregunta">
                        <AgregarPregunta />
                    </Route>

                    {/*<Route exact path = "/plataforma/diagnosticar" >
                        <Plataforma />
                        <div>
                            <Diagnosticar />
                        </div>
                    </Route>*/}

                    <Route exact path="/plataforma/diagnosticar" render={() => token ? /*Si tiene token redirecciona a la pagina deseada*/
                        <div>
                            <Plataforma />
                            <div>
                                <Diagnosticar />
                            </div>
                        </div>
                        : <Login /> /*Si no, redirecciona al Login*/
                    }>

                    </Route>

                    <Route exact path="/plataforma/sintomas" >
                        <Plataforma />
                        <div>
                            <Sintomas />
                        </div>
                    </Route>

                    {/*<Route exact path="/agregarsintoma" render={() => token && es_admin ?
                        <AgregarSintomas />

                        : <Login></Login>

                    }></Route>*/}

                    <Route exact path="/agregarsintoma">
                        <AgregarSintomas />
                    </Route>

                    <Route exact path="/plataforma/tiposdepresion" >
                        <Plataforma />
                        <div>
                            <TiposDepresion />
                        </div>
                    </Route>

                    {/*<Route exact path="/agregartipodepresion" render={() => token && es_admin ?
                        <AgregarTipoDepresion />

                        : <Login></Login>

                    }></Route>*/}

                    <Route exact path="/agregartipodepresion">

                        <AgregarTipoDepresion />    

                    </Route>

                    <Route exact path="/plataforma/diccionario" >
                        <Plataforma />
                        <div>
                            <Diccionario />
                        </div>
                    </Route>

                    {/*<Route exact path="/agregardiccionario" render={() => token && es_admin ?
                        <AgregarDiccionario />

                        : <Login></Login>

                    }></Route>*/}

                    <Route exact path="/agregardiccionario">
                        <AgregarDiccionario />
                    </Route>

                    <Route exact path="/plataforma/diagrama" >
                        <Plataforma />
                        <div>
                            <Diagrama />
                        </div>
                    </Route>

                    <Route exact path="/plataforma/administrarusuarios" >
                        <Plataforma />
                        <div>
                            <AdministrarUsuarios />
                        </div>
                    </Route>

                </UserContext.Provider>

            </Switch>

        </BrowserRouter>

        /*<Switch>

                <Route exact path = "/login">
                    <Login />
                </Route>

            </Switch>,

            <Switch>
            <Route exact path = "/plataforma">
                    
                    <BrowserRouter>
                        <Plataforma />
                            <div>

                                <Route path = "/diagnosticar" exact={true} component={Diagnosticar} />
                                <Route path = "/reglas" exact={true} component={Reglas} />
                                <Route path = "/diccionario" exact={true} component={Diccionario} />
                                <Route path = "/diagrama" exact={true} component={Diagrama} />
                                

                            </div>

                       
                        
                    </BrowserRouter>
                    
                </Route> */
        /*
        <BrowserRouter>
        
            <Plataforma />
                <div>

                    <Route path = "/diagnosticar" exact={true} component={Diagnosticar} />
                    <Route path = "/reglas" exact={true} component={Reglas} />
                    <Route path = "/diccionario" exact={true} component={Diccionario} />
                    <Route path = "/diagrama" exact={true} component={Diagrama} />

                </div>
        
        </BrowserRouter>*/


    );


}

export default App;