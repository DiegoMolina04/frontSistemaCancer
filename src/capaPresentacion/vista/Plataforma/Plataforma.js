//Css
import '../../css/Plataforma.css';
import '../../css/Filtro.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css';
//Logo
import logo from '../../image/logo.png';
//React
import React from 'react';
//Logica negocio
import usePlataforma from '../../../capaNegocio/logicaNegocio/Plataforma/usePlataforma';

function Plataforma() {

  //Logica negocio
  const { componenteAdministrarUsuarios, redireccionarDiagnosticar, redireccionarResultadoDiagnostico, redireccionarPreguntas, redireccionarSintomas, redireccionarTiposDepresion, redireccionarDiccionario, redireccionarSalir, cambiarContraseña } = usePlataforma(); //Logica de negocio

  return (

    <div id="fondo">

      {/*SideBar*/}
      <nav id="navbar" className="navbar">

        <div id="imagen">

          <img id="logo" src={logo} alt="" />

        </div>

        <div id="menu">

          <p>Menú</p>

        </div>

        <div id="opciones">

          <button type="button" className="btn btn-success" onClick={redireccionarDiagnosticar} title="Iniciar diagnostico del paciente">
            <i className="fas fa-diagnoses"></i>
            Diagnosticar
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarResultadoDiagnostico} title="Ver resultados de diagnostico">
            <i className="fas fa-file-alt"></i>
            Resultados
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarPreguntas} title="Ver preguntas de diagnostico">
            <i className="fas fa-question"></i>
            Preguntas
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarSintomas} title="Ver reglas de diagnostico">
            <i className="fas fa-heartbeat"></i>
            Síntomas
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarTiposDepresion} title="Ver tipos de depresión">
            <i className="fas fa-notes-medical"></i>
            Clasificación Transtorno
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarDiccionario} title="Ver diccionario de terminos">
            <i className="fas fa-book"></i>
            Diccionario
          </button>

        </div>

      </nav>

      {/*Caja Menu superior*/}
      <div id="menuSuperior">

        {/*Contenedor botón inicio perfil*/}
        <div id="botonesSuperior" className="btn-group" role="group" >

          {/*Botón para administrar usuarios*/}
          {componenteAdministrarUsuarios}

          <button id="inicio" type="button" className="btn btn-success" onClick={redireccionarDiagnosticar} title="Regresar a la pagina de inicio" >
            <i className="fas fa-home"></i>
            Inicio
          </button>

          <button id="cambioContraseña" type="button" className="btn btn-success" onClick={cambiarContraseña} title="Cambiar contraseña" >
            <i className="fas fa-key"></i>
            Cambio contraseña
          </button>

          <button id="salir" type="button" className="btn btn-success" onClick={redireccionarSalir} title="Cerrar sesión" >
            <i className="fas fa-sign-out-alt"></i>
            Salir
          </button>

        </div>

      </div>

    </div>

  );
}

export default Plataforma;
