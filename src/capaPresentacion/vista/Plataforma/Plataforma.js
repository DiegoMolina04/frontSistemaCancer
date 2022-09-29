//import logo from './logo.svg';
import '../../css/Plataforma.css';
import '../../css/Filtro.css';
import '../../css/fontawesome-free-5.15.4-web/css/all.css';
import logo from '../../image/logo.png';
import { UserContext } from "../../../../src/capaNegocio/context/UserContext.js";
import React, { Fragment, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import verificarNumeros from '../../../capaNegocio/logicaNegocio/LogicaComun/verificarNumeros';
import useChange from './useChange';
import usePlataforma from '../../../capaNegocio/logicaNegocio/Plataforma/usePlataforma';

function Plataforma() {

  const { datosGuardados, setDatosGuardados } = useContext(UserContext); //Muestra dato en el input del modificar
  const { correo, setCorreo } = useContext(UserContext); //Envia correo para actualizar contraseña
  const { handleInputChangeModificar } = useChange()
  const { componenteAdministrarUsuarios, redireccionarDiagnosticar, redireccionarPreguntas, redireccionarSintomas, redireccionarTiposDepresion, redireccionarDiccionario, redireccionarDiagrama, redireccionarSalir, cambiarContraseña, reiniciarModal } = usePlataforma(); //Logica de negocio

  return (

    <div id="fondo">

      {/*SideBar*/}
      <nav id="navbar" class="navbar">

        <div id="imagen">

          <img id="logo" src={logo} alt="" />

        </div>

        <div id="menu">

          <p>Menu</p>

        </div>

        <div id="opciones">

          <button type="button" className="btn btn-success" onClick={redireccionarDiagnosticar} title="Iniciar diagnostico del paciente">
            <i class="fas fa-diagnoses"></i>
            Diagnosticar
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarPreguntas} title="Ver preguntas de diagnostico">
            <i class="fas fa-question"></i>
            Preguntas
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarSintomas} title="Ver reglas de diagnostico">
            <i class="fas fa-heartbeat"></i>
            Sintomas
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarTiposDepresion} title="Ver tipos de depresión">
            <i class="fas fa-notes-medical"></i>
            Tipos Depresión
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarDiccionario} title="Ver diccionario de terminos">
            <i class="fas fa-book"></i>
            Diccionario
          </button>

          <button type="button" className="btn btn-success" onClick={redireccionarDiagrama} title="Ver diagrama de flujo">
            <i class="fas fa-project-diagram"></i>
            Diagrama
          </button>

        </div>

      </nav>

      {/*Caja Menu superior*/}
      <div id="menuSuperior">

        {/*Contenedor botón inicio perfil*/}
        <div id="botonesSuperior" className="btn-group" role="group" >

          {/*Botón para agregar nuevo usuario*/}
          {componenteAdministrarUsuarios}

          <button id="inicio" type="button" className="btn btn-success" onClick={redireccionarDiagnosticar} title="Regresar a la pagina de inicio" >
            <i class="fas fa-home"></i>
            Inicio
          </button>

          <button id="cambioContraseña" type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalCambiarContraseña-Plataforma" title="Cambiar contraseña" >
            <i class="fas fa-key"></i>
            Cambio contraseña
          </button>

          <button id="salir" type="button" className="btn btn-success" onClick={redireccionarSalir} title="Cerrar sesión" >
            <i class="fas fa-sign-out-alt"></i>
            Salir
          </button>

        </div>

      </div>
      <form className="row" onSubmit={(e) => cambiarContraseña(e, datosGuardados, correo)}>
        <div class="modal fade" id="modalCambiarContraseña-Plataforma" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">

                <h5 class="modal-title" id="modalLabelCambiarContraseña-Plataforma">

                  <i class="fas fa-cog"></i>
                  <label >Cambiar Contraseña</label>

                </h5>

              </div>

              <div class="modal-body">

                <div id="labelNuevaContraseña-Plataforma">
                  <label id="labelNuevaContraseña-Plataforma">Ingrese la nueva contraseña</label>
                </div>

                <div className="input-group">

                  <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-key"></i></div>

                  <input id="" type="text" className="form-control" placeholder="Ingrese la nueva contraseña" value={datosGuardados.contraseña}
                    onKeyDown={verificarNumeros} onChange={handleInputChangeModificar} title="Nueva contraseña" name="contraseña" />


                </div>

                <br />

                <label id="labelRectificacionContraseña-Plataforma">Ingrese nuevamente la nueva contraseña</label>

                <div className="input-group">

                  <div className="input-group-text" id="btnGroupAddon"><i class="fas fa-key"></i></div>

                  <input id="" type="text" className="form-control" placeholder="Ingrese nuevamente la nueva contraseña" value={datosGuardados.Recontraseña}
                    onKeyDown={verificarNumeros} onChange={handleInputChangeModificar} title="Rectificación nueva contraseña" name="Recontraseña" />

                </div>

                <br />

              </div>
              <div class="modal-footer">

                <button type="button" id="botonModalCancelar-Plataforma" class="btn btn-secondary" data-bs-dismiss="modal" onClick={reiniciarModal} title="Cancelar">Cancelar</button>
                <button type="submit" id="botonModalModificar-Plataforma" class="btn btn-primary" title="Modificar contraseña">Modificar</button>

              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
}

export default Plataforma;
