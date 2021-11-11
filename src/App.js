
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";/////////////////////
import Plataforma from '../src/js/Plataforma.js'
import Login from '../src/js/Login.js'
import AgregarUsuario from "./js/AgregarUsuario.js";
import Reglas from '../src/js/Reglas.js'
import Diagnosticar from '../src/js/Diagnosticar.js'
import Diccionario from '../src/js/Diccionario.js'
import Diagrama from '../src/js/Diagrama.js'
import Buscar from "./js/Buscar.js";
import VerPerfil from "./js/VerPerfil.js";
import AdministrarUsuarios from "./js/AdministrarUsuarios.js";
import SeleccionAdministrador from "./js/SeleccionAdministrador.js";

function App(){

    return (
        

        <BrowserRouter>
            
            <Switch>

                <Route exact path = "/login" >
                    <Login />
                </Route>

                <Route exact path = "/agregarusuario" >
                    <AgregarUsuario />
                </Route>

                <Route exact path = "/plataforma" >
                    <Plataforma />
                </Route>

                <Route exact path = "/plataforma/diagnosticar" >
                    <Plataforma />
                    <div>
                        <Diagnosticar />
                    </div>
                </Route>

                <Route exact path = "/plataforma/reglas" >
                    <Plataforma />
                    <div>
                        <Reglas />
                    </div>
                </Route>

                <Route exact path = "/plataforma/diccionario" >
                    <Plataforma />
                    <div>
                        <Diccionario />
                    </div>
                </Route>

                <Route exact path = "/plataforma/diagrama" >
                    <Plataforma />
                    <div>
                        <Diagrama />
                    </div>
                </Route>

                <Route exact path = "/plataforma/buscar" >
                    <Plataforma />
                    <div>
                        <Buscar />
                    </div>
                </Route>

                <Route exact path = "/plataforma/administrarusuarios" >
                    <Plataforma />
                    <div>
                        <AdministrarUsuarios />
                    </div>
                </Route>

                <Route exact path = "/verperfil" >
                    <VerPerfil />
                </Route>

                <Route exact path = "/seleccionadministrador" >
                    <SeleccionAdministrador />
                </Route>

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