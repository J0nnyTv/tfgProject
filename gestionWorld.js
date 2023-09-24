// Variables
var time = 0;
var exp = 0;
var final = 0;
var historia = "";
var barco = false;
var anterior_casilla = [0,0];
var longitud = 15;
var tesoro = [0,0];
var velocidad_texto = 25;
var vendedores = [comercio_prado_2, comercio_bosque, comercio_playa, comercio_montaña];
const inicio = document.getElementById("inicio");
const playerName = document.getElementById("playerName");
const contenedor = document.getElementById("contenedor");
const imagen = document.getElementById("imagen");
const map = document.getElementById("map");
const bag = document.getElementById("keep");
const buttons = document.querySelector('#buttons');
const output = document.querySelector('#textarea');
const contenedorMatriz = document.getElementById('contenedor-matriz');
const contenedorInventario = document.getElementById('contenedor-inventario');
var ajustes = document.getElementById("myAjustes");
const contenedorRosa = document.getElementById('rose-of-winds');
const soundBtn = document.getElementById('soundBtn');
const jugador = { nombre: "Jugador", x: 0, y: 0,  inventario: [], vida: 50, vida_max: 50, energia: 20, energia_max: 20, ataque: 10, defensa: 10, velocidad: 10, dinero: 20};
const world = [];

// Musica
const music = new Audio('https://acortar.link/x12z9v');
music.loop = true;
const playPauseBtn = document.querySelector('#playPauseBtn');

playPauseBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    playPauseBtn.src = "./media/img/volume-high-solid.png";
  } else {
    music.pause();
    playPauseBtn.src = "./media/img/volume-off-solid.png";
  }
});

// Gestión Jugador
jugador.agregarAlInventario = function(objeto, cantidad) {
  var encontrado = false;
  if (this.inventario.length != 0){
    for (let i = 0; i < this.inventario.length; i++) {
      if (this.inventario[i].name == objeto.name){
        this.inventario[i].cantidad += cantidad;
        encontrado = true;
      }
    }
    if (!(encontrado)){
      objeto.cantidad = cantidad;
      this.inventario.push(objeto);
    }
  }
  else{
    objeto.cantidad = cantidad;
    this.inventario.push(objeto);
  } 
};

jugador.quitarAlInventario = function(objeto, cantidad) {
  if (typeof cantidad === "undefined"){cantidad = 1;};
  var itemEncontrado = this.inventario.find(function(item) {
    return item.name == objeto;
  });
  if (itemEncontrado) {
    itemEncontrado.cantidad -= cantidad;
    if(itemEncontrado.cantidad <= 0){
      this.inventario.splice(this.inventario.indexOf(itemEncontrado), 1);
    }
  }
};

jugador.lista_inventario = function() {
  contenedorInventario.innerHTML = "";
  const inventarioList = document.createElement("ul");
  const objetoLi = document.createElement("li");
  objetoLi.textContent = "Inventario:";
  inventarioList.appendChild(objetoLi);

  if (this.inventario.length != 0){
    for (let i = 0; i < this.inventario.length; i++) {
      const objetoLi = document.createElement("li");
      const button = document.createElement("button_li");
      objetoLi.textContent = `${this.inventario[i].name} x${this.inventario[i].cantidad}: ${this.inventario[i].desc}`;
      button.textContent = this.inventario[i].tag_inventario;
      button.addEventListener("click", this.inventario[i].function);
      objetoLi.appendChild(button);
      inventarioList.appendChild(objetoLi);
    }
  }else{
    const objetoLi = document.createElement("li");
    objetoLi.textContent = `¡Tienes el inventario vacío!`;
    inventarioList.appendChild(objetoLi);
  }

  contenedorInventario.appendChild(inventarioList);
}

jugador.inventarioContiene = function(objeto) {
  let contiene = false;
  for (let i = 0; i < this.inventario.length; i++) {
    if (this.inventario[i].name == objeto){
      contiene = true;
    }
  }
  return contiene;
}

// Comercio

