//import logo from './logo.svg';
import '../css/Plataforma.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/logo.png'

function Plataforma() {
  return (
    
    <div id="fondo">

      {/* <header>Este es el header</header> */}
      
      {/*SideBar*/}
      <nav id="navbar" class="navbar navbar-light bg-light flex-column"> {/*align-items-stretch p-3*/}
        {/*<a class="navbar-brand" href="#">Navbar</a>*/}
        <div id="imagen">

          <img id="logo" src={logo} alt=""/>

        </div>
        <div id="menu"><p>Menu</p></div>

        {/*Default dropend button*/}

        <div id="opciones">

          <button type="button" className="btn btn-success">Reglas</button>
          <button type="button" className="btn btn-success">Diccionario</button>
          <button type="button" className="btn btn-success">Diagrama</button>

        </div>

      </nav>

      {/*Caja Menu superior*/}
      <div id="menuSuperior">

        <div id="busqueda">

          <select class="form-select" title="Seleccione categoria para buscar palabra" >
            
            <option selected >Seleccione Categoria...</option> {/*disabled*/}
            <option value="1">Regla</option>
            <option value="2">Diccionario</option>

          </select>
          
          <input type="text" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>

        </div>

        {/*Contenedor botón inicio perfil*/}
        <div id="botonesSuperior" className="btn-group" role="group" >

          <button type="button" className="btn btn-success" title="Regresar a la pagina de inicio">Inicio</button>
          {/*<button type="button" className="btn btn-success">Middle</button>*/}

          <button id="expandiblePerfil" type="button" class="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false" title="Opciones de perfil"> {/*class="btn btn-primary dropdown-toggle"*/}
            Perfil
            <i class="far fa-caret-square-down"></i>
          </button>
          <ul class="dropdown-menu" >
            <li><a class="dropdown-item" href="" >Ver perfil</a></li>
            <li><a class="dropdown-item" href="" >Salir</a></li>
          </ul>

        </div>

      </div>

      <div id="contenido">

        prueba

      </div>

    </div>    
    
  );
}

export default Plataforma;
