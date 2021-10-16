//import logo from './logo.svg';
import '../css/Plataforma.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css'
import logo from '../image/logo.png'

function Plataforma() {
  return (
    
    <div id="fondo">

      {/* <header>Este es el header</header> */}
      
      {/*SideBar*/}
      <nav id="navbar" class="navbar"> {/*align-items-stretch p-3* class="navbar navbar-light bg-light flex-column"/}
        {/*<a class="navbar-brand" href="#">Navbar</a>*/}
        <div id="imagen">

          <img id="logo" src={logo} alt=""/>

        </div>
        <div id="menu"><p>Menu</p></div>

        {/*Default dropend button*/}

        <div id="opciones">

          <button type="button" className="btn btn-success" title="Iniciar diagnostico del paciente">
            <i class="fas fa-diagnoses"></i>
            Diagnosticar
          </button>
          
          <button type="button" className="btn btn-success" title="Ver reglas de diagnostico">
            <i class="fas fa-heartbeat"></i>
            Sintomas
            {/*Reglamento*/}
          </button>

          <button type="button" className="btn btn-success" title="Ver diccionario de terminos">
            <i class="fas fa-book"></i>
            Diccionario
          </button>

          <button type="button" className="btn btn-success" title="Ver diagrama de flujo">
            <i class="fas fa-project-diagram"></i>
            Diagrama
          </button>

        </div>

      </nav>

      {/*Caja Menu superior*/}
      <div id="menuSuperior">

        <div id="busqueda">

          <select class="form-select" title="Seleccione categoria para buscar palabra" >
            
            <option selected >Seleccione Categoria...</option> {/*disabled*/}
            <option value="1">Sintoma</option>
            <option value="2">Diccionario</option>

          </select>
          
          {/*<input type="text" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>*/}
          <input id="usuario" type="text" className="form-control" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>

        </div>

        {/*Contenedor botón inicio perfil*/}
        <div id="botonesSuperior" className="btn-group" role="group" >

          <button id="inicio" type="button" className="btn btn-success" title="Regresar a la pagina de inicio">
            <i class="fas fa-home"></i>
            Inicio
          </button>
          
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

        Contenido

      </div>

    </div>    
    
  );
}

export default Plataforma;
