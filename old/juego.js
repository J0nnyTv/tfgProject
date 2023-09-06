// Variables
const output = document.querySelector('#myDiv textarea');
const buttons = document.querySelector('#buttons');
const info = document.querySelector('#info');
const soundBtn = document.getElementById('soundBtn');

// Caracteres
const jugador = { nombre: "Jugador", salud: 50, ataque: 10, defensa: 5, escudo: false };
const enemigo = { nombre: "Goblin", salud: 20, ataque: 8, defensa: 3, escudo: false, image: 'media/img/goblin.jpg' };

// Dado
const rollButton = document.getElementById('roll-button');
const dice = document.getElementById('dice');

rollButton.addEventListener('click', function() {
  // Remove any previous shake class
  dice.classList.remove('shake');

  // Wait for a short time to allow the removal of the shake class to take effect
  setTimeout(function() {
    // Add the shake class to trigger the animation
    dice.classList.add('shake');

    // Wait for the animation to finish before setting the new dice value
    setTimeout(function() {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      switch (diceValue) {
        case 1:
          dice.innerText = "\u2680";
          break;
        case 2:
          dice.innerText = "\u2681";
          break;
        case 3:
          dice.innerText = "\u2682";
          break;
        case 4:
          dice.innerText = "\u2683";
          break;
        case 5:
          dice.innerText = "\u2684";
          break;
        case 6:
          dice.innerText = "\u2685";
          break;
        default:
          dice.innerText = "\u2686";
          break;
      }
      dice.style.color = 'black';
    }, 800);
  }, 10);
});


// Musica
const music = new Audio('https://drive.google.com/uc?export=download&id=1Y0z1UDp01i7PYA_T1d00g9_s9-uJJu5c');
music.loop = true;
const playPauseBtn = document.querySelector('#playPauseBtn');

playPauseBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    soundBtn.src = 'media/img/volume-high-solid.png';
  } else {
    music.pause();
    soundBtn.src = 'media/img/volume-off-solid.png';
  }
});

// Informacion
function createImage(ruta) {
  const img = document.createElement('img');
  img.classList.add('img_info');
  img.src = ruta;
  const info = document.getElementById('info');
  info.appendChild(img);
}

function createCharacteristics(name,life,attack,defense, escudo) {
  const characteristics = document.createElement('ul');
  const nameItem = document.createElement('li');
  nameItem.classList.add('name');
  const lifeItem = document.createElement('li');
  lifeItem.classList.add('life');
  const attackItem = document.createElement('li');
  attackItem.classList.add('attack');
  const defenseItem = document.createElement('li');
  defenseItem.classList.add('defense');
  const escudoItem = document.createElement('li');
  escudoItem.classList.add('shield');
  
  nameItem.textContent = name;
  lifeItem.textContent = 'Vida: ' + life;
  attackItem.textContent = 'Ataque: ' + attack;
  defenseItem.textContent = 'Defensa: ' + defense;
  escudoItem.textContent = 'Escudo: ' + escudo;
  
  characteristics.appendChild(nameItem);
  characteristics.appendChild(lifeItem);
  characteristics.appendChild(attackItem);
  characteristics.appendChild(defenseItem);
  characteristics.appendChild(escudoItem);
  
  const charContainer = document.createElement('div');
  charContainer.classList.add('characteristics');
  charContainer.appendChild(characteristics);
  
  info.appendChild(charContainer);
}

function updateCharacteristics(name, life, attack, defense, shield) {
  const characteristics = document.querySelector('.characteristics');
  const nameElement = characteristics.querySelector('.name');
  const lifeElement = characteristics.querySelector('.life');
  const attackElement = characteristics.querySelector('.attack');
  const defenseElement = characteristics.querySelector('.defense');
  const shieldElement = characteristics.querySelector('.shield');

  nameElement.textContent = name;
  lifeElement.textContent = `Vida: ${life}`;
  attackElement.textContent = `Ataque: ${attack}`;
  defenseElement.textContent = `Defensa: ${defense}`;
  shieldElement.textContent = `Escudo: ${shield}`;
}

//Botones
function createButton(id, context, accion) {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = id;
  button.textContent = context;
  buttons.appendChild(button);
  button.addEventListener('click', accion);
}

