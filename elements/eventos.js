// Parametros de los objetos: [primer dialogo, segundo dialogo, exp/experiencia asignado para el final, función de la accion]

// Eventos Bosque ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const eventosBosque = [
    ["El sonido de los pajaros y la tranquilidad del ambiente resuenan en tu interior...","El sonido de los pajaros y la tranquilidad del ambiente resuenan en tu interior...",1,
    function funct() {
      jugador.vida = jugador.vida_max;
      mostrarTexto("Recuperas toda tu salud");
      createButton('atras', 'Atrás', function() {accion_menu();});
    }],

    ["La niebla es espesa, presientes que te acecha algo entre las sombras de los árboles","La niebla ha amainado un poco, pero sigues estando insegur@",3,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        mostrarTexto("¡¡Entras en combate!! Un Duende te cortan el paso");
        combate_Duende();
      }else{
        createButton('atras', 'Atrás', function() {accion_menu();});
      };
    }],

    ["¡Encuentras algo enterrado bajo las hojas y raices de un viejo árbol!","Vuelves a los pies del viejo árbol, pero solo encuentras el hueco vacío",5,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        asignar_objeto_valor(60);
      };
      createButton('atras', 'Atrás', function() {accion_menu();});
    }],

    ["Algo se mueve entre los arbustos del bosque... El encuentro parece inminente","Vuelves a pasar por la misma zona pero esta vez tienes más cautela",3,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        mostrarTexto("¡¡Un ciervo salvaje sale entre la maleza!!");
        combate_Ciervo();
      }else{
        createButton('atras', 'Atrás', function() {accion_menu();});
      };
    }],

    ["Te encuentras a un viajero perdido entre los arboles, al pasar tiempo con el y ayudarlo en su travesia decide darte un obsequio","Al pasar por el viejo camino recuerdas los buenos momentos con el viajero",8,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        mostrarTexto("¡¡El viajero te ha regalado un Hada!!");
        asignar_objeto("Hada");
      }else{
        mostrarTexto("Eso te anima y recuperas parte de tu energía.");
        recuperaEnergia(Math.floor(jugador.energia * 0.3), jugador);
      };
      createButton('atras', 'Atrás', function() {accion_menu();});
    }],

    ["Parece que algo obstruye la carretera principal.. ¡En seguida te das cuneta que es una embosda!","Ya no hay nada que obstruya el camino, pero aún así pasas con cuidado",3,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        mostrarTexto("¡¡Un bandido quiere atracarte!!");
        combate_Bandido();
      }else{
        createButton('atras', 'Atrás', function() {accion_menu();});
      };
    }],

    ["Decides ayudar a un viejo leñador con sus quehaceres, como recompensa el te quiere dar algo a cambio","Pasas a saludar al viejo leñador, tras una charla en su casa recuperas tu energía",8,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        asignar_objeto_valor(360);
      } else {
        jugador.energia = jugador.energia_max;
      };
      createButton('atras', 'Atrás', function() {accion_menu();});
    }],

    ["Contemplando la naturaleza y raices del bosque has encontrado un objeto","Vuelves a pasar por la misma zona, pero no encuentras nada interesante",2,
    function funct() {
      if (world[jugador.x][jugador.y].evento.evento == 0){
        asignar_objeto_valor(360);
      }
      createButton('atras', 'Atrás', function() {accion_menu();});
    }]
  ];

const descBosque = [
    "Un tranquilo bosque se extiende ante nosotros, cubierto de una densa vegetación.",
    "Altos árboles se alzan en filas, filtrando la luz del sol a través de sus hojas.",
    "El suelo del bosque está cubierto de una alfombra de hojas secas y musgo.",
    "El canto de los pájaros llena el aire, creando una sinfonía natural.",
    "El aroma a tierra húmeda y vegetación fresca impregna el aire.",
    "Un arroyo de aguas cristalinas serpentea entre los árboles, reflejando el cielo azul.",
    "Pequeños animales como ardillas y conejos se asoman entre los arbustos.",
    "El viento susurra entre las hojas, creando un sonido relajante y sereno.",
    "Flores silvestres de colores vivos adornan los claros del bosque.",
    "Las ramas crujen bajo nuestros pies mientras caminamos por el camino de tierra.",
    "Un manto de niebla matutina se eleva lentamente, revelando la belleza del bosque.",
    "Grandes rocas cubiertas de musgo ofrecen asientos naturales para descansar.",
    "Mariposas y abejas revolotean de flor en flor, buscando néctar.",
    "La sombra de los árboles nos protege del calor del sol en los días calurosos.",
    "El canto lejano de un búho rompe el silencio de la noche.",
    "En otoño, las hojas cambian de color y el bosque se tiñe de tonos cálidos.",
    "Pequeños charcos de agua se forman después de la lluvia, atrayendo a los animales sedientos.",
    "El crujir de ramas nos recuerda que no estamos solos en este tranquilo paraje.",
    "El sonido del agua fluyendo en el arroyo crea una atmósfera relajante y pacífica.",
    "Los troncos de los árboles están marcados por el paso del tiempo y los elementos.",
    "El cielo se asoma entre las copas de los árboles, ofreciendo un juego de luces y sombras.",
    "Una ligera brisa agita las hojas, creando un murmullo armonioso en el bosque.",
    "Pequeñas setas salpican el suelo, agregando un toque de color a la escena.",
    "Las raíces de los árboles se entrelazan formando intrincados patrones en el suelo.",
    "El crujir de las hojas secas bajo nuestros pies es música para los oídos.",
    "El silencio del bosque nos invita a detenernos y disfrutar de la naturaleza.",
    "Un zorro corre rápidamente entre los árboles, desapareciendo en la espesura.",
    "El sol se filtra entre las ramas, creando manchas de luz en el suelo del bosque.",
    "El bosque alberga una gran diversidad de plantas y animales, cada uno adaptado a su entorno.",
    "La majestuosidad de la naturaleza se manifiesta plenamente en este hermoso bosque."
  ];