function lista_inventario_comerciante(comerciante) {
  contenedorInventario.innerHTML = "";
  const inventarioList = document.createElement("ul");
  const objetoLi = document.createElement("li");
  const monedas = document.createElement("li");
  objetoLi.textContent = comerciante.cabezal;
  inventarioList.appendChild(objetoLi);
  monedas.textContent = "Monedas: " + jugador.dinero;
  inventarioList.appendChild(monedas);

  if (comerciante.inventario.length != 0){
    for (let i = 0; i < comerciante.inventario.length; i++) {
      const objetoLi = document.createElement("li");
      const button = document.createElement("button_li");
      objetoLi.textContent = `${comerciante.inventario[i].name} x${comerciante.inventario[i].cantidad}: ${comerciante.inventario[i].desc} Precio: ${comerciante.inventario[i].precio} monedas`;
      button.textContent = "Comprar";
      button.addEventListener("click", () => {
        if(jugador.dinero >= comerciante.inventario[i].precio){
          asignar_objeto(comerciante.inventario[i].name);
          jugador.dinero -= comerciante.inventario[i].precio;
          quitarAlInventario_comerciante(comerciante.inventario[i].name,1,comerciante);
          lista_inventario_comerciante(comerciante);
        }else{
          mostrarTexto("No tienes dinero suficiente para comprar " + comerciante.inventario[i].name);
        }
      });
      objetoLi.appendChild(button);
      inventarioList.appendChild(objetoLi);
    }
  }else if(comerciante.inventario.length == 1){
    const objetoLi = document.createElement("li");
    const button = document.createElement("button_li");
    objetoLi.textContent = `${comerciante.inventario[i].name} x${comerciante.inventario[i].cantidad}: ${comerciante.inventario[i].desc} Precio: ${comerciante.inventario[i].precio} monedas`;
    button.textContent = "Comprar";
    button.addEventListener("click", () => {
      if(jugador.dinero >= comerciante.inventario[i].precio){
        asignar_objeto(comerciante.inventario[i].name);
        jugador.dinero -= comerciante.inventario[i].precio;
        quitarAlInventario_comerciante(comerciante.inventario[i].name,1,comerciante);
        lista_inventario_comerciante(comerciante);
        mostrarTexto(comerciante.finInventario[1]);
      }else{
        mostrarTexto("No tienes dinero suficiente para comprar " + comerciante.inventario[i].name);
      }
    });
    objetoLi.appendChild(button);
    inventarioList.appendChild(objetoLi);
  }
  else{
    const objetoLi = document.createElement("li");
    objetoLi.textContent = comerciante.finInventario[0];
    inventarioList.appendChild(objetoLi);
  }

  contenedorInventario.appendChild(inventarioList);
  inventario.style.display = "block";
}

function quitarAlInventario_comerciante(objeto, cantidad, comerciante) {
  if (typeof cantidad === "undefined"){cantidad = 1;};
  var itemEncontrado = comerciante.inventario.find(function(item) {
    return item.name == objeto;
  });
  if (itemEncontrado) {
    itemEncontrado.cantidad -= cantidad;
    if(itemEncontrado.cantidad <= 0){
      comerciante.inventario.splice(comerciante.inventario.indexOf(itemEncontrado), 1);
    }
  }
};

// Mostrar Texto
function mostrarTexto(texto) {
  buttons.style.pointerEvents = "none";
  contenedorRosa.style.pointerEvents = "none";
  historia += texto;
  output.scrollTop = output.scrollHeight;
  let arrFromStr = texto.split('');
  let i = 0;
  setTimeout(() => {
    let printStr = setInterval(function(){
      output.value += arrFromStr[i];
      i++;
      if (i === arrFromStr.length) { 
        clearInterval(printStr);
        output.value +="\n";
        output.scrollTop = output.scrollHeight;
        time -= velocidad_texto * arrFromStr.length;
        if (time <= 0){
          buttons.style.pointerEvents = "auto";
          contenedorRosa.style.pointerEvents = "auto";
        }
      }
    },velocidad_texto);
  }, time);
  time += velocidad_texto * arrFromStr.length;
  }

