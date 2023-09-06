const all_objects = [
  {name : "Setas", desc : "Estas son muy comunes por los bosques de la zona, están muy buenas salteadas", tag_inventario: "Usar", precio : 15, bioma : "Bosque", function : 
  function funct(){
    mostrarTexto("Decides comer setas, ¡su sabor es delicioso a la brasa!");
    if(jugador.vida + 5 <= jugador.vida_max){
      jugador.vida += 5;mostrarTexto("Has recuperado 5 puntos de vida gracias a las setas.");
    }else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la vida al máximo.");
    };
    jugador.quitarAlInventario("Setas");
    jugador.lista_inventario();
  }},
  {name : "Tallo del Bosque", desc : "Hermoso tallo crecido unos arbustos especifícos de la zona, sirve para hacer algunos brebajes, se puede vender a un precio razonable", tag_inventario: "Vender", precio : 25, bioma : "Bosque", function : 
  function funct(){
    mostrarTexto("Decides vender el Tallo del Bosque ¡Has ganado 25 monedas!");
    jugador.dinero += 25;
    jugador.quitarAlInventario("Tallo del Bosque");
    jugador.lista_inventario();
  }},
  {name : "Gota del alba", desc : "Gota formada por el rocío de cierto árbol mítico, se dice que puede aumentar a la vida a su portador", tag_inventario: "Usar", precio : 350, bioma : "Bosque", function : 
  function funct(){
    mostrarTexto("Bebes la Gota del alba, recuperas tu salud y tu vida máxima ha aumentado"); 
    jugador.vida_max = Math.floor(jugador.vida_max * 1.5);
    jugador.vida = jugador.vida_max;
    jugador.quitarAlInventario("Gota del alba");
    jugador.lista_inventario();
  }},
  {name : "Espada hoja", desc : "Espada hecha de una especie de hoja fina y cortante, es increiblemente ligera pero parece no tener mucha durabilidad", tag_inventario: "Equipar", precio : 50, bioma : "Bosque", function : 
  function funct(){
    mostrarTexto("Te equipas la Espada hoja, tu ataque a aumentado ha aumentado 4 puntos");
    jugador.ataque += 4;
    jugador.quitarAlInventario("Espada hoja");
    jugador.lista_inventario();
  }},
  {name : "Cornamenta Dorada", desc : "Cornamenta que reluce más que el propio oro macizo, cuentan que pertenece a un ser muy extraño de ver", tag_inventario: "Vender", precio : 500, bioma : "Bosque", function : 
  function funct(){
    mostrarTexto("Decides vender la Cornamenta Dorada ¡Has ganado 500 monedas!");
    jugador.dinero += 500;
    jugador.quitarAlInventario("Cornamenta Dorada");
    jugador.lista_inventario();
  }},
  {name : "Pedernal", desc : "Piedra afilada que usualmente se utiliza para generar fuego, puedes equiparlo para ganar algo de ataque", tag_inventario: "Equipar", precio : 5, bioma : "Montaña", function : 
  function funct(){
    mostrarTexto("Te equipas el Pedernal, tu ataque a aumentado ha aumentado 1 punto");
    jugador.ataque += 1;
    jugador.quitarAlInventario("Pedernal");
    jugador.lista_inventario();
  }},
  {name : "Sales Minerales", desc : "Preciadas sales de cocina que sirven para enriquecer tus platos, muy preciada por los cocineros", tag_inventario: "Vender", precio : 25, bioma : "Montaña", function : 
  function funct(){
    mostrarTexto("Decides vender las Sales Minerales ¡Has ganado 25 monedas!");
    jugador.dinero += 25;
    jugador.quitarAlInventario("Sales Minerales");
    jugador.lista_inventario();
  }},
  {name : "Gemas Preciosas", desc : "Valuosas piedras muy llamativas que pueden llegar a alcanzar grandes sumas monetarias", tag_inventario: "Vender", precio : 350, bioma : "Montaña", function : 
  function funct(){
    mostrarTexto("Decides vender las Gemas Preciosas ¡Has ganado 350 monedas!");
    jugador.dinero += 350;
    jugador.quitarAlInventario("Gemas Preciosas");
    jugador.lista_inventario();
  }},
  {name : "Pico de Cañerul", desc : "Pico de color verdoso con brillo resultante que, según los mineros, tiene una gran eficiencia y rendimiento en la labor de minería", tag_inventario: "Usar", precio : 100, bioma : "Montaña", function : 
  function funct(){
    mostrarTexto("Dices picar en la zona, ¡Has encontrado algunos objetos enterrados cerca!");
    for (let i = 0; i <= Math.floor(Math.random() * 8); i++){
      asignar_objeto_valor(999);
    };
    jugador.quitarAlInventario("Pico de Cañerul");
    jugador.lista_inventario();
  }},
  {name : "Parte del tesoro de Grihbil", desc : "Preciadas piezas muy valiosas que reconoces que pertenecian al famoso enano Grihbil", tag_inventario: "Vender", precio : 500, bioma : "Montaña", function : 
  function funct(){
    mostrarTexto("Decides vender el tesoro ¡Has ganado 500 monedas!");
    jugador.dinero += 500;
    jugador.quitarAlInventario("Parte del tesoro de Grihbil");
    jugador.lista_inventario();
  }},
  {name : "Concha Marina", desc : "Bonita concha decorativa la cual puede alcanzar un buen precio en el mercado", tag_inventario: "Vender", precio : 150, bioma : "Playa", function : 
  function funct(){
    mostrarTexto("Decides vender la Concha Marina ¡Has ganado 150 monedas!");
    jugador.dinero += 150;
    jugador.quitarAlInventario("Concha Marina");
    jugador.lista_inventario();
  }},
  {name : "Barca", desc : "Bote de madera que te permite navegar por los mares", tag_inventario: "Usar", precio : 150, bioma : "Playa", function : 
  function funct(){
    if(barco){
      mostrarTexto("Ya tienes una barca, decides vender esta por 150 monedas.");
      jugador.dinero += 150;
    }else{
      mostrarTexto("Te has equipado la barca, ¡ahora eres capaz de ir por el mar abierto!");
      barco = true;
    }
    jugador.quitarAlInventario("Barca");
    jugador.lista_inventario();
  }},
  {name : "Pescado Fresco", desc : "¿A quien no le gusta este buen manjar de la mar?", tag_inventario: "Usar", precio : 20, bioma : "Playa", function : 
  function funct(){
    mostrarTexto("Decides comer pescado.");
    if(jugador.vida + 20 <= jugador.vida_max){
      jugador.vida += 20;
      mostrarTexto("Has recuperado 20 puntos de vida gracias al Pescado Fresco.");
    }else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la vida al máximo.");
    };
    jugador.quitarAlInventario("Pescado Fresco");
    jugador.lista_inventario();
  }},
  {name : "Escudo de Arena", desc : "Escudo formado por diversas capas de arena que se van intercalando entre sí, ¡Aunque no lo parezca es muy resistente!", tag_inventario: "Equipar", precio : 250, bioma : "Playa", function : 
  function funct(){
    mostrarTexto("Te equipas el Escudo de Arena, tu defensa a aumentado ha aumentado 4 puntos");
    jugador.defensa += 4;
    jugador.quitarAlInventario("Escudo de Arena");
    jugador.lista_inventario();
  }},
  {name : "Espuma de Sirena", desc : "Preciosas perlas color azulado muy raras de encontrar en la mar, según se dice, se forman con la última palabra una sirena", tag_inventario: "Usar", precio : 350, bioma : "Playa", function : 
  function funct(){
    mostrarTexto("Tocas la Espuma de Sirena, notas como su energía se transfiere a tí, ¡Ahora te sientes más fuerte, tu ataque a aumentado!");
    jugador.ataque = Math.floor(jugador.ataque * 1.5);
    jugador.quitarAlInventario("Espuma de Sirena");
    jugador.lista_inventario();
  }},
  {name : "Cofre de Doblones de Oro", desc : "Básicamente... ¡¡Soy rico!!", tag_inventario: "Vender", precio : 950, bioma : "Playa", function : 
  function funct(){
    mostrarTexto("Decides vender Cofre de Doblones de Oro... ¡Has recibido 950 monedas!¡Yuhuuu!");
    jugador.dinero += 950;
    jugador.quitarAlInventario("Cofre de Doblones de Oro");
    jugador.lista_inventario();
  }},
  {name : "Algas Marinas", desc : "No hay mucho que describir, puedes lanzarlas por la borda o cocinarlas (aúnque su sabor no sea muy agradable)", tag_inventario: "Usar", precio : 3, bioma : "Mar", function : 
  function funct(){
    mostrarTexto("Decides comer algas, ¡están malísimas!");
    if(jugador.energia + 3 <= jugador.energia_max){
      jugador.energia += 3;
      jugador.vida -= 3;
      mostrarTexto("Has recuperado 3 puntos de energía gracias a las algas, pero has perdido 3 puntos de vida.");
    }else{
      jugador.energia = jugador.energia_max;
      jugador.vida -= 3;
      mostrarTexto("Tienes la energía al máximo. ¡Pero has perdido 3 puntos de vida!");
    };
    jugador.quitarAlInventario("Algas Marinas");
    jugador.lista_inventario();
    if(jugador.vida <= 0){
      mostrarTexto("Al comer la última algo notas que te atragantas con ella.");
      finDelJuego();
    }
  }},
  {name : "Escamas de Coral", desc : "Escamas grandes pertenecientes a alguna misteriosa criatura de las profundidades", tag_inventario: "Usar", precio : 200, bioma : "Mar", function : 
  function funct(){
    mostrarTexto("Tocas las Escamas de Coral, notas como su energía se transfiere a tí, ¡Ahora te sientes más robusto, tu defesa a aumentado!"); 
    jugador.defensa = Math.floor(jugador.defensa * 1.5);
    jugador.quitarAlInventario("Escamas de Coral"); 
    jugador.lista_inventario();
  }},
  {name : "Cola de Tritón", desc : "Bella cola perteneciente a algún tritón que la habrá perdido para su desgracia", tag_inventario: "Usar", precio : 200, bioma : "Mar", function : 
  function funct(){
    mostrarTexto("Tocas la Cola de Tritón, notas como su energía se transfiere a tí, ¡Ahora te sientes más veloz, tu velocidad a aumentado!"); 
    jugador.velocidad = Math.floor(jugador.velocidad * 1.5);
    jugador.quitarAlInventario("Cola de Tritón"); 
    jugador.lista_inventario();
  }},
  {name : "Romboide de arena celeste", desc : "Extraño artefacto que guarda en su interior un extraño y misterioso poder; dicen las leyendas que quien lo deshaga se podrá teletransportar", tag_inventario: "Usar", precio : 550, bioma : "Mar", function : 
  function funct(){
    finCombate(); // Si lo usas en un combate se acaba el conflicto
    imagen.src = "https://w.wallhaven.cc/full/z8/wallhaven-z8g96v.jpg";
    quitarBotones();
    contenedorRosa.style.display = "none";
    mostrarTexto("Cuando tocas el Romboide de arena celeste se deshace en tus manos, todo tu ser se vuelve invuido en una extraña energía ancestral..."); 
    jugador.quitarAlInventario("Romboide de arena celeste"); 
    jugador.lista_inventario();
    setTimeout(function() {
      var randi1 = Math.floor(Math.random()*(longitud-2)) + 1;
      var randi2 = Math.floor(Math.random()*(longitud-2)) + 1;
      moverse(jugador,[randi1,randi2], world, false);
      contenedorRosa.style.display = "block";}, 3500);
    }},
  {name : "Bayas Silvestres", desc : "Unas bayas que crecen en los prados, ¡su sabor es sumamente dulce y delicioso!", tag_inventario: "Usar", precio : 10, bioma : "Prado", function : 
  function funct(){
    mostrarTexto("Decides comer Bayas Silvestres, su sabor es como un soplo refrescante.");
    if(jugador.vida + 3 <= jugador.vida_max){
      jugador.vida += 3;
      mostrarTexto("Has recuperado 3 puntos de vida gracias a las Bayas Silvestres.");
    }else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la vida al máximo.");
    }; 
    jugador.quitarAlInventario("Bayas Silvestres"); 
    jugador.lista_inventario();
  }},
  {name : "Flores Silvestres", desc : "Conjunto de flores hermosas que tienen un aroma muy embriagador", tag_inventario: "Usar", precio : 25, bioma : "Prado", function : 
  function funct(){
    mostrarTexto("Te paras a oler las flores.");
    if(jugador.energia + 3 <= jugador.energia_max){
      jugador.energia += 3;
      mostrarTexto("Has recuperado 3 puntos de energía gracias a su fragancia.");
    }else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la energía al máximo.");
    }; 
    jugador.quitarAlInventario("Flores Silvestres"); 
    jugador.lista_inventario();
  }},
  {name : "Ballesta", desc : "Artefacto hecho de madera con un conjunto de engranajes que permiten  tensar la cuerda y lanzar flechas capaces de perforar armaduras, muchos caballeros la detestan", tag_inventario: "Equipar", precio : 250, bioma : "Prado", function : 
  function funct(){
    mostrarTexto("Te equipas la Ballesta, tu ataque a aumentado ha aumentado 8 puntos"); 
    jugador.ataque += 8; 
    jugador.quitarAlInventario("Ballesta"); 
    jugador.lista_inventario();
  }},
  {name : "Daga", desc : "Muy afilada y de corto alcance, es el arma más usada para hacer traiciones", tag_inventario: "Equipar", precio : 200, bioma : "Prado", function : 
  function funct(){
    mostrarTexto("Te equipas la Daga, tu ataque a aumentado ha aumentado 3 puntos"); 
    jugador.ataque += 3; 
    jugador.quitarAlInventario("Daga"); 
    jugador.lista_inventario();
  }},
  {name : "Piedra Rúnica", desc : "Piedra de un brillo azulado con unas marcas y símbolos extraños e incomprensibles...", tag_inventario: "Usar", precio : 150, bioma : "Prado", function : 
  function funct(){
    mostrarTexto("Al tocar la Piedra Rúnica ha empezado a brillar, ¡Parece que se ha transformado en algo!"); 
    asignar_objeto_valor_min(350,["Bosque","Montaña","Playa","Mar","Poblado","Prado"]);
    jugador.quitarAlInventario("Piedra Rúnica"); 
    jugador.lista_inventario();
  }},
  {name : "Hada", desc : "Pequeño ser con alas y un brillo centelleante, esta atrapada en un bote... ¡a lo mejor si la liberas te concede un favor!", tag_inventario: "Liberar", precio : 600, bioma : "Prado", function : 
  function funct(){
    mostrarTexto("Abres el bote en el cual la Hada estaba encerrada, esta alegramente empieza a revolotear a tu alrededor.");
    switch (Math.floor(Math.random() * 6)) {
      case 0:
        mostrarTexto("¡Vaya, parece que como agradecimiento te ha dejado "+ jugador.dinero * 9 +" monedas!");
        jugador.dinero = jugador.dinero * 10;
        break;
      case 1:
        mostrarTexto("Los brillos mágicos del hada han hecho un trabajo rejuvenecedor increible, ¡Tu energía se ve duplicada!");
        jugador.energia_max = jugador.energia_max * 2;
        jugador.energia = jugador.energia_max;
        break;
      case 2:
        mostrarTexto("Los brillos mágicos del hada han hecho un trabajo rejuvenecedor increible, ¡Tu vida se ve duplicada!");
        jugador.vida_max = jugador.vida_max * 2;
        jugador.vida = jugador.vida_max;
        break;
      case 3:
        mostrarTexto("Antes de despedirse te ha querido dar un objeto a cambio de agradecimiento...");
        asignar_objeto_valor_min(400,["Bosque","Montaña","Playa","Mar","Poblado","Prado"]);
        break;
      case 4:
        mostrarTexto("Antes de despedirse te ha susurrado al oido dónde esta el tesoro que estas buscando...");
        mostrarTexto("Hada: El tesoro... esta...");
        exp += 100;
        let x = tesoro[0] - jugador.x;
        let y = tesoro[1] - jugador.y;
        if(x > 0){
          mostrarTexto("Hada: " + x +" pasos al Sur...");
        }else{
          mostrarTexto("Hada: " + Math.abs(x) +" pasos al Norte...");
        }
        if(y > 0){
          mostrarTexto("Hada: " + y +" pasos al Este...");
        }else{
          mostrarTexto("Hada: " + Math.abs(y) +" pasos al Oeste...");
        }
        break;
      case 5:
        mostrarTexto("El hada voló hacia la libertad, sus alas brillando a la luz del sol, dejando un rastro de polvos mágicos a su paso. Se perdió en el cielo, una chispa de luz entre las estrellas, llevando consigo la esperanza de un mañana mejor.");
        break;
    };
    jugador.quitarAlInventario("Hada"); 
    jugador.lista_inventario();
  }},
  {name : "Pan", desc : "Objeto redondo, blando y huele muy bien. Alimento basico en cualquier cultura", tag_inventario: "Usar", precio : 5, bioma : "Poblado", function : 
  function funct(){
    mostrarTexto("Decides comer pan.");
    if(jugador.vida + 15 <= jugador.vida_max){
      jugador.vida += 15;
      mostrarTexto("Has recuperado 15 puntos de vida gracias al pan.");
    }else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la vida al máximo.");
    }; 
    jugador.quitarAlInventario("Pan"); 
    jugador.lista_inventario();
  }},
  {name : "Legumbres", desc : "Delicioso alimento muy rico vitaminicamente, da mucha energía", tag_inventario: "Usar", precio : 15, bioma : "Poblado", function : 
  function funct(){
    mostrarTexto("Decides comer las legumbres.");
    if(jugador.energia + jugador.energia_max*0.35 <= jugador.energia_max){
      jugador.energia += Math.floor(jugador.energia_max*0.35);
      mostrarTexto("Has recuperado 35% puntos de energía gracias a las legumbres.");
    }else if (jugador.energia < jugador.energia_max){
      jugador.energia = jugador.energia_max;
      mostrarTexto("Has recuperado 35% puntos de energía gracias a las legumbres.");
    }
    else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la energía al máximo.");
    }; 
    jugador.quitarAlInventario("Legumbres"); 
    jugador.lista_inventario();
  }},
  {name : "Carne seca", desc : "Carne bien preparada lista para comer en cualquier situación", tag_inventario: "Usar", precio : 20, bioma : "Poblado", function : 
  function funct(){
    mostrarTexto("Decides comer la carne seca.");
    if(jugador.vida + jugador.vida_max*0.35 <= jugador.vida_max){
      jugador.vida += Math.floor(jugador.vida_max*0.35);
      mostrarTexto("Has recuperado 35% puntos de vida gracias a la carne.");
    }else if (jugador.vida < jugador.vida_max){
      jugador.vida = jugador.vida_max;
      mostrarTexto("Has recuperado 35% puntos de vida gracias a la carne.");
    }
    else{
      jugador.vida = jugador.vida_max;
      mostrarTexto("Tienes la vida al máximo.");
    }; 
    jugador.quitarAlInventario("Carne seca"); 
    jugador.lista_inventario();
  }},
  {name : "Bizcocho", desc : "Preparado y recien horneado... ¡Tiene muy buena pinta!", tag_inventario: "Usar", precio : 30, bioma : "Poblado", function : 
  function funct(){
    mostrarTexto("Decides comerte el Bizcocho, ¡Esta buenísimo, recuperas toda tu vida y energía!");
    jugador.vida = jugador.vida_max; 
    jugador.energia = jugador.energia_max; 
    jugador.quitarAlInventario("Bizcocho"); 
    jugador.lista_inventario();
  }},
  {name : "Espada", desc : "Un clásico objeto alargado y cortante, es el arma más popular de los avntureros", tag_inventario: "Equipar", precio : 400, bioma : "Poblado", function : 
  function funct(){
    mostrarTexto("Te equipas la Espada, tu ataque a aumentado ha aumentado 5 puntos"); 
    jugador.ataque += 5; 
    jugador.quitarAlInventario("Espada"); 
    jugador.lista_inventario();
  }},
  {name : "Escudo", desc : "La protección es esencial para los largos viajes ¡Ya que el combate esta en cada esquina!", tag_inventario: "Equipar", precio : 400, bioma : "Poblado", function : 
  function funct(){
    mostrarTexto("Te equipas el Escudo, tu defensa a aumentado ha aumentado 5 puntos"); 
    jugador.defensa += 5; 
    jugador.quitarAlInventario("Escudo"); 
    jugador.lista_inventario();
  }},
  {name : "Cristal de la confianza", desc : "Extraño objeto de color rosado cristalino, al mirarlo te resulta muy acogedor y familiar.", tag_inventario: "Usar", precio : 300, bioma : "Poblado", function : 
  function funct(){
    if(combate){
      mostrarTexto("Muestras el cristal de la confianza a "+enemigo.nombre+". Parece que ahora es mucho más amistoso contigo. El cristal se ha roto el mil pedazos."); 
      enemigo.amistad += 9999;
      jugador.quitarAlInventario("Cristal de la confianza"); 
      jugador.lista_inventario();
    }else{
      mostrarTexto("¡Este objeto solo lo puedes usar en situaciones de conflicto!");
    }
  }},
  {name : "Cristal letal", desc : "Muy extraño objeto de color oscuro cristalino, procuras no mirarlo mucho directamente...", tag_inventario: "Usar", precio : 600, bioma : "???", function : 
  function funct(){
    if(combate){
      mostrarTexto("Muestras el cristal letal a "+enemigo.nombre+". Parece que la salud del enemigo a resultado gravemente dañada... El cristal se ha roto el mil pedazos."); 
      enemigo.vida = 0;
      jugador.quitarAlInventario("Cristal letal"); 
      jugador.lista_inventario();
    }else{
      mostrarTexto("¡Este objeto solo lo puedes usar en situaciones de conflicto!");
    }
  }},
  {name : "Bola de humo", desc : "Objeto circular con nubes en su interior creado a partir de densas nieblas concentradas ¡Si lo rompes puedes escabullirte con facilidad!", tag_inventario: "Usar", precio : 50, bioma : "Bosque", function : 
  function funct(){
    if(combate){
      mostrarTexto("Rompes la bola de humo ¡Sales ileso del conflicto!"); 
      finCombate();
      jugador.quitarAlInventario("Bola de humo"); 
      jugador.lista_inventario();
    }else{
      mostrarTexto("¡Este objeto solo lo puedes usar en situaciones de conflicto!");
    }
  }}
];