// Eventos Montaña ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const eventosMontaña = [
  ["¡Oh no! Una gran roca viene directa hacía tí, corres para salvar tu vida; pero quedas exhausto en el proceso","Los desprendimientos han cesado, puedes explorar con tranquilidad la zona",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("¡Has perdido 3/4 de tu energia!");
      jugador.energia = Math.floor(jugador.energia * 0.25);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Las fuertes corrientes de las montañas hacen que no puedas avanzar más, te dejas llevar por el viento","Las fuertes corrientes de las montañas hacen que no puedas avanzar más, te dejas llevar por el viento",3,
  function funct() {
    imagen.src = "https://w.wallhaven.cc/full/z8/wallhaven-z8g96v.jpg";
    quitarBotones();
    contenedorRosa.style.display = "none";
    setTimeout(function() {
      var randi = Math.floor(Math.random()*5);
      while (randi > 0){
        moverse(jugador,(Math.floor(Math.random()*4)+1), world, false);
        randi -= 1;
      }
      moverse(jugador,(Math.floor(Math.random()*4)+1), world);
      contenedorRosa.style.display = "block";
    }, 3500);
  }],

  ["Al caminar por un sendero antiguo encuentras una vieja fortificación, al investigar te das cuenta de que hay un objeto entre las ruinas","Pasas de nuevo por el viejo sendero y vuelves a encontrarte frente a la deteriorada fortificación preguntandoté quien o que la habrá construido",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto_valor(360);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Sientes que te están observando desde las cumbres más cercanas...","El peligro ha pasado pero presientes que esos picos siguen siendo poco fiables",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      if (world[jugador.x][jugador.y].evento.evento == 0){
        if (Math.floor(Math.random()*2) > 0){
          mostrarTexto("Un Gigante te quiere atacar");
          combate_Gigante();
        }else{
          mostrarTexto("Un Orco se acerca, el combate es inminente");
          combate_Orco();
        }
      };
    }else{createButton('atras', 'Atrás', function() {accion_menu();});};
  }],

  ["Hay algo que te esta acechando desde el cielo, parece que el encuentro es inminente","El cielo esta despejado, pero sigues alerta",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      if (Math.floor(Math.random()*2) > 0){
        mostrarTexto("Un gran Fénix te esta amenazando");
        combate_Fenix();
      }else{
        mostrarTexto("Un feroz Basilisco desciende de las montañas");
        combate_Basilisco();
      }
    }else{createButton('atras', 'Atrás', function() {accion_menu();});}
  }],
  ["La tranquila brisa vigorizante y el silencio de las cumbres hacen que estes en paz y lleno de energía","La tranquila brisa vigorizante y el silencio de las cumbres hacen que estes en paz y lleno de energía",1,
  function funct() {
    jugador.energia = jugador.energia_max;
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Hay una estrecha cueva apartada del camino, ¡decides explorarla y encuentras un tesoro escondido!","Vuelves a la cueva dónde encontraste el exp... Ya no hay más tesoros pero puedes leer una nota pegada a la roca 'Te encontraré rufián, ya lo verás'",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      if (Math.floor(Math.random()*100) > 80){
        asignar_objeto("Parte del tesoro de Grihbil");
      }else{
        asignar_objeto("Gemas Preciosas");
      }
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Hay una gran cueva al final de un antiguo sendero.. Al explorarla te das cuenta de que ya esta habitada...","Vuelves a la misma gran cueva a explorar de nuevo en busca de más jaleo",8,
  function funct() {
    let x = Math.floor(Math.random()*10);
    switch(x){
      case 0:
        mostrarTexto("Entras en un pasadizo dónde un bandido esta contando su botín...");
        combate_Bandido();
        enemigo.dinero += 100;
        break;
      case 1:
        mostrarTexto("En una inmensa cavidad de la cueva hay un basilisco preparado para la batalla...");
        combate_Basilisco();
        break;
      case 2:
        mostrarTexto("Un ciervo ha llegado desde los bosques a descansar, parece que lo has sorprendido...");
        combate_Ciervo();
        break;
      case 3:
        mostrarTexto("¡Un duende sale tras una piedra!");
        combate_Duende();
        break;
      case 4:
        mostrarTexto("Has descubierto una cavidad dónde un fénix descansaba plácidamente...");
        combate_Fenix();
        break;
      case 5:
        mostrarTexto("Te has topado con un gigante que obstacula tu camino en la cueva...");
        combate_Gigante();
        break;
      case 6:
        mostrarTexto("¡Un jabalí sale de la esquina del pasillo!");
        combate_Jabali();
        break;
      case 7:
        mostrarTexto("Has encontrado un lago interior, pero parece que alguien esta en el agua...");
        combate_Kappa();
        break;
      case 8:
        mostrarTexto("Te has topado con un estrecho pasillo en el cual hay un orco...");
        combate_Orco();
        break;
      default:
        imagen.src = "https://image.lexica.art/full_jpg/d9ed2115-2487-4d62-9a08-0fe50c77db49";
        mostrarTexto("¡Has encontrado el final de la cueva!");
        mostrarTexto("No hay nadie ni nada en su interior...");
        createButton('atras', 'Atrás', function() {imagen.src = world[jugador.x][jugador.y].bioma.img[0];accion_menu();});
    }
  }]
];