//Botones de acción
function createButton(clase, context, accion) {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add(clase);
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

// Mapear
function mapear(){
  let continuacion = true;
  if (typeof world[jugador.x][jugador.y].bioma === "undefined") {
    world[jugador.x][jugador.y].bioma = generarCasilla(jugador.x, jugador.y, world);
    world[jugador.x][jugador.y].evento = new Evento;
    world[jugador.x][jugador.y].evento.generar_evento(world[jugador.x][jugador.y].bioma);
    world[jugador.x][jugador.y].evento.generar_desc(world[jugador.x][jugador.y].bioma);
    if(encontrado_tesoro(world[jugador.x][jugador.y],tesoro)){
      final = 1;
    };
  }
  if (world[jugador.x][jugador.y].bioma.nombre == "Mar" && !barco){
    mostrarTexto("¡No puedes moverte por el océano sin una barca!");
    moverse(jugador, 5, world);
    continuacion = false;
  }
  return continuacion;
}

function mapearXY(x,y,bioma){
  if (typeof world[x][y].bioma === "undefined") {
    world[x][y].bioma = bioma;
    world[x][y].evento = new Evento;
    world[x][y].evento.generar_evento(world[x][y].bioma);
    world[x][y].evento.generar_desc(world[x][y].bioma);
  }
}

// Moverse
function moverse(jugador, dir, world, camina){
  if (typeof camina === "undefined"){camina = true;};
  if (jugador.energia > 0){
    var avance = 1;
    switch (dir) {
      // Oeste
      case 1:
        if (jugador.y-1 >= 1){
          anterior_casilla[0] = jugador.x;
          anterior_casilla[1] = jugador.y;
          jugador.y -= 1;
        }
        else{
          mostrarTexto("ℕ𝕠 𝕥𝕖 𝕡𝕦𝕖𝕕𝕖𝕤 𝕞𝕠𝕧𝕖𝕣 𝕞𝕒𝕤 𝕙𝕒𝕔𝕚𝕒 𝕖𝕝 𝕠𝕖𝕤𝕥𝕖");
          avance = 3;
        }
        break;
      // Este
      case 2:
        if (jugador.y+1 < world.length-1){
          anterior_casilla[0] = jugador.x;
          anterior_casilla[1] = jugador.y;
          jugador.y += 1;
        }
        else{
          mostrarTexto("ℕ𝕠 𝕥𝕖 𝕡𝕦𝕖𝕕𝕖𝕤 𝕞𝕠𝕧𝕖𝕣 𝕞𝕒𝕤 𝕙𝕒𝕔𝕚𝕒 𝕖𝕝 𝕖𝕤𝕥𝕖");
          avance = 3;
        }
        break;
      // Sud
      case 3:
        if (jugador.x+1 < world.length-1){
          anterior_casilla[0] = jugador.x;
          anterior_casilla[1] = jugador.y;
          jugador.x += 1;
        }
        else{
          mostrarTexto("ℕ𝕠 𝕥𝕖 𝕡𝕦𝕖𝕕𝕖𝕤 𝕞𝕠𝕧𝕖𝕣 𝕞𝕒𝕤 𝕙𝕒𝕔𝕚𝕒 𝕖𝕝 𝕤𝕦𝕕");
          avance = 3;
        }
        break;
      // Norte
      case 4:
        if (jugador.x-1 >= 1){
          anterior_casilla[0] = jugador.x;
          anterior_casilla[1] = jugador.y;
          jugador.x -= 1;
        }
        else{
          mostrarTexto("ℕ𝕠 𝕥𝕖 𝕡𝕦𝕖𝕕𝕖𝕤 𝕞𝕠𝕧𝕖𝕣 𝕞𝕒𝕤 𝕙𝕒𝕔𝕚𝕒 𝕖𝕝 𝕟𝕠𝕣𝕥𝕖");
          avance = 3;
        }
        break;
      // Atrás
      case 5:
        mostrarTexto("Vuelves a la zona anterior...");
        camina = false;
        jugador.x = anterior_casilla[0];
        jugador.y = anterior_casilla[1];
        imagen.src = world[jugador.x][jugador.y].bioma.img[final];
        dibujar();
        break;
      // ¿?
      default:
        mostrarTexto("El jugador se ha teletransportado.");
        anterior_casilla[0] = jugador.x;
        anterior_casilla[1] = jugador.y;
        jugador.x = dir[0];
        jugador.y = dir[1];
        camina = false;
        mapear();
        actualizar_text(jugador, world, avance);
        final == 1 ?  accion_menu_f() : accion_menu();
        dibujar();
        break;
    }
    if (camina){
      if(mapear()){
        jugador.energia -= 1;
        exp+=Math.floor(Math.random()*2);
        actualizar_text(jugador, world, avance);
        final == 1 ?  finDelJuego() : accion_menu();
      }
      dibujar();
    };
    console.log(`x: ${jugador.x}, y: ${jugador.y}`);
  }
  else {
    mostrarTexto("Se te ha agotado la energía, no te puedes mover...");
    if(dir == 5){
      camina = false;
      jugador.x = anterior_casilla[0];
      jugador.y = anterior_casilla[1];
      imagen.src = world[jugador.x][jugador.y].bioma.img[final];
      dibujar();
    }
    finDelJuego();
  }
}

// Dialogo e imagenes
function actualizar_text(jugador, world, opcion){
  switch (opcion) {
    case 1:
      mostrarTexto(world[jugador.x][jugador.y].bioma.desc[final]);
      if (!world[jugador.x][jugador.y].bioma.lexica[1]){
        world[jugador.x][jugador.y].bioma.lexica[1] = true;
        if (world[jugador.x][jugador.y].bioma.lexica[0] != null){
          world[jugador.x][jugador.y].bioma.img[0] = world[jugador.x][jugador.y].bioma.lexica[0][Math.floor(Math.random() * world[jugador.x][jugador.y].bioma.lexica[0].length)].src;
        }
      }
      imagen.src = world[jugador.x][jugador.y].bioma.img[final];
      break;
    case 2:
      mostrarTexto(world[jugador.x][jugador.y].evento.evento_desc[world[jugador.x][jugador.y].evento.evento]);
      world[jugador.x][jugador.y].evento.evento_desc[3]();
      world[jugador.x][jugador.y].evento.evento = 1;
      break;
    case 3:
      mostrarTexto(world[jugador.x][jugador.y].bioma.border);
      break;
  }
}

// Asignar Objetos

function asignar_objeto(nombre){
  for (let i = 0; i < all_objects.length; i++) {
    if (all_objects[i].name == nombre){
      jugador.agregarAlInventario(all_objects[i],1);
      mostrarTexto(`¡Has conseguido ${all_objects[i].name}!`);
    }
  }
  bag.src = "./media/img/bagn.png";
}

function asignar_objeto_valor(max){
  let objetos = [];
  for (let i = 0; i < all_objects.length; i++) {
    if (all_objects[i].bioma == world[jugador.x][jugador.y].bioma.nombre && all_objects[i].precio < max){
      objetos.push(all_objects[i]);
    }
  }
  if (objetos.length != 0){
    let azar = Math.floor(Math.random() * objetos.length);
    mostrarTexto(`¡Has conseguido ${objetos[azar].name}!`);
    jugador.agregarAlInventario(objetos[azar],1);
  }else{
    console.log("No hay objeto ;p");
  }
  bag.src = "./media/img/bagn.png";
}

function asignar_objeto_valor_min(min,bioma){
  let objetos = [];
  if (typeof bioma === "undefined"){
    bioma = world[jugador.x][jugador.y].bioma.nombre;
    for (let i = 0; i < all_objects.length; i++) {
      if (all_objects[i].bioma == bioma && all_objects[i].precio >= min){
        objetos.push(all_objects[i]);
      }
    }
  }
  else{
    for (let j = 0; j < bioma.length; j++){
      for (let i = 0; i < all_objects.length; i++) {
        if (all_objects[i].bioma == bioma[j] && all_objects[i].precio < min){
          objetos.push(all_objects[i]);
        }
      }
    }
  }
  if (objetos.length != 0){
    let azar = Math.floor(Math.random() * objetos.length);
    mostrarTexto(`¡Has conseguido ${objetos[azar].name}!`);
    jugador.agregarAlInventario(objetos[azar],1);
  }else{
    console.log("No hay objeto ;p");
  }
  bag.src = "./media/img/bagn.png";
}

function asignar_objeto_biomas(max,biomas){
  let objetos = [];
  for (let j = 0; j < biomas.length; j++){
    for (let i = 0; i < all_objects.length; i++) {
      if (all_objects[i].bioma == biomas[j] && all_objects[i].precio < max){
        objetos.push(all_objects[i]);
      }
    }
  }
  if (objetos.length != 0){
    let azar = Math.floor(Math.random() * objetos.length);
    mostrarTexto(`¡Has conseguido ${objetos[azar].name}!`);
    jugador.agregarAlInventario(objetos[azar],1);
  }else{
    console.log("No hay objeto ;p");
  }
  bag.src = "./media/img/bagn.png";
}

function asignar_objeto_valor_all(max){
  let objetos = [];
  for (let i = 0; i < all_objects.length; i++) {
    if (all_objects[i].precio < max){
      objetos.push(all_objects[i]);
    }
  }
  if (objetos.length != 0){
    let azar = Math.floor(Math.random() * objetos.length);
    mostrarTexto(`¡Has conseguido ${objetos[azar].name}!`);
    jugador.agregarAlInventario(objetos[azar],1);
  }else{
    console.log("No hay objeto ;p");
  }
  bag.src = "./media/img/bagn.png";
}

//Ocultar / No Ocultar
function noShow(){
  contenedor.style.display = "none";
  output.style.display = "none";
  //buttons.style.display = "none";
  contenedorRosa.style.display = "none";
  bag.style.display = "none";
  map.style.display = "none";
  player.style.display = "none";
  inicio.style.display = "block";
}

function Show(){
  inicio.style.display = "none";
  contenedor.style.display = "flex";
  output.style.display = "flex";
  //buttons.style.display = "initial";
  contenedorRosa.style.display = "flex";
  bag.style.display = "block";
  map.style.display = "block";
  player.style.display = "block";
}

// Comienzo de juego
function play_game(){
  Show();
  tesoro = generarTesoro(longitud);
  if(playerName.value !== ""){
    jugador.nombre = playerName.value;
  }else{
    jugador.nombre = "Aventurero";
  }
  generarWorld(world, longitud);
  jugador.x = Math.floor(world.length/2);
  jugador.y = jugador.x;
  anterior_casilla[0] = jugador.x;
  anterior_casilla[1] = jugador.y;
  mapear();
  dibujar();
  accion_menu();
  actualizar_text(jugador, world, 1);
}

// Menu de accion
function accion_menu(){
  quitarBotones();
  createButton('explorar', 'Explorar', function() {explorar_menu();});
  contenedorRosa.style.display = "block";
  if (world[jugador.x][jugador.y].bioma.nombre == "Poblado"){
    createButton('descansar', 'Descansar en la posada', function() {
      quitarBotones();
      contenedorRosa.style.display = "none";
      mostrarTexto("Te diriges a la posada del pueblo, descansar y recuperar toda tu salud y energía cuesta 20 monedas.");
      mostrarTexto("¿Quieres descansar?");
      createButton('si', 'Si', function() {
        if(jugador.dinero >= 20){
          jugador.dinero -= 20;
          jugador.energia = jugador.energia_max;
          jugador.vida = jugador.vida_max;
          mostrarTexto("¡Has descansado en la posada, estas lleno de vitalidad!");
        }else{
          mostrarTexto("Lo siento, pero no tienes suficientes monedas...");
        }
        accion_menu();
      });
      createButton('no', 'No', function() {accion_menu();});
    });

    if (vendedores.length > 0 || world[jugador.x][jugador.y].bioma.tienda != null){
      createButton('tienda', 'Visitar la tienda', function() {
        quitarBotones();
        contenedorRosa.style.display = "none";
        if(world[jugador.x][jugador.y].bioma.tienda == null){
          world[jugador.x][jugador.y].bioma.tienda = asignar_venta();
        }
        var comerciante = world[jugador.x][jugador.y].bioma.tienda;
        imagen.src = comerciante.src;
        mostrarTexto(comerciante.nombre +": "+ comerciante.hola);
        createButton('tienda', 'Tienda', function() {
          lista_inventario_comerciante(comerciante);
        });
        createButton('hablar', 'Hablar', function() {
          mostrarTexto(comerciante.nombre + ": " +comerciante.frases[Math.floor(Math.random() * comerciante.frases.length)]);
        });
        createButton('atras', 'Atrás', function() {
          mostrarTexto(comerciante.nombre +": " + comerciante.adios);
          imagen.src = world[jugador.x][jugador.y].bioma.img[0];
          accion_menu();
        });
      });
    }
  }
  
  if (world[jugador.x][jugador.y].bioma.nombre == "Mar" || world[jugador.x][jugador.y].bioma.nombre == "Playa"){
    createButton('pescar', 'Pescar', function() {
      if(jugador.energia > 0){
        mostrarTexto("Has gastado un punto de energía en pescar...");
        jugador.energia -= 1;
        if(Math.floor(Math.random() * 100) > 80){
          for(let i = 0; i < Math.floor(Math.random() * 2); i++){
            asignar_objeto_biomas(500,["Playa","Mar"]);
          }
          asignar_objeto_valor_all(999);
        }
      }else{
        mostrarTexto("No te queda energía para pescar.");
      }
    });  
  }
}

// Menu de moverse
function moverse_menu(direccion){
  if (final == 0){
    switch (direccion){
      case 4:
        moverse(jugador, direccion, world);
        break;
      case 3:
        moverse(jugador, direccion, world);
        break;
      case 2:
        moverse(jugador, direccion, world);
        break;
      case 1:
        moverse(jugador, direccion, world);
        break;
    }
  }
}

// Menu de explorar
function explorar_menu(){
  quitarBotones();
  contenedorRosa.style.display = "none";
  if (world[jugador.x][jugador.y].evento.evento == 0){exp += world[jugador.x][jugador.y].evento.evento_desc[2];}
  actualizar_text(jugador, world, 2);
}

// Dibujar Matriz
function dibujar(){
  contenedorMatriz.innerHTML = "";
  for (let i = 0; i < world.length; i++) {
    const fila = document.createElement('div');
    fila.classList.add('matriz-fila');
    fila.style.display = "block";
    for (let j = 0; j < world[i].length; j++) {
      const celda = document.createElement('span');
      celda.classList.add('celda');
      if (typeof world[i][j].bioma != "undefined"){
        celda.style.backgroundColor = world[i][j].bioma.color;
      }
      else{
        celda.style.backgroundColor = '#000000';
      }
      if (i == jugador.x && j == jugador.y){
        celda.style.backgroundColor = '#ffffff';
      }
      fila.appendChild(celda);
    }
    contenedorMatriz.appendChild(fila);
  }
}

// Obtener la ventana modal
var modal = document.getElementById("myModal");
var inventario = document.getElementById("myInventory");

// Muestra la ventana mapa
map.addEventListener("click", function(){modal.style.display = "block";});

// Abrir el inventario
function openInventory(){
  inventario.style.display = "block";
  jugador.lista_inventario();
  bag.src = "./media/img/bag.png";
}

// Abrir menu jugador
function openPlayer(){
  inventario.style.display = "block";
  jugador.lista_inventario();
}

// Fin del juego
function finDelJuego(){
  quitarBotones();
  contenedorRosa.style.display = "none";
  bag.style.display = "none";
  map.style.display = "none";
  player.style.display = "none";
  mostrarTexto("𝕱𝖎𝖓 𝖉𝖊𝖑 𝕵𝖚𝖊𝖌𝖔");
  mostrarTexto("Puntuación final: " + exp);
}

// Si el usuario hace clic fuera de la ventana 
window.onclick = function(event) {
  if (event.target == inventario) {
    inventario.style.display = "none";
  }
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == ajustes) {
    ajustes.style.display = "none";
  }
}

