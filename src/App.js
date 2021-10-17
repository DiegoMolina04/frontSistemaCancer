
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";/////////////////////
import Plataforma from '../src/js/Plataforma.js'
import Login from '../src/js/Login.js'
import AgregarUsuario from "./js/AgregarUsuario.js";
import Reglas from '../src/js/Reglas.js'
import Diagnosticar from '../src/js/Diagnosticar.js'
import Diccionario from '../src/js/Diccionario.js'
import Diagrama from '../src/js/Diagrama.js'

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