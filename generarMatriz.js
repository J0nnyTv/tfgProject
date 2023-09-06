// Objeto mapeado
class Mapa {
    constructor(x, y, bioma, evento) {
      this.x = x;
      this.y = y;
      this.bioma = bioma;
      this.evento = evento;
    }
  }

// Eventos
class Evento{
  constructor() {
      this.evento_desc = [];
      this.evento = 0;
    }
  generar_evento(bioma){
    var elecion = Math.floor(Math.random() * bioma.eventos_desc.length);
    this.evento_desc = bioma.eventos_desc[elecion];
  }
  generar_desc(bioma){
    switch(bioma.nombre){
      case "Bosque":
        this.asignar_desc(descBosque,bioma);
        break;
      case "Montaña":
        this.asignar_desc(descMontaña,bioma);
        break;
      case "Playa":
        this.asignar_desc(descPlaya,bioma);
        break;
      case "Mar":
        this.asignar_desc(descMar,bioma);
        break;
      case "Poblado":
        this.asignar_desc(descPoblado,bioma);
        break;
      case "Prado":
        this.asignar_desc(descPrado,bioma);
        break;
    }
  }
  asignar_desc(array,bioma){
    var bool = true;
    var cont = 0;
    var elecion = Math.floor(Math.random() * array.length);
    while(bool){
      if(array[elecion] == "x"){
        elecion += 1;
        cont += 1;
      }else{
        bool = false;
        bioma.desc[0] = array[elecion];
        array[elecion] = "x";
      }
      if(cont == 8){
        bool = false;
      }
    }
  }
}

// Tiendas
function asignarTienda(tienda){
  let vendedores = [comercio_prado_1];
  if(tienda === null){
    tienda = vendedores[Math.floor(Math.random * vendedores.length)];
  }
}

// Biomas
class Aleatorio {
  constructor() {
    this.sum = 0;
    this.azar = [[new Poblado, 0],[new Playa, 0],[new Montaña, 0],[new Bosque, 0],[new Prado, 0]];
    this.ordenar_porcentaje();
    // Ordena de menor a mayor
    this.azar.sort(function(a, b) {
      return a[1] - b[1];
    });
  }

  ordenar_porcentaje(){
    this.sum = 0;
    for (let i = 0; i < this.azar.length; i++) {
      this.sum += this.azar[i][0].rand;
      this.azar[i][1] = this.sum;
    }
  }

  little_azar(new_azar){ //Para escoger la cadena de azar mas pequeño
    if (new_azar.length <= this.azar.length){
      this.azar = new_azar;
    }
  }

  comparar_bioma(name, vecinos){
    for (let i = 0; i < this.azar.length; i++) {
      if (name == 'Mar'){
        this.azar = [[new Playa, 0],[new Mar, 0]];
        for (let i = 0; i < vecinos.length; i++) {
          if (!(vecinos[i].nombre == 'Playa' || vecinos[i].nombre == 'Mar')){
            this.little_azar([[new Playa, 0]]);
          }
        }
      }
      if (name == 'Playa'){
        var mar = true;
        for (let i = 0; i < vecinos.length; i++) {
          if (!(vecinos[i].nombre == 'Playa' || vecinos[i].nombre == 'Mar')){
            mar = false;
          }
        }
        if (mar){this.little_azar([[new Mar, 0],[new Poblado, 0],[new Playa, 0],[new Bosque, 0],[new Prado, 0]]);}
      }
      if(name == this.azar[i][0].nombre && name != 'Poblado' && name != 'Mar'){
        this.azar[i][0].rand *= 2;
      }
    }
    this.ordenar_porcentaje();
    // Ordena de menor a mayor
    this.azar.sort(function(a, b) {
      return a[1] - b[1];
    });
  }

  asignar_bioma(){
    const rand = Math.random() * this.azar[this.azar.length - 1][1];
    for (let i = 0; i < this.azar.length; i++) {
      if(rand <= this.azar[i][1]){
        return this.azar[i][0];
      }
    }
    return asignarBioma();
  }
}