// Obtener referencias a los elementos del DOM
const btnAbrirPlayerModal = document.getElementById('player');
const playerModal = document.getElementById('playerModal');
const name_p = document.getElementById('name_p');
const vida_p = document.getElementById('vida_p');
const energia_p = document.getElementById('energia_p');
const ataque_p = document.getElementById('ataque_p');
const defensa_p = document.getElementById('defensa_p');
const velocidad_p = document.getElementById('velocidad_p');
const dinero_p = document.getElementById('dinero_p');
const barra_vida = document.getElementById('barra_vida');
const barra_energia = document.getElementById('barra_energia');

// Colores Barras
function cambiarColorDeBarra(barra,porcentaje) {
  if (porcentaje > 60) {
    barra.style.backgroundColor = "#00ff00"; // Verde
  } else if (porcentaje > 35) {
    barra.style.backgroundColor = "#ffcc00"; // Amarillo
  } else {
    barra.style.backgroundColor = "#ff0000"; // Rojo
  }
}

// Función para abrir el modal del jugador
function abrirPlayerModal() {
  playerModal.style.display = 'block';
  // Actualizar las estadísticas del jugador
  
  name_p.textContent = jugador.nombre;
  vida_p.textContent = jugador.vida;
  barra_vida.style.width = `${jugador.vida/jugador.vida_max * 100}%`;
  cambiarColorDeBarra(barra_vida, jugador.vida/jugador.vida_max * 100);
  energia_p.textContent = jugador.energia;
  barra_energia.style.width = `${jugador.energia/jugador.energia_max * 100}%`;
  cambiarColorDeBarra(barra_energia, jugador.energia/jugador.energia_max * 100);
  ataque_p.textContent = jugador.ataque;
  defensa_p.textContent = jugador.defensa;
  velocidad_p.textContent = jugador.velocidad;
  dinero_p.textContent = jugador.dinero;
}

// Función para cerrar el modal del jugador
function cerrarPlayerModal() {
  playerModal.style.display = 'none';
}

// Event listeners para abrir y cerrar el modal del jugador
btnAbrirPlayerModal.addEventListener('click', abrirPlayerModal);
window.addEventListener('click', function(event) {
  if (event.target === playerModal) {
    cerrarPlayerModal();
  }
});

// Inicio
noShow();