function quitarBotones() {
    const buttons = document.querySelector('#buttons');
    while (buttons.firstChild) {
      buttons.removeChild(buttons.firstChild);
    }
  }

//Combate
const opciones = [
  {
    texto: "Atacar",
    ataque: true,
    accion: function() {
      atacar(jugador, enemigo);
      enemigo_decision(enemigo, jugador);
      updateCharacteristics(enemigo.nombre,enemigo.salud,enemigo.ataque,enemigo.defensa,enemigo.escudo);
    }
  },
  {
    texto: "Defender",
    defensa: true,
    accion: function() {
      defender(jugador);
      enemigo_decision(enemigo, jugador);
      updateCharacteristics(enemigo.nombre,enemigo.salud,enemigo.ataque,enemigo.defensa,enemigo.escudo);
    }
  }
];

function enemigo_decision(enemigo, jugador){
  if (enemigo.salud > 0) {
    const rand = Math.random();
    if (rand < 0.6) {
      mostrarTexto(`El ${enemigo.nombre} ataca...`);
      atacar(enemigo, jugador);
    } else {
      mostrarTexto(`El ${enemigo.nombre} defiende...`);
      defender(enemigo);
    }
  }
}

function atacar(atacante, defensor) {
  let danio = atacante.ataque - defensor.defensa;
  if (danio < 0) danio = 0;
  defensor.salud -= danio;
  escudo(defensor);
  mostrarTexto(`${atacante.nombre} inflige ${danio} puntos de daño.`);
  if (defensor.salud <= 0) {
    mostrarTexto(`${defensor.nombre} ha sido derrotado.`);
    // Código que se ejecuta cuando se derrota a un enemigo
    if (defensor.nombre == jugador.nombre){
        mostrarTexto("🅗🅐🅢 🅟🅔🅡🅓🅘🅓🅞 :(");
    }
    else{
        mostrarTexto("𝕰𝖓𝖍𝖔𝖗𝖆𝖇𝖚𝖊𝖓𝖆❗❗");
    }
    quitarBotones();
    window.location.href = './index.html';
  }
}

function defender(defensor) {
  defensor.defensa += 3;
  defensor.escudo = true;
  mostrarTexto(`${defensor.nombre} se ha preparado para defender.`);
}

function escudo(defensor){
  if (defensor.escudo){
    defensor.escudo = false;
    defensor.defensa -= 3;
  }
}

// Gestion del juego
const escena = {
  titulo: "🅱🅰🆃🅰🅻🅻🅰",
  texto: `Estás en una batalla contra un ${enemigo.nombre}. ¿Qué acción deseas tomar?`,
  opciones,
  accion: function() {
    createButton('atacar', 'Atacar', function() {
      opciones[0].accion();
    });
    createButton('defender', 'Defender', function() {
      opciones[1].accion();
    });
    createImage(enemigo.image);
    createCharacteristics(enemigo.nombre,enemigo.salud,enemigo.ataque,enemigo.defensa,enemigo.escudo);
  }
};

const juego = { escenas: { 1: escena }, escenaActual: 1 };

function mostrarEscena() {
  const escenaActual = juego.escenas[juego.escenaActual];
  output.value += `${escenaActual.titulo}\n${escenaActual.texto}\n`;
  escenaActual.accion();
}

function mostrarTexto(texto) {
  output.value += texto + "\n";
  output.scrollTop = output.scrollHeight;
}

function jugar(indice) {
  const escenaActual = juego.escenas[juego.escenaActual];
  const opcionElegida = escenaActual.opciones[indice];
  opcionElegida.accion(output);
  mostrarEscena(output);
}

// Obtener la ventana modal
var modal = document.getElementById("myModal");

// Obtener el botón "Cerrar" de la ventana modal
var close = document.getElementsByClassName("close")[0];

modal.style.display = "block"; //Muestra la ventana Modal

// Cuando se hace clic en el botón "Cerrar", ocultar la ventana modal
close.onclick = function() {
  modal.style.display = "none";
}

// Si el usuario hace clic fuera de la ventana modal, ocultarla también
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Inicio
mostrarEscena();