const descMontaña = [
    "Montañas imponentes se alzan hacia el cielo, coronadas por picos nevados.",
    "Las laderas de las montañas están cubiertas de densos bosques de coníferas.",
    "Ríos de agua clara descienden en cascadas, alimentados por el deshielo de las cumbres.",
    "El viento silba entre las grietas de las rocas, llevando consigo el aroma fresco de la montaña.",
    "Entre las montañas, se abren valles verdes y fértiles, contrastando con las altas cumbres.",
    "El sol se pone detrás de las montañas, pintando el cielo con colores cálidos y vibrantes.",
    "Senderos serpenteantes nos llevan a través de paisajes escarpados y hermosos.",
    "Nubes juguetonas se deslizan entre los picos, ocultando y revelando la majestuosidad del paisaje.",
    "La paz y la tranquilidad reinan en lo alto de las montañas, lejos del bullicio de la ciudad.",
    "En la cima, el aire es más fino y el panorama se extiende como un lienzo sin fin.",
    "Los acantilados verticales desafían la gravedad, creando una vista impresionante.",
    "Buitres y águilas sobrevuelan majestuosamente, dominando los cielos de montaña.",
    "El sonido lejano de una avalancha recuerda la fuerza y la imprevisibilidad de la naturaleza.",
    "Cascadas de agua helada caen desde lo alto, formando arcoíris fugaces en su camino.",
    "Piedras gigantes forman esculturas naturales, testimonios de la erosión a lo largo de los siglos.",
    "Los prados alpinos se llenan de flores de colores vibrantes durante el verano.",
    "La noche en la montaña nos regala un cielo estrellado que deslumbra con su brillo.",
    "El eco de nuestros pasos resuena entre las montañas, recordándonos su vastedad.",
    "Las montañas cambian de apariencia con las estaciones, adaptándose al ritmo de la naturaleza.",
    "En invierno, las montañas se cubren de un manto blanco, invitando a los amantes de los montes nevados.",
    "La paz en las alturas solo se rompe por el suave murmullo del viento y el canto de las aves.",
    "A lo largo del camino, encontramos arroyos de agua helada, perfectos para refrescarnos.",
    "Caminar por la montaña nos permite conectarnos con la tierra y apreciar su grandeza.",
    "Refugios de montaña nos ofrecen cobijo y un lugar para descansar durante nuestras travesías.",
    "El desafío de ascender una montaña se ve recompensado por las vistas panorámicas desde la cima.",
    "Las paredes de roca vertical son un paraíso para los escaladores, desafiándolos a conquistarlas.",
    "La bruma matinal se eleva, revelando los contornos majestuosos de las montañas.",
    "La fauna silvestre encuentra refugio en las montañas, protegida por su terreno escarpado.",
    "Al caer la tarde, las sombras de las montañas se alargan, pintando un paisaje de contrastes.",
    "En las montañas, encontramos la paz, la aventura y la humildad ante la grandeza de la naturaleza."
  ];

// Evento Playa ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const eventosPlaya = [
  ["El plácido romper de las olas y la tranquila brisa marina hace que estes en sintonía con el ambiente","El plácido romper de las olas y la tranquila brisa marina hace que estes en sintonía con el ambiente",1,
  function funct() {
    mostrarTexto("Recuperas tu salud y tu energía");
    jugador.energia = jugador.energia_max;
    jugador.vida = jugador.vida_max;
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Encuentras los restos de una hogera en la orilla, ¡entre ellos hay objetos de valor!","Vuelves a inspecionar la hogera, tras fijarte bien de nuevo puedes entre leer lo que queda de una carta 'P**a L**cía, mi a**r, es** es mi c*rt* d* d*sped**a...' el resto es inteligible",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      if(!barco){asignar_objeto("Barca");}
      asignar_objeto_valor(360);
      asignar_objeto_valor(360);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["¡Encuentras algo que sobresale enterrado bajo la arena!","Vuelves a pasar al lado del hoyo... ¡Ves unos cangrejos corretear dentro!",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto_valor(500);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Encuentras a un viejo pescador, tras acompañarle en una relajada pesca decide darte algo a cambio","No vuelves a ver al pescador de nuevo, pero si que te sientas a recordar los buenos momentos, te sientes lleno de energía",8,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      if(!barco){asignar_objeto("Barca");}
      asignar_objeto_valor(160);
      asignar_objeto_valor(160);
    }else{
      jugador.energia = jugador.energia_max;
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Entre las olas parece que hay algo acechandote listo para surgir...","Ya no hay ninguna presencia acechando al rededor... Pero te mantienes alerta",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("Un Kappa marino esta furioso contigo.");
      combate_Kappa();
    }else{createButton('atras', 'Atrás', function() {accion_menu();});}
  }],

  ["Hay unos restos de una barca en la orilla, al explorarlos parece que hay algunos objetos","Vuelves a visitar los restos de la embarcación... Tras contemplarlos te preguntas que pudo ser de sus antiguos navegantes",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      if(!barco){asignar_objeto("Barca");}
      asignar_objeto_valor_all(999);
      asignar_objeto_valor_min(500,["Playa"]);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }]
];

