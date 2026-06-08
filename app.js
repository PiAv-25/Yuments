// =======================
// CLASE USUARIO
// =======================

class Usuario {
  constructor() {
    this.nombre = "";
    this.correo = "";
    this.estaLogueado = false;
  }

  registrar(nombre, correo) {
    this.nombre = nombre;
    this.correo = correo;

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
  }

  login(correoIngresado) {
    let correoGuardado = localStorage.getItem("correo");

    if (correoIngresado === correoGuardado) {
      this.estaLogueado = true;
      this.nombre = localStorage.getItem("nombre");
      this.correo = correoGuardado;

      localStorage.setItem("logueado", "true");

      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.estaLogueado = false;

    localStorage.removeItem("logueado");
    localStorage.removeItem("misEventos");
  }
}

// crear usuario
let usuario = new Usuario();


// =======================
// DATOS
// =======================

let misEventos = JSON.parse(localStorage.getItem("misEventos")) || [];


// =======================
// ELEMENTOS
// =======================

let seccionInicio = document.getElementById("inicio");
let seccionEventos = document.getElementById("eventos");
let seccionMisEventos = document.getElementById("misEventos");

let btnEventos = document.getElementById("btnEventos");
let btnMisEventos = document.getElementById("btnIreventos");

let auth = document.getElementById("auth");
let perfil = document.getElementById("perfil");

let nombreUsuario = document.getElementById("nombreUsuario");
let correoUsuario = document.getElementById("correoUsuario");

let btnCerrar = document.getElementById("btnCerrar");

let btnPerfil = document.getElementById("btnPerfil");
let menuPerfil = document.getElementById("menuPerfil");


// =======================
// ABRIR MODALES
// =======================

let btnLogin = document.getElementById("btnLogin");
let btnRegistro = document.getElementById("btnRegistro");

let modalLogin = document.getElementById("modalLogin");
let modalRegistro = document.getElementById("modalRegistro");

btnLogin.addEventListener("click", () => {
  modalLogin.style.display = "flex";   //
});

btnRegistro.addEventListener("click", () => {
  modalRegistro.style.display = "flex"; //
});


// =======================
// CERRAR MODALES
// =======================

document.querySelectorAll(".cerrar").forEach(boton => {
  boton.addEventListener("click", () => {
    modalLogin.style.display = "none";
    modalRegistro.style.display = "none";
  });
});

// =======================
// CAMBIAR ENTRE MODALES
// =======================

document.querySelector(".irLogin").addEventListener("click", () => {
  modalRegistro.style.display = "none";
  modalLogin.style.display = "flex";
});

document.querySelector(".irRegistro").addEventListener("click", () => {
  modalLogin.style.display = "none";
  modalRegistro.style.display = "flex";
});

// =======================
// LOGO → VOLVER A INICIO (solo si NO logueado)
// =======================

let logo = document.querySelector(".logo");

logo.addEventListener("click", () => {

  if (!usuario.estaLogueado) {
    seccionInicio.style.display = "block";
    seccionEventos.style.display = "none";
    seccionMisEventos.style.display = "none";
  }

});


// =======================
// NAVEGACIÓN
// =======================

btnEventos.addEventListener("click", () => {
  seccionEventos.style.display = "block";
  seccionInicio.style.display = "none";
  seccionMisEventos.style.display = "none";
});

btnMisEventos.addEventListener("click", () => {
  seccionMisEventos.style.display = "block";
  seccionEventos.style.display = "none";
  seccionInicio.style.display = "none";
});


// =======================
// CARDS (ABRIR / CERRAR)
// =======================

// ABRIR
document.querySelectorAll(".btnabrir").forEach(boton => {

  boton.addEventListener("click", () => {

    let card = boton.closest(".card");
    let detalle = card.querySelector(".detalle");
    let footer = card.querySelector(".footer-card");

    detalle.style.display = "block";
    footer.style.display = "none";

  });

});

// CERRAR
document.querySelectorAll(".btncerrar").forEach(boton => {

  boton.addEventListener("click", () => {

    let card = boton.closest(".card");
    let detalle = card.querySelector(".detalle");
    let footer = card.querySelector(".footer-card");

    detalle.style.display = "none";
    footer.style.display = "flex";

  });

});


// =======================
// CATEGORÍAS
// =======================

let btnCategorias = document.getElementById("btnCategorias");
let menuCategorias = document.getElementById("menuCategorias");

btnCategorias.addEventListener("click", () => {

  menuCategorias.style.display =
    (menuCategorias.style.display === "none") ? "block" : "none";

});

let opcionesCategorias = document.querySelectorAll("#menuCategorias p");
let cards = document.querySelectorAll("#eventos .card");

opcionesCategorias.forEach(opcion => {

  opcion.addEventListener("click", () => {

    let categoriaSeleccionada = opcion.getAttribute("data-categoria");

    cards.forEach(card => {

      let categoriaCard = card.getAttribute("data-categoria");

      card.style.display =
        (categoriaCard === categoriaSeleccionada) ? "block" : "none";

    });

    menuCategorias.style.display = "none";

  });

});
``

// =======================
// BUSCADOR
// =======================

let buscador = document.getElementById("buscador");
let mensajeBusqueda = document.getElementById("mensajeBusqueda");

buscador.addEventListener("input", () => {

  let texto = buscador.value.toLowerCase();
  let hayResultados = false;

  cards.forEach(card => {

    let contenido = card.textContent.toLowerCase();

    if (contenido.includes(texto)) {
      card.style.display = "block";
      hayResultados = true;
    } else {
      card.style.display = "none";
    }

  });

  mensajeBusqueda.style.display = hayResultados ? "none" : "block";

});


// =======================
// PERFIL (MENU)
// =======================

btnPerfil.addEventListener("click", () => {
  menuPerfil.style.display =
    (menuPerfil.style.display === "none") ? "block" : "none";
});


// =======================
// LOGIN
// =======================

let inputsLogin = document.querySelectorAll("#modalLogin input");

document.getElementById("btnLoginModal").addEventListener("click", () => {

  let correoIngresado = inputsLogin[0].value;

  if (usuario.login(correoIngresado)) {

    nombreUsuario.textContent = usuario.nombre;
    correoUsuario.textContent = usuario.correo;

    btnPerfil.textContent = usuario.nombre;

    auth.style.display = "none";
    perfil.style.display = "block";

    seccionInicio.style.display = "none";
    seccionEventos.style.display = "block";

    document.getElementById("modalLogin").style.display = "none";

  } else {
    alert("Correo incorrecto");
  }

});


// =======================
// MANTENER SESIÓN
// =======================

if (localStorage.getItem("logueado") === "true") {

  usuario.estaLogueado = true;
  usuario.nombre = localStorage.getItem("nombre");
  usuario.correo = localStorage.getItem("correo");

  nombreUsuario.textContent = usuario.nombre;
  correoUsuario.textContent = usuario.correo;

  btnPerfil.textContent = usuario.nombre;

  auth.style.display = "none";
  perfil.style.display = "block";

  //-
  seccionInicio.style.display = "none";
  seccionEventos.style.display = "block";
  seccionMisEventos.style.display = "none";

}


// =======================
// LOGOUT
// =======================

btnCerrar.addEventListener("click", () => {

  usuario.logout();

  perfil.style.display = "none";
  auth.style.display = "block";

  seccionInicio.style.display = "block";
  seccionEventos.style.display = "none";
  seccionMisEventos.style.display = "none";

  misEventos = [];

  mostrarMisEventos();
});


// =======================
// INSCRIPCIÓN
// =======================
document.querySelectorAll(".btnInscribirse").forEach(boton => {

  boton.addEventListener("click", () => {

    if (!usuario.estaLogueado) {
      document.getElementById("modalLogin").style.display = "flex";
    } else {

      let card = boton.closest(".card");

      let titulo = card.querySelector("h3").textContent;
      let fecha = card.querySelector(".fecha").textContent.trim();
      let imagen = card.querySelector("img").src;
      let hora = card.querySelector(".info-detalle p:last-child")
        .textContent.replace("Hora:", "").trim();

      let yaExiste = misEventos.some(e => e.titulo === titulo);

      if (!yaExiste) {

        misEventos.push({
            titulo,
            fecha,
            hora,
            imagen
        });

        localStorage.setItem("misEventos", JSON.stringify(misEventos));

        boton.textContent = "Inscrito";
        boton.disabled = true;

        mostrarMisEventos();


        }
    }

  });

});

document.querySelectorAll(".btnInscribirse").forEach(boton => {

  let card = boton.closest(".card");
  let titulo = card.querySelector("h3").textContent;

  let yaExiste = misEventos.some(e => e.titulo === titulo);

  if (yaExiste) {
    boton.textContent = "Inscrito";
    boton.disabled = true;
  }

});

// =======================
// MOSTRAR MIS EVENTOS
// =======================

function mostrarMisEventos() {

  let lista = document.getElementById("listaMisEventos");

  lista.innerHTML = "";

  if (misEventos.length === 0) {
    lista.innerHTML = '<p id="mensajeVacio">No tienes eventos inscritos</p>';
    return;
  }

  misEventos.forEach((evento, index) => {

    lista.innerHTML += `
      <div class="evento-item">

        <img src="${evento.imagen}" alt="evento">

        <div class="info-evento">
          <h4>${evento.titulo}</h4>
          <p><span class="label">FECHA:</span> ${evento.fecha}</p>
          <p><span class="label">HORA:</span> ${evento.hora}</p>
        </div>

        <button class="btnCancelar" data-index="${index}">
          CANCELAR
        </button>

      </div>
    `;
  });

  document.querySelectorAll(".btnCancelar").forEach(boton => {

    boton.addEventListener("click", () => {

      let index = boton.getAttribute("data-index");

      misEventos.splice(index, 1);

      localStorage.setItem("misEventos", JSON.stringify(misEventos));

      mostrarMisEventos();
    });

  });

}


// =======================
// INICIAR DATOS
// =======================

mostrarMisEventos();