// Clases de los biomas
class Bosque {
  constructor() {
    this.nombre = "Bosque";
    this.desc = ["Te encuentras en mitad de un bosque","Al adentrarte en el bosque logras llegar al gran árbol de la vida, según se cuenta el fruto mágico de este árbol concede un deseo a quién logre catarlo, por fin podrás descansar de tu travesía ya que has logrado encontrar lo que llevabas buscando"];
    this.lexica = [lexica_bosque,false];
    this.border = "El bosque es demasiado profundo por esa zona";
    this.img = ["https://images4.alphacoders.com/932/932271.jpg","https://images3.alphacoders.com/808/808572.jpg"];
    this.rand = 25;
    this.color = '#728337';
    this.eventos_desc = eventosBosque;
  }
}
class Montaña {
  constructor() {
    this.nombre = "Montaña";
    this.desc = ["Estas en las cumbres de unas imponentes montañas","Tras un largo viaje por los montes consigues alcanzar la montaña magna, según se cuenta en su interior se haya el mayor de los tesoros jamás vistos, tras una larga aventura sabes que has logrado alcanzar tu objetivo"];
    this.lexica = [lexica_montana,false];
    this.border = "En esa zona hay una cordillera muy extrema";
    this.img = ["https://www.xtrafondos.com/wallpapers/montanas-con-nieve-en-el-bosque-3934.jpg","https://images5.alphacoders.com/333/333032.jpg"];
    this.rand = 10;
    this.color = '#ce4a16';
    this.eventos_desc = eventosMontaña;
  }
}
class Playa {
  constructor() {
    this.nombre = "Playa";
    this.desc = ["Llegas a una costa tranquila y silenciosa","Después de un largo paseo por la costa, consigues ver unos restos de una embarcación que te es familiar, así es, son los restos de la embarcación de 'La nueva esperanza' la mayor flota jamás creada y que según se cuenta hay un gran tesoro en su interior"];
    this.lexica = [lexica_playa,false];
    this.border = "Ves una extraña niebla al final de esta costa... Mejor no acercarse";
    this.img = ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80","https://www.vistaalmar.es/images/ampliadas2/barcos-fantasma.jpg"];
    this.rand = 8;
    this.color = '#2fb9d8';
    this.eventos_desc = eventosPlaya;
  }
}
class Mar {
  constructor() {
    this.nombre = "Mar";
    this.desc = ["Estas en mitad del mar","Tras navegar por estos mares consigues ver lo que buscabas, el extraño ser nombrado la perla azul, que según se dice concede un deseo a los viajeros que se atrevan a encontrarle"];
    this.lexica = [lexica_mar,false];
    this.border = "Parece que las corrientes son demasiado turbulentas en esa dirección";
    this.img = ["https://upload.wikimedia.org/wikipedia/commons/a/aa/Entre_el_mar_y_el_cielo.JPG","https://cdnb.artstation.com/p/assets/images/images/055/257/069/large/geoffrey-amesse-great-water.jpg?1666527200"];
    this.rand = 80;
    this.color = '#2965b3';
    this.eventos_desc = eventosMar;
  }
}
class Poblado {
  constructor() {
    this.nombre = "Poblado";
    this.desc = ["Has encontrado una población","Por fin has llegado al castillo solitario del duque carmesí, se dice que el sol nunca sale en sus dominios solo se pone y que el día y la noche no pasan bajo su yugo. Al fin has llegado a tu destino para saldar cuentas"];
    this.lexica = [lexica_poblado,false];
    this.border = "Según los lugareños: 'No te adentres en esas fronteras ¡o te arrepentiras!'";
    this.img = ["https://estaticos-cdn.prensaiberica.es/clip/90b2dfa9-5b34-47e3-a2cd-573d865335ca_16-9-discover-aspect-ratio_default_1135958.jpg","https://images3.alphacoders.com/661/6617.jpg"];
    this.rand = 5;
    this.color = '#9b561a';
    this.eventos_desc = eventosPoblado;
    this.tienda = null;
  }
}
class Prado {
  constructor() {
    this.nombre = "Prado";
    this.desc = ["Te ubicas en un prado apacible y lleno de vida","Tras adentrarte en los prados consigues vislumbrar una antigua formación, así es, es el portal perdido de Artrashfal, por fin podrás volver a casa"];
    this.lexica = [lexica_prado,false];
    this.border = "Parece que no hay nada mas de interes más allá de estas colinas";
    this.img = ["https://www.wallpaperup.com/uploads/wallpapers/2018/10/08/1296119/722da5c4b76d51e8f4fcc3fc5e6c0567.jpg","https://i.pinimg.com/originals/4f/6f/60/4f6f60bfb0668c303a6dfb5302cffb91.jpg"];
    this.rand = 30
    this.color = '#28ce16';
    this.eventos_desc = eventosPrado;
  }
}

// Asignar bioma al azar
function asignarBioma(){
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return new Bosque;
    case 1:
      return new Montaña;
    case 2:
      return new Prado;
    default:
      console.log("Bioma no generado");
      break;
  }
}

// Designar Biomas
function generarCasilla(x,y,matriz){
  if (typeof matriz[x][y].bioma === "undefined"){
    if(typeof matriz[x+1][y].bioma === "undefined" && typeof matriz[x-1][y].bioma === "undefined" && typeof matriz[x][y+1].bioma === "undefined" && typeof matriz[x][y-1].bioma === "undefined"){
      return asignarBioma();
    }
    else{
      const vecinos = [];
      if (typeof matriz[x+1][y].bioma != "undefined"){
        vecinos.push(matriz[x+1][y].bioma);
      }
      if (typeof matriz[x-1][y].bioma != "undefined"){
        vecinos.push(matriz[x-1][y].bioma);
      }
      if (typeof matriz[x][y+1].bioma != "undefined"){
        vecinos.push(matriz[x][y+1].bioma);
      }
      if (typeof matriz[x][y-1].bioma != "undefined"){
        vecinos.push(matriz[x][y-1].bioma);
      }

      const aleatoria = new Aleatorio;
      for (let i = 0; i < vecinos.length; i++) {
        aleatoria.comparar_bioma(vecinos[i].nombre, vecinos);
      }
      return aleatoria.asignar_bioma();
    }
  }
}

// Casilla del tesoro
function generarTesoro(longitud){
  var x = Math.floor(Math.random()*(longitud-2)) + 1;
  var y = Math.floor(Math.random()*(longitud-2)) + 1;
  return [x,y];
}

function encontrado_tesoro(world,tesoro){
  let posicion = false;
  if(world.x == tesoro[0] && world.y == tesoro[1]){
    posicion = true;
  }
  return posicion;
}

// Función para generar la matriz del mundo
function generarWorld(matriz, size){
    // Definir el tamaño del mundo
    const rows = size;
    const cols = rows;

    // Iterar por las filas
    for (let i = 0; i < rows; i++) {
        // Crear una fila vacía
        const row = [];

        // Iterar por las columnas
        for (let j = 0; j < cols; j++) {
            // Agregar el trozo de mapa
            row.push(new Mapa(i, j));
        }

        // Agregar la fila al mundo
        matriz.push(row);
    }
}