const descPlaya = [
    "Una playa tranquila se extiende a lo largo de la costa, bañada por aguas cristalinas.",
    "La arena suave y dorada invita a caminar descalzo, sintiendo su caricia bajo nuestros pies.",
    "Las olas rompen con suavidad en la orilla, creando una sinfonía relajante.",
    "El aroma salado del mar se mezcla con la brisa marina, llenando el aire con frescura.",
    "Palmeras se inclinan hacia el mar, ofreciendo sombra y un refugio natural.",
    "Pequeñas conchas y caracolas decoran la orilla, esperando ser descubiertas por los curiosos.",
    "El sol se refleja en el agua, creando destellos brillantes que danzan en la superficie.",
    "El horizonte se funde entre el mar y el cielo, creando una sensación de infinitud.",
    "El mar en calma invita a nadar y sumergirse en sus aguas tibias y claras.",
    "Las gaviotas vuelan graciosamente sobre las olas, buscando su alimento en la costa.",
    "En la playa, la tranquilidad nos invita a relajarnos y dejar atrás las preocupaciones.",
    "Pequeñas pozas de agua se forman en la arena, creando un mundo propio para los niños.",
    "El sonido del mar acaricia nuestros oídos, alejándonos del bullicio de la vida cotidiana.",
    "Un cielo azul y despejado se extiende sobre la playa, regalándonos un día perfecto.",
    "Al caer la tarde, el sol tiñe el horizonte de tonos cálidos y dorados.",
    "El vaivén de las olas nos envuelve en una sensación de armonía con la naturaleza.",
    "Los barcos pesqueros se mecen suavemente en el agua, creando una estampa pintoresca.",
    "Las sombrillas y tumbonas nos esperan para disfrutar de una tarde de relax y lectura.",
    "El mar parece fundirse con el cielo en el horizonte, creando un paisaje idílico.",
    "Las conchas y piedras pulidas por el mar son tesoros que encontramos al caminar.",
    "Los niños juegan a construir castillos de arena, sumergidos en su propia fantasía.",
    "Las algas meciéndose suavemente en el agua añaden una sensación de vida al paisaje.",
    "Los atardeceres en la playa nos regalan un espectáculo de colores en el cielo.",
    "La brisa marina refresca nuestra piel, haciéndonos olvidar el calor del día.",
    "El agua turquesa invita a sumergirse en un mar de tranquilidad y serenidad.",
    "Las huellas dejadas por los paseantes en la arena cuentan historias efímeras.",
    "En la lejanía, el faro se alza como un guardián silencioso del mar.",
    "El susurro del mar nos acompaña como una melodía suave y constante.",
    "La playa es un refugio donde la naturaleza y el hombre se encuentran en armonía.",
    "En esta playa tranquila, encontramos un remanso de paz y belleza para recargar nuestras energías."
  ];

// Eventos Mar ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const eventosMar = [
  ["El mar parece un cristal gigante que refleja el cielo claro y azul. Apenas hay una brisa que ondula la superficie en suavidad, dejando a su paso un rastro de pequeñas arrugas de espuma blanca.","El mar parece un cristal gigante que refleja el cielo claro y azul. Apenas hay una brisa que ondula la superficie en suavidad, dejando a su paso un rastro de pequeñas arrugas de espuma blanca.",1,
  function funct() {
    exp += 1;
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Esta zona del mar es peligrosa...","Esta zona del mar es peligrosa...",3,
  function funct() {
    if(Math.floor(Math.random()*100) < 25){
      mostrarTexto("Un barco se aproxima desde la lejanía... ¡Al fijarte bien ves que son piratas te han abordado la embarcación!");
      combate_Piratas();
    }else{
      mostrarTexto("Has explorado la zona y por suerte no ha sucedido nada...");
      createButton('atras', 'Atrás', function() {accion_menu();});
    }
  }],

  ["Oh no, una tormenta, parece que tu barca ha quedado dañado","La tormenta ha cesado y puedes ver el agua en calma centellear a través de los rayos del sol",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("Has perdido energía 3 puntos de energía.");
      jugador.energia -= 3;
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Escuchas algo asomarse en la popa del barca, parece que es una sirena, ¿a que habrá venido?","Estás aguas son de sirenas, hay que pasar con cuidado son seres oscuros de naturaleza extraña",5,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      let azar = Math.floor(Math.random()*10);
      if (azar <= 3){
        mostrarTexto("¡Estas en una batalla contra una sirena!");
        combate_Sirena();
      }
      else if(azar <= 7){
        mostrarTexto("La sirena ha venido a cantarte una melodía explicandote dónde esta lo que andas buscando");
        exp *= 1.5;
        mostrarTexto("Sirena: Lo que buscas esta...");
        let x = tesoro[0] - jugador.x;
        let y = tesoro[1] - jugador.y;
        if(x > 0){
          mostrarTexto("Sirena: " + x +" pasos a Popa...");
        }else{
          mostrarTexto("Sirena: " + Math.abs(x) +" pasos a Proa...");
        }
        if(y > 0){
          mostrarTexto("Sirena: " + y +" pasos a Estribor...");
        }else{
          mostrarTexto("Sirena: " + Math.abs(y) +" pasos a Babor...");
        }
      }
      else{
        let comerciante = inicio_comercio(comercio_sirena);
        let canta = false;
        mostrarTexto("Parece que la sirena ya no quiere pelear, solo comerciar");
        imagen.src = comercio_sirena.src;
        mostrarTexto(comercio_sirena.nombre +": Mira estos objetos que trigo de las profundidades.");
        createButton('tienda', 'Tienda', function() {
          canta = false;
          lista_inventario_comerciante(comerciante);
        });
        createButton('hablar', 'Hablar', function() {
          if(!canta){mostrarTexto("La sirena empieza a cantar:");};
          mostrarTexto(comercio_sirena.nombre + ": " +comercio_sirena.frases[Math.floor(Math.random() * comercio_sirena.frases.length)]);
          canta = true;
        });
        createButton('atras', 'Atrás', function() {
          canta = false;
          mostrarTexto(comercio_sirena.nombre +": ¡Ve con cuidado hermos@ viajer@!");
          imagen.src = world[jugador.x][jugador.y].bioma.img[0];
          accion_menu();
        });
      };
    }else{
      createButton('atras', 'Atrás', function() {accion_menu();});
    };
  }],

  ["El mar comienza a agitarse mientras un gran tentáculo emerge del agua. De repente, un enorme kraken aparece ante nosotros, envolviendo el barco con sus tentáculos y amenazando con arrastrarnos hacia las profundidades del océano","El peligro ha cesado, por el momento...",5,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("¡Luchas contra un Kraken!");
      combate_Kraken();
    }else{
      createButton('atras', 'Atrás', function() {accion_menu();});
    };
  }],

  ["Te pones a pescar un rato... y ¡encuentras unos objetos!","No creo que haya más que pescar por aquí...",1,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto_biomas(500,["Playa","Mar"]);
      asignar_objeto_biomas(500,["Playa","Mar"]);
      asignar_objeto_biomas(500,["Playa","Mar"]);
      asignar_objeto_valor_all(999);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["¡Cuidado, agarrate, un remolino hace desvariar tu travesía!","¡Cuidado, agarrate, vuelves a toparte con el remolino que hace desvariar tu travesía!",5,
  function funct() {
    imagen.src = "https://w.wallhaven.cc/full/z8/wallhaven-z8g96v.jpg";
    quitarBotones();
    contenedorRosa.style.display = "none";
    setTimeout(function() {
      var randi = Math.floor(Math.random()*5);
      while (randi > 0){
        moverse(jugador,(Math.floor(Math.random()*4)+1), world, false);
        randi -= 1;
      }
      moverse(jugador,(Math.floor(Math.random()*4)+1), world);
      contenedorRosa.style.display = "block";
    }, 3500);
  }]
];

