//import logo from './logo.svg';
import '../css/Plataforma.css';
import '../css/Filtro.css';
import '../css/fontawesome-free-5.15.4-web/css/all.css';
import logo from '../image/logo.png';
import { UserContext } from "../../../src/capaNegocio/context/UserContext.js";
import React, {Fragment, useState, useContext} from 'react';
import { Link } from "react-router-dom";

function Plataforma() {

  const {es_admin, setEs_admin} = useContext(UserContext); //Se verifica si se debe o no mostrar botón administrar usuarios
  
  let componenteAdministrarUsuarios = null;

  //setEs_admin(true); //Provisional para pruebas

  if(es_admin == true){
    componenteAdministrarUsuarios = <Link to="/plataforma/administrarusuarios" >
    <button id="administrarUsuario" type="button" className="btn btn-success" title="Agregar un nuevo usuario" >
      <i className="fas fa-user"></i>
      Administrar Usuarios
    </button>
    </Link>
  }
    
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

          <Link to='/plataforma/diagnosticar'>
          <button type="button" className="btn btn-success" title="Iniciar diagnostico del paciente">
            <i class="fas fa-diagnoses"></i>
            Diagnosticar
          </button>
          </Link>

          <Link to='/plataforma/preguntas'>
          <button type="button" className="btn btn-success" title="Ver preguntas de diagnostico">
            <i class="fas fa-question"></i>
            Preguntas
          </button>
          </Link>

          <Link to='/plataforma/sintomas' >
          <button type="button" className="btn btn-success" title="Ver reglas de diagnostico">
            <i class="fas fa-heartbeat"></i>
            Sintomas
            {/*Reglamento*/}
          </button>
          </Link>

          <Link to='/plataforma/tiposdepresion' >
          <button type="button" className="btn btn-success" title="Ver tipos de depresión">
          <i class="fas fa-notes-medical"></i>
            Tipos Depresión
          </button>
          </Link>

          <Link to='/plataforma/diccionario' >
          <button type="button" className="btn btn-success" title="Ver diccionario de terminos">
            <i class="fas fa-book"></i>
            Diccionario
          </button>
          </Link>

          <Link to='/plataforma/diagrama' >
          <button type="button" className="btn btn-success" title="Ver diagrama de flujo">
            <i class="fas fa-project-diagram"></i>
            Diagrama
          </button>
          </Link>

        </div>

      </nav>

      {/*Caja Menu superior*/}
      <div id="menuSuperior">

        {/*<div id="busqueda">

          <select class="form-select" title="Seleccione categoria para buscar palabra" >
            
            <option selected >Seleccione Categoria...</option> {/*disabled}
            <option value="1">Sintoma</option>
            <option value="2">Diccionario</option>
            <option value="3">Usuario</option>

          </select>
          
          {/*<input type="text" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>}
          <input id="usuario" type="text" className="form-control" placeholder="¿Busca algo puntual?" title="Ingrese la palabra a buscar"/>
          
          <Link to='/plataforma/buscar'>
          <button id="enviarBuscar-Plataforma" type="button" className="btn btn-success" title="Buscar" >
            <i class="fas fa-search"></i>
          </button>
          </Link>

        </div>*/}

        {/*Contenedor botón inicio perfil*/}
        <div id="botonesSuperior" className="btn-group" role="group" >

          {/*Botón para agregar nuevo usuario*/}
          {componenteAdministrarUsuarios}

          <Link to='/plataforma/diagnosticar' >
          <button id="inicio" type="button" className="btn btn-success" title="Regresar a la pagina de inicio" >
            <i class="fas fa-home"></i>
            Inicio
          </button>
          </Link>
          
          <button id="cambioContraseña" type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalCambiarContraseña-Plataforma" title="Cambiar contraseña" >
          <i class="fas fa-key"></i>
            Cambio contraseña
          </button>
          <Link to='/login' >
          <button id="salir" type="button" className="btn btn-success" title="Cerrar sesión" >
          <i class="fas fa-sign-out-alt"></i>
            Salir
          </button>
          </Link>
        
          {/*<button id="expandiblePerfil" type="button" class="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false" title="Opciones de perfil">}
            Perfil
            <i class="far fa-caret-square-down"></i>
          </button>

          <ul class="dropdown-menu" >
            
            <li><a class="dropdown-item" href="" data-bs-toggle="modal" data-bs-target="#modalCambiarContraseña-Plataforma">Cambiar contraseña</a></li>

            <Link to='/login' >
            <li><a class="dropdown-item" href="" >Salir</a></li>
            </Link>
      </ul>*/}

        </div>

      </div>

      <div class="modal fade" id="modalCambiarContraseña-Plataforma" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">

                    <h5 class="modal-title" id="modalLabelAgregarAdministrarUsuarios-AdministrarUsuarios">

                      <i class="fas fa-cog"></i>
                        <label >Cambiar Contraseña</label>

                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" title="Regresa a administrar usuarios"></button>
                </div>

                <div class="modal-body">

                    {/*Sección AdministrarUsuarios*/}

                    <div id="labelAdministrarUsuariosAgregarAdministrarUsuarios-AdministrarUsuarios">

                        <label id="labelContraseñaActual-Plataforma">Ingrese su contraseña actual</label>

                    </div>
                    
                    <div className="input-group">
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-key"></i></div>
                        <input id="" type="password" className="form-control" placeholder="Ingrese la contraseña actual" title="Contraseña actual" />
                    </div>

                    <br />

                    {/*Sección Descripción*/}

                    <div id="labelcorreoAgregarAdministrarUsuarios-AdministrarUsuarios">
                        <label id="labelNuevaContraseña-Plataforma">Ingrese la nueva contraseña</label>
                    </div>
                    
                    <div className="input-group">
                        
                        <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-key"></i></div>
                        
                        <input id="" type="text" className="form-control" placeholder="Ingrese la nueva contraseña" title="Nueva contraseña" />
                        
                        
                    </div>

                    <br />

                    <label id="labelRectificacionContraseña-Plataforma">Ingrese nuevamente la nueva contraseña</label>

                    <div className="input-group">
                        
                      <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-key"></i></div>
                      
                      <input id="" type="password" className="form-control" placeholder="Ingrese nuevamente la nueva contraseña" title="Rectificación nueva contraseña" />
                      
                      
                    </div>

                    <br />


                </div>
                <div class="modal-footer">

                  <button type="button" id="botonModalCancelar-AdministrarUsuarios" class="btn btn-secondary" data-bs-dismiss="modal" title="Cancelar">Cancelar</button>
                  <button type="button" id="botonModalModificar-AdministrarUsuarios" class="btn btn-primary" title="Modificar contraseña">Modificar</button>

                </div>
            </div>
        </div>
    </div>

      {/*
      <div id="contenido">

        

      </div>
      */}

    </div>    
    
  );
}

export default Plataforma;