const descMar = [
    "El vasto mar abierto se extiende como un lienzo sin fin, abrazando el horizonte.",
    "Las olas gigantes rompen con fuerza, mostrando el poderío de la naturaleza.",
    "El agua salada nos envuelve, acariciando la piel con su frescura y salinidad.",
    "El cielo se mezcla con el mar en una fusión de tonos azules y grises.",
    "Los delfines juegan en las crestas de las olas, mostrando su destreza y alegría.",
    "La inmensidad del océano nos hace sentir pequeños y humildes ante su grandeza.",
    "Al mirar hacia el horizonte, solo se ve agua y cielo, una sensación de infinitud.",
    "El vaivén del barca en las olas crea una sensación única de movimiento y libertad.",
    "Los rayos del sol se reflejan en el agua, creando destellos brillantes en el mar.",
    "El viento marino sopla con fuerza, llevando consigo la esencia del océano.",
    "Gaviotas y albatros vuelan grácilmente sobre las olas, buscando su alimento.",
    "El sonido del mar es un coro de olas que se rompen y se funden con el viento.",
    "En la inmensidad del mar, la soledad se encuentra con la belleza y la calma.",
    "Las corrientes marinas tejen patrones invisibles bajo la superficie, como un baile secreto.",
    "El océano es un misterio infinito, ocultando profundidades inexploradas.",
    "Las ballenas emergen majestuosamente, mostrando sus colosales formas.",
    "Las aguas cambian de tonalidad, revelando una paleta de azules y verdes.",
    "El sol se hunde en el mar al atardecer, pintando el cielo con fuego y magia.",
    "Las estrellas se reflejan en el agua, creando un cielo doble en las noches claras.",
    "El oleaje hipnótico nos arrulla, como una canción de cuna del océano.",
    "Las nubes bailan en el cielo, arrojando sombras cambiantes sobre las olas.",
    "Las tormentas en alta mar son un espectáculo de fuerza y ferocidad.",
    "El océano esconde tesoros y secretos en sus profundidades inexploradas.",
    "El aroma salado y marino nos embriaga, evocando recuerdos de libertad.",
    "En la lejanía, un barco solitario se pierde en el horizonte, navegando hacia lo desconocido.",
    "El silencio en el océano se rompe solo por el suave arrullo de las olas.",
    "El mar abierto es un lienzo para los amantes de la navegación y la aventura.",
    "En medio de la nada, el mar nos conecta con lo más profundo de nuestra existencia.",
    "El coral y la vida marina transforman el océano en un jardín submarino.",
    "Las medusas flotan en las aguas, como criaturas etéreas de otro mundo.",
    "En el mar abierto, la libertad se encuentra en la inmensidad del horizonte.",
    "Los atardeceres en alta mar son un espectáculo de colores y magia.",
    "La luna llena se refleja en el agua, creando un camino de luz hacia el infinito.",
    "El océano es un espejo que refleja el alma, mostrando la calma y la tormenta.",
    "Las olas acarician las costas con delicadeza, dejando su huella en la arena.",
    "El mar es un testigo silente de historias y leyendas que han perdurado en el tiempo.",
    "El azul del océano es un bálsamo para el alma, brindando paz y serenidad.",
    "El canto de las ballenas resuena en el agua, como una sinfonía ancestral.",
    "Los faros marinos guían a los navegantes con su luz, en la oscuridad de la noche.",
    "El mar nos invita a explorar sus misterios y a descubrir la vida submarina.",
    "Las olas rompen en la orilla, como susurros que cuentan historias antiguas.",
    "Las estrellas brillan con fuerza en alta mar, lejos de la contaminación lumínica.",
    "El océano es un símbolo de constancia en un mundo en constante cambio.",
    "Los corales forman delicados jardines submarinos, albergando una biodiversidad impresionante.",
    "El océano nos enseña a fluir con la vida, como las olas que nunca cesan.",
    "Las conchas que encontramos en la playa son recuerdos del mar que dejó atrás.",
    "El mar abierto es un espejo donde el cielo y la tierra se encuentran.",
    "El océano nos invita a dejar ir nuestras preocupaciones, fluyendo con sus mareas.",
    "Las embarcaciones en alta mar se mecen al ritmo del océano, como cunas sobre el agua.",
    "El mar abierto es un misterio que siempre nos sorprende y nos inspira a explorar."
  ];

// Eventos Prado ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const eventosPrado = [
  ["El suave aroma de las flores y la gratil brisa de los prados hace que estes en paz","El suave aroma de las flores y la gratil brisa de los prados hace que estes en paz",1,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("Recuperas tu energía");
      jugador.energia = jugador.energia_max;
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Presientes que hay algo acechando entre la hierva alta...","Ya nada acecha en la hierba silvestre, pero te mantienes alerta",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      let i = Math.floor(Math.random()*100);
      if ( i > 70){
        mostrarTexto("¡Un Duende sale entre los arbustos!");
        combate_Duende();
      }else if ( i > 30){
        mostrarTexto("Un Jabalí furioso te enviste.");
        combate_Jabali();
      }else{
        mostrarTexto("Un orco malhumorado quiere atacarte.");
        combate_Orco();
      }
    }else{createButton('atras', 'Atrás', function() {accion_menu();});}
  }],

  ["¡Al caminar tropiezas con un objeto tirado en mitad del camino!","Vuelves a pasar por el mismo camino, puedes ver que hay una persona buscando algo por la zona...",5,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto_valor(200);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Mmmmmh ¡Encuentras unas bayas silvestres muy ricas!","¡Las bayas silvestres también necesitan crecer!",5,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto("Bayas Silvestres");
      asignar_objeto("Bayas Silvestres");
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],
  
  ["Hay un grupo de viajeros a lo lejos, tras acercate y hablar con ellos entablas una amistad, te dan algo para que nunca olvides esa experiencia","Vuelves a explorar la misma zona dónde conociste a los viajeros, inevitablemente lagrimas de felicidad brotan de tus ojos, recuperas tu energía",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto("Hada");
      asignar_objeto_valor_all(999);
    }else{
      jugador.energia = jugador.energia_max;
    };
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Caminado por esos prados te has topado con un comerciante muy peculiar.","Vuelves al mismo sitio para encontrarte al vendedor.",8,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      imagen.src = comercio_prado_1.src;
      if(!comercio_prado_1.conoce){
        mostrarTexto(comercio_prado_1.nombre +": Puedes mirar mi tienda, seguro que encuentras algo de tu agrado");
        comercio_prado_1.conoce = true;
      }else{
        mostrarTexto("¡Que alegría volver a encontrarme contigo de nuevo! Ya sabes que siempre eres bienvenido a mi tienda.");
      }
      createButton('tienda', 'Tienda', function() {
        lista_inventario_comerciante(comercio_prado_1);
      });
      createButton('hablar', 'Hablar', function() {
        mostrarTexto(comercio_prado_1.nombre + ": " +comercio_prado_1.frases[Math.floor(Math.random() * comercio_prado_1.frases.length)]);
      });
      createButton('atras', 'Atrás', function() {
        mostrarTexto(comercio_prado_1.nombre +": ¡Hasta la vista!");
        imagen.src = world[jugador.x][jugador.y].bioma.img[0];
        accion_menu();
      });
    }else{createButton('atras', 'Atrás', function() {accion_menu();});}
  }],

  ["Parece que algo obstruye la carretera principal.. ¡En seguida te das cuneta que es una embosda!","Ya no hay nada que obstruya el camino, pero aún así pasas con cuidado",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("Un bandido poco amigable viene a buscar problemas.");
      combate_Bandido();
    }else{createButton('atras', 'Atrás', function() {accion_menu();});}
  }]
];

const descPrado = [
    "Un prado apacible se extiende bajo el sol, bañado en una alfombra de hierba verde.",
    "Mariposas revolotean con elegancia, pintando el aire con colores vibrantes.",
    "El canto de los pájaros crea una sinfonía alegre que llena el prado de vida.",
    "Pequeñas flores silvestres se asoman tímidamente entre la hierba, ofreciendo su belleza.",
    "Las abejas trabajan incansablemente, polinizando las flores y llevando consigo el néctar dulce.",
    "En el prado, los grillos cantan su serenata nocturna, acompañando la luna.",
    "Los árboles danzan en los bordes del prado, ofreciendo sombra y refugio.",
    "El aroma de las flores y el césped recién cortado perfuman el aire con dulzura.",
    "El murmullo de un arroyo cercano refresca el prado y atrae a los animales sedientos.",
    "El viento susurra entre las flores y la hierba, acariciando la piel con suavidad.",
    "Pequeños animales como conejos y ciervos se ocultan entre la vegetación, observando con curiosidad.",
    "El prado se llena de vida, con mariposas, abejas, y pequeños insectos que se mueven sin cesar.",
    "En primavera, el prado se cubre de un manto de flores, como un lienzo multicolor.",
    "El prado es un refugio para aves migratorias que encuentran descanso en su largo viaje.",
    "Las mariposas revolotean, como pequeñas bailarinas que danzan al ritmo del viento.",
    "El prado es un oasis de calma en medio de la naturaleza bulliciosa.",
    "La brisa acaricia suavemente la hierba, creando ondulaciones en un mar verde.",
    "Los colibríes zumban alrededor, bebiendo el néctar de las flores con destreza.",
    "Las mariquitas se posan sobre las hojas, como diminutos puntos de color en el prado.",
    "Las libélulas patinan sobre la superficie del arroyo, como delicadas bailarinas sobre el agua.",
    "En el prado, la vida se desarrolla en un ciclo constante de crecimiento y renovación.",
    "El prado es un lugar de encuentro para diversos seres vivos, cada uno con su propósito en la cadena de la vida.",
    "En el crepúsculo, las luciérnagas hacen su aparición, iluminando el prado con su luz intermitente.",
    "Las flores del prado atraen a las abejas, creando un eco de zumbidos armonioso.",
    "Los niños corren por el prado, persiguiendo mariposas y riendo con alegría.",
    "El prado es un lienzo de biodiversidad, con distintas especies conviviendo en armonía.",
    "El sol brilla con fuerza sobre el prado, invitando a disfrutar de su calidez.",
    "Las libélulas revolotean como hadas mágicas, dejando un rastro de encanto en su camino.",
    "En el prado, los insectos trabajan incansablemente, formando parte de una sinfonía de vida.",
    "Los colores del prado cambian con las estaciones, adaptándose a los ciclos de la naturaleza.",
    "Las flores del prado dan la bienvenida a las abejas, que las visitan en busca de néctar.",
    "El prado es un hogar para pequeños mamíferos que construyen madrigueras bajo la tierra.",
    "El rocío de la mañana brilla como diamantes sobre las hojas y flores del prado.",
    "Las mariposas se posan con delicadeza en las flores, como bailarinas sobre un escenario natural.",
    "El prado es un edén para los fotógrafos, con su riqueza de colores y vida salvaje.",
    "El silencio del prado se rompe solo por el canto de los pájaros y el susurro del viento.",
    "Las flores silvestres pintan el prado con pinceladas de colores vivos y alegres.",
    "El prado es un lugar de esparcimiento y juego para las criaturas que lo habitan.",
    "En el prado, el tiempo parece detenerse, invitándonos a disfrutar del presente.",
    "El canto de los grillos se convierte en una serenata nocturna, llenando el prado de sonidos mágicos.",
    "Las mariposas parecen danzar en el aire, como delicadas bailarinas en su escenario natural.",
    "El prado es un refugio para insectos y polinizadores que juegan un papel crucial en el ecosistema.",
    "Los colibríes revolotean como pequeños helicópteros, alimentándose del néctar de las flores.",
    "En el prado, cada flor tiene su propia historia y belleza única, como una galería de arte natural.",
    "Los trinos de los pájaros llenan el prado de música, como si la naturaleza estuviera cantando su propia sinfonía.",
    "El prado es un lugar de descanso para aves migratorias que encuentran refugio en su viaje interminable.",
    "El prado es un paraíso para los fotógrafos, que buscan capturar la belleza efímera de las flores y los animales que lo habitan.",
    "En el prado, la naturaleza se presenta en todo su esplendor, ofreciendo una muestra de la diversidad y riqueza del mundo natural.",
    "Los sonidos de la naturaleza en el prado son una sinfonía de vida que envuelve nuestros sentidos y nos conecta con el corazón de la tierra.",
    "El prado es un recordatorio de la belleza y la fragilidad de la vida, un tesoro que debemos cuidar y proteger para las generaciones venideras."
  ];

// Eventos Poblado ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const eventosPoblado = [
  ["Ayudas a unos niños a encontrar el camino a casa, su padre como obsequio de da algo a cambio","Vuelves a pasar por la plaza principal, puedes volver a ver a esos niños jugar felices, inevitablemente sonries al verlos",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto_valor(500);
    }
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Vaya parece que ha pasado algo con un guardia...","¡Al pasar por el mismo sitio el guardia te saluda con entusiasmo!",3,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      let olvido = ["Espada", "Escudo", "Ballesta","Bizcocho"];
      let randi = Math.floor(Math.random() * olvido.length);
      mostrarTexto("Se le ha olvidado su " + olvido[randi] + ". ¿Quieres devolverselo?");
      createButton('si', 'Si', function() {
        quitarBotones();
        mostrarTexto("Decides devolverle su " + olvido[randi] + " al guardia.");
        mostrarTexto("Guardia: Muchas gracias, se me había olvidado por completo. Toma, aquí tienes unas monedas por la molestia.");
        mostrarTexto("¡Has recibido 500 monedas!");
        jugador.dinero += 500;
        accion_menu();
      });
      createButton('no', 'No', function() {
        quitarBotones();
        mostrarTexto("Decides quedarte su " + olvido[randi] + " del guardia...");
        asignar_objeto(olvido[randi]);
        eventosPoblado[1][1] = "Ves de nuevo al guardia, parece que esta buscando su " + olvido[randi] + "...";
        accion_menu();
      });
    }else{
      createButton('atras', 'Atrás', function() {accion_menu();});
    };
  }],

  ["Te pasas el día en las rebajas el mercado, ya no tienes más ahorros... ¡Pero has comprado objetos muy útiles para tu aventura!","Tras el último suceso del mercado decides explorar por otras zonas de la ciudad",5,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      asignar_objeto_valor(350);
      asignar_objeto_valor(350);
      asignar_objeto_valor_all(160);
      asignar_objeto_valor_all(160);
      asignar_objeto_valor_min(400,["Poblado","Prado"]);
      asignar_objeto_valor_min(400,["Poblado","Prado"]);
      asignar_objeto_valor_min(500,["Bosque","Montaña","Playa","Mar","Poblado","Prado"]);
      asignar_objeto_valor_all(999);
      jugador.dinero = 0;
    };
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["Pasas por una calle muy poco transitada.. Alguien te bloquea el camino de escapatoria...","Has aprendido la lección, mejor no adentrarse en sitios poco fiables",5,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      mostrarTexto("¡Un bandido quiere atracarte!");
      combate_Bandido();
    }else{
      createButton('atras', 'Atrás', function() {accion_menu();});
    };
  }],

  ["Ayudas a una anciana con sus quehaceres diarios, ¡como recompensa por ello te deja descansar en su posada gratuitamente!","Vuelves a visitar a la anciana, tras rememorar viejos sucesos te vuelve a dejar descansar en su apacible posada",5,
  function funct() {
    jugador.energia = jugador.energia_max;
    jugador.vida = jugador.vida_max;
    createButton('atras', 'Atrás', function() {accion_menu();});
  }],

  ["¡Has pasado demasiado tiempo en la cantina! Tu salud se ve muy reducida pero parece que has hecho lazos con los lugareños","Vuelves a pasar por la cantina (con moderación) allí puedes volver a ver a tus amigos y recuperas tu energía",10,
  function funct() {
    if (world[jugador.x][jugador.y].evento.evento == 0){
      jugador.vida = Math.floor(jugador.vida*0.5);
      jugador.energia = jugador.energia_max;
    }else{
      jugador.energia = jugador.energia_max;
    };
    createButton('atras', 'Atrás', function() {accion_menu();});
  }]
];

const descPoblado = [
    "El pueblo descansa en un entorno natural sereno, con calles empedradas y hogareñas casas.",
    "En el corazón del paisaje, el tranquilo pueblo se integra perfectamente con la naturaleza circundante.",
    "El encantador pueblo se anida entre colinas verdes y arroyos cristalinos, creando un escenario idílico.",
    "Las acogedoras casas de piedra reflejan la tradición y la historia arraigadas en el pueblo.",
    "Las calles empedradas invitan a pasear y descubrir rincones pintorescos en cada esquina.",
    "El pueblo es un refugio de paz y tranquilidad, donde el ajetreo de la vida moderna se desvanece.",
    "Las casas con tejados de tejas rojas y fachadas de colores se complementan con la belleza natural que lo rodea.",
    "El aroma a flores silvestres y madera recién cortada llena el aire, creando una atmósfera acogedora.",
    "El ritmo pausado de la vida en el pueblo permite disfrutar de cada momento y apreciar la belleza de lo sencillo.",
    "La arquitectura del pueblo evoca una sensación de nostalgia, como si el tiempo se hubiera detenido en un lugar mágico.",
    "Los vecinos del pueblo se conocen por nombre, y la comunidad se apoya y cuida mutuamente.",
    "El paisaje que rodea el pueblo es un cuadro de la naturaleza en toda su plenitud, brindando paz y armonía.",
    "El sonido de los pájaros y el murmullo del arroyo complementan la tranquilidad que reina en el pueblo.",
    "Las callejuelas estrechas y empedradas esconden historias y leyendas que se han transmitido de generación en generación.",
    "El entorno natural del pueblo es un paraíso para los amantes del senderismo y la vida al aire libre.",
    "El pueblo es un tesoro escondido, alejado del bullicio de la ciudad y sumergido en la belleza de la naturaleza.",
    "En la plaza central, los vecinos se reúnen para celebrar festivales y mantener vivas las tradiciones ancestrales.",
    "El campanario de la iglesia se eleva hacia el cielo, marcando el tiempo y guiando a los habitantes del pueblo.",
    "El encanto rústico del pueblo se funde con la calidez de sus habitantes, creando un ambiente único y acogedor.",
    "El aroma a pan recién horneado se mezcla con el olor a leña quemada, creando una atmósfera reconfortante.",
    "Las tardes en el pueblo se iluminan con luces suaves, invitando a disfrutar de una atmósfera mágica.",
    "El espíritu comunitario se ve reflejado en las actividades y eventos que se organizan en el pueblo con entusiasmo y alegría.",
    "En el pueblo, la vida fluye con la tranquilidad del río cercano, proporcionando una sensación de armonía con la naturaleza.",
    "Cada rincón del pueblo esconde un encanto especial, donde la simplicidad y la belleza se entrelazan en perfecta armonía.",
    "El pueblo es un remanso de paz y calma, donde las preocupaciones se desvanecen y se disfruta del regalo de la vida sencilla."
  ];