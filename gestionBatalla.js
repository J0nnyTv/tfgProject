// Gestión Combate

var enemigo;
var escudo_jugador = 0;
var escudo_oponente = 0;
var combate = false;

function inicio_combate(e){
    enemigo = JSON.parse(JSON.stringify(e));
    if (enemigo.velocidad > jugador.velocidad){
        e.turno_enemigo();
    }
}

function conflicto(a,b,escudo){
    let potencia = b.ataque;
    potencia -= escudo;
    escudo -= b.ataque;
    if(potencia < 0){
        potencia = 0;
    }
    if(escudo < 0){
        escudo = 0;
    }
    a.vida -= potencia;
    return (escudo);
}

function conflicto_daño(afectado,b,escudo){
    let potencia = b;
    potencia -= escudo;
    escudo -= b;
    if(potencia < 0){
        potencia = 0;
    }
    if(escudo < 0){
        escudo = 0;
    }
    afectado.vida -= potencia;
    return (escudo);
}

function finCombate(){
    enemigo = null;
    combate = false;
    escudo_jugador = 0;
    escudo_oponente = 0;
    quitarBotones();
    imagen.src = world[jugador.x][jugador.y].bioma.img[0];
    createButton('atras', 'Atrás', function() {accion_menu();});
}

// Funciones relacionadas

function recuperaVida(numero,persona){
    if(persona.vida + numero <= persona.vida_max){
        persona.vida += numero;
        mostrarTexto(persona.nombre + " ha recuperado " + numero + " puntos de vida.");
      }
    else if (persona.vida < persona.vida_max){
        mostrarTexto(persona.nombre + " ha recuperado " + (persona.vida_max - persona.vida) + " puntos de vida.");
        persona.vida = persona.vida_max;
    }
    else{
        persona.vida = persona.vida_max;
        mostrarTexto(persona.nombre + " tiene la vida al máximo.");
      };
}

function recuperaEnergia(numero,persona){
    if(persona.energia + numero <= persona.energia_max){
        persona.energia += numero;
        mostrarTexto(persona.nombre + " ha recuperado " + numero + " puntos de energía.");
      }
    else if (persona.energia < persona.energia_max){
        mostrarTexto(persona.nombre + " ha recuperado " + (persona.energia_max - persona.energia) + " puntos de energía.");
        persona.energia = persona.energia_max;
    }
    else{
        persona.energia = persona.energia_max;
        mostrarTexto(persona.nombre + " tiene la energía al máximo.");
      };
}

function inventarioContiene_enemigo(objeto){
    let contiene = false;
    for (let i = 0; i < enemigo.inventario.length; i++) {
      if (enemigo.inventario[i].name == objeto){
        contiene = true;
      }
    }
    return contiene;
  }

function quitarAlInventario_enemigo(objeto, cantidad) {
    if (typeof cantidad === "undefined"){cantidad = 1;};
    var itemEncontrado = enemigo.inventario.find(function(item) {
      return item.name == objeto;
    });
    if (itemEncontrado) {
      itemEncontrado.cantidad -= cantidad;
      if(itemEncontrado.cantidad <= 0){
        enemigo.inventario.splice(enemigo.inventario.indexOf(itemEncontrado), 1);
      }
    }
  };

// Turnos jugador x enemigo

function combate_Duende(){
    imagen.src = Duende.src;
    combate = true;
    menu_combate();
    inicio_combate(Duende);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
        mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
        enemigo.amistad -= 2;
        escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
        if(enemigo.vida <= 0){
            mostrarTexto("Has acabado con la vida del duende...");
            mostrarTexto("Te has quedado con su dinero. Recibes " + enemigo.dinero + " monedas.");
            asignar_objeto("Bayas Silvestres");
            jugador.dinero += enemigo.dinero;
            exp += 1;
            finCombate();
        }else{Duende.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
            mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
            if(escudo_jugador < jugador.defensa){
                escudo_jugador = jugador.defensa;
            }
            Duende.turno_enemigo();
        });

        createButton('negociar', 'Negociar', function() {
        quitarBotones();
        createButton('dar', 'Darle 5 de Oro', function() {
            if(jugador.dinero >= 5){
            jugador.dinero -= 5;
            mostrarTexto("Le has lanzado 5 monedas de Oro, parece estar algo más contento contigo.");
            enemigo.amistad += 3;
            enemigo.dinero += 5;
            Duende.turno_enemigo();
            }else{
            mostrarTexto("¡No tienes dinero suficiente para lanzarle!");
            }
        });
        createButton('negociar', 'Decirle un cumplido', function() {
            mostrarTexto("Le haces un cumplido al Duende. Parece que le ha gustado.");
            enemigo.amistad += 1;
            Duende.turno_enemigo();
        });
        createButton('amenaza', 'Amenazarle', function() {
            mostrarTexto("Le has amenazado directamente en tono serio, no parece que le haya gustado...");
            enemigo.amistad -= 5;
            Duende.turno_enemigo();
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        if(jugador.velocidad >= enemigo.velocidad){
            mostrarTexto("¡Has escapado corriendo del conflicto con el duende!");
            if(jugador.energia >= 2){jugador.energia -= 2;}
            finCombate();
            moverse(jugador, 5, world);
        }else{
            mostrarTexto("¡El duende es demasiado rápido! Tal vez a la próxima vez lo consigas.");
            enemigo.velocidad -= (Math.floor(Math.random() * 11) + 1);
            Duende.turno_enemigo();
        }
        });
    }
}

function combate_Ciervo(){
    imagen.src = Ciervo.src;
    combate = true;
    menu_combate();
    inicio_combate(Ciervo);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
        mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
        escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
        enemigo.amistad -= 1;
        if(enemigo.vida <= 0){
            mostrarTexto("Has acabado con la vida del ciervo...");
            mostrarTexto("Te has quedado con su carne.");
            asignar_objeto("Carne seca");
            if(Math.floor(Math.random() * 100) > 96){
                mostrarTexto("Al fijarte bien ves que su cornamenta tiene brillos, ¡obserbandola mejor parece ser que esta hecha de oro!");
                asignar_objeto("Cornamenta Dorada");
            }
            exp += 1;
            finCombate();
        }else{Ciervo.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
        mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
        if(escudo_jugador < jugador.defensa){
            escudo_jugador = jugador.defensa;
        }
        Ciervo.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        if(jugador.inventarioContiene("Bayas Silvestres")){
            createButton('dar', 'Darle unas Bayas Silvestres', function() {
                mostrarTexto("Le das unas bayas silvestres al ciervo. Este empieza a comerselas, parece que le gustan.");
                recuperaVida(3, enemigo);
                jugador.quitarAlInventario("Bayas Silvestres");
                enemigo.amistad += 7;
                Ciervo.turno_enemigo();
            });
        };
        createButton('negociar', 'Acariciar', function() {
            mostrarTexto("Te acercas a el para intentar acariciarle.");
            if(Math.floor(Math.random() * 100) > 50){
            mostrarTexto("Le acaricias suavemente, parece gustarle.");
            enemigo.amistad += 3;
            Ciervo.turno_enemigo();
            }else{
            mostrarTexto("No se acaba de fiar de tí, sale corriendo bosque hacía a dentro");
            finCombate();
            }
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        mostrarTexto("¡Has escapado corriendo!");
        if(jugador.energia >= 1){jugador.energia -= 1;}
        finCombate();
        moverse(jugador, 5, world);
        });
    }
}

function combate_Bandido(){
    let convencer = 1;
    imagen.src = Bandido.src;
    combate = true;
    menu_combate();
    inicio_combate(Bandido);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
        mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
        escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
        if(enemigo.vida <= 0){
            mostrarTexto("Has acabado con la vida del bandido...");
            mostrarTexto("Te has quedado con sus objetos y sus " + enemigo.dinero + " monedas.");
            jugador.dinero += enemigo.dinero;
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            exp += 1;
            finCombate();
        }else{Bandido.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
        mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
        if(escudo_jugador < jugador.defensa){
            escudo_jugador = jugador.defensa;
        }
        Bandido.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        if(jugador.dinero > 0){
            createButton('dar', 'Darle todo tu dinero', function() {
            mostrarTexto("Le das todo tu dinero y le dices que no buscas problemas, el bandido coge el botín y sale corriendo.");
            jugador.dinero = 0;
            finCombate();
            });
        };
        createButton('negociar', 'Convencer', function() {
            mostrarTexto("Le das un sermón explicando que esa no es la manera de hacer las cosas, que siempre hay un futuro mejor. Tus palabras le dejan algo pensativo.");
            enemigo.amistad += convencer;
            convencer += convencer;
            Bandido.turno_enemigo();
        });
        createButton('captura', 'Capturarle', function() {
            if (enemigo.vida <= Math.floor(enemigo.vida_max * 0.65)){
                let recompensa = Math.floor(Math.random() * 801) + 100;
                jugador.dinero += recompensa;
                mostrarTexto("¡Has capturado al forajido! Al entregarlo a la guardia te han dado una recompensa de " + recompensa + " monedas.");
                finCombate();
            }else{
                mostrarTexto("¡El bandido tiene demasiada salud! Aún es escurridizo.");
                Bandido.turno_enemigo();
            }
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        if(jugador.velocidad >= enemigo.velocidad){
            mostrarTexto("¡Has escapado corriendo del conflicto!");
            if(jugador.energia >= 2){jugador.energia -= 2;}
            finCombate();
            moverse(jugador, 5, world);
        }else{
            mostrarTexto("¡El bandido es demasiado rápido! Tal vez a la próxima vez lo consigas.");
            enemigo.velocidad -= (Math.floor(Math.random() * 11) + 1);
            Bandido.turno_enemigo();
        }
        });
    }
}

function combate_Kappa(){
    imagen.src = Kappa.src;
    combate = true;
    menu_combate();
    inicio_combate(Kappa);

    function menu_combate(){
    createButton('atacar', 'Atacar', function() {
        mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
        enemigo.amistad -= 4;
        escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
        if(enemigo.vida <= 0){
        mostrarTexto("Has acabado con la vida del kappa...");
        mostrarTexto("Parece como si el propio agua lamentara su perdida con pequeños brillos en la superficie...");
        mostrarTexto("Te has quedado con su carne.");
        asignar_objeto("Algas Marinas");
        exp += 1;
        finCombate();
        }else{Kappa.turno_enemigo();}
    });

    createButton('defender', 'Defenderse', function() {
        mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
        enemigo.amistad += 2;
        if(escudo_jugador < jugador.defensa){
        escudo_jugador = jugador.defensa;
        }
        Kappa.turno_enemigo();
    });

    createButton('accion', 'Acciones', function() {
        quitarBotones();
        if(jugador.inventarioContiene("Pescado Fresco")){
        createButton('dar', 'Darle un Pescado Fresco', function() {
            mostrarTexto("Le das un Pescado Fresco. Este empieza a comerselo, ¡parece que le gusta!");
            recuperaVida(20, enemigo);
            jugador.quitarAlInventario("Pescado Fresco");
            enemigo.amistad += 10;
            Kappa.turno_enemigo();
        });
        };

        if(jugador.inventarioContiene("Concha Marina")){
        createButton('dar', 'Darle una Concha Marina', function() {
            mostrarTexto("Le das una Concha Marina. Este la obserba atentamente.");
            jugador.quitarAlInventario("Concha Marina");
            combate = false;
            Kappa.turno_enemigo();
        });
        };

        createButton('reverencia', 'Hacer una reverencia', function() {
        mostrarTexto("Haces una reverencia, el Kappa no puede evitar devolverla. Ha derramado el agua de su cabeza por lo que su energía vital se disipa.");
        mostrarTexto("El Kappa ha muerto.");
        asignar_objeto("Pescado Fresco");
        exp += 2;
        finCombate();
        });

        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
    });

    createButton('huir', 'Huir', function() {
        if(jugador.velocidad > enemigo.velocidad){
        mostrarTexto("¡Has escapado corriendo!");
        if(jugador.energia >= 1){jugador.energia -= 1;}
        finCombate();
        moverse(jugador, 5, world);
        }
        else{
        mostrarTexto("El Kappa es demasido rápido.");
        Kappa.turno_enemigo();
        }
    });
    }
}

function combate_Jabali(){
    imagen.src = Jabali.src;
    combate = true;
    menu_combate();
    inicio_combate(Jabali);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
            mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
            escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
            enemigo.amistad -= 1;
            if(enemigo.vida <= 0){
                mostrarTexto("Has acabado con la vida del jabalí...");
                mostrarTexto("Te has quedado con su carne.");
                asignar_objeto("Carne seca");
                exp += 1;
                finCombate();
            }else{Jabali.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
            mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
            if(escudo_jugador < jugador.defensa){
                escudo_jugador = jugador.defensa;
            }
            Jabali.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        if(jugador.inventarioContiene("Bayas Silvestres")){
            createButton('dar', 'Darle unas Bayas Silvestres', function() {
            mostrarTexto("Le das unas bayas silvestres al jabalí. Este empieza a comerselas, parece que le gustan.");
            recuperaVida(3, enemigo);
            jugador.quitarAlInventario("Bayas Silvestres");
            enemigo.amistad += 3;
            Jabali.turno_enemigo();
            });
        };
        createButton('negociar', 'Acariciar', function() {
            mostrarTexto("Te acercas a él para intentar acariciarle.");
            if(Math.floor(Math.random() * 100) > 70){
                mostrarTexto("Le acaricias suavemente, parece gustarle.");
                enemigo.amistad += 5;
            }else{
                mostrarTexto("No se acaba de fiar de tí.");
            }
            Jabali.turno_enemigo();
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
            mostrarTexto("¡Has escapado corriendo!");
            if(jugador.energia >= 1){jugador.energia -= 1;}
            finCombate();
            moverse(jugador, 5, world);
        });
    }
}

function combate_Orco(){
    imagen.src = Orco.src;
    combate = true;
    menu_combate();
    inicio_combate(Orco);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
            mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
            escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
            enemigo.amistad -= 1;
            if(enemigo.vida <= 0){
                mostrarTexto("Has acabado con la vida del orco...");
                mostrarTexto("Te has quedado con su dinero. Recibes " + enemigo.dinero + " monedas.");
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                jugador.dinero += enemigo.dinero;
                exp += 1;
                finCombate();
            }else{Orco.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
            mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
            if(escudo_jugador < jugador.defensa){
                escudo_jugador = jugador.defensa;
            }
            enemigo.amistad -= 1;
            Orco.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        createButton('dar', 'Darle 20 de Oro', function() {
            if(jugador.dinero >= 20){
            jugador.dinero -= 20;
            mostrarTexto("Le has lanzado 20 monedas de Oro, parece estar algo más contento contigo.");
            enemigo.amistad += 4;
            enemigo.dinero += 5;
            Orco.turno_enemigo();
            }else{
            mostrarTexto("¡No tienes dinero suficiente para darle!");
            }
        });
        createButton('negociar', 'Decirle un cumplido', function() {
            mostrarTexto("Le haces un cumplido al Orco...");
            if(Math.floor(Math.random() * 100) > 45){
                mostrarTexto("¡Parece que le ha gustado!");
                enemigo.amistad += 3;
            }else{
                mostrarTexto("No entiende que le has dicho así que esta molesto.");
                enemigo.amistad -= 1;
            }
            Orco.turno_enemigo();
        });
        createButton('amenaza', 'Amenazarle', function() {
            mostrarTexto("Le has amenazado directamente en tono serio...");
            if(Math.floor(Math.random() * 100) > 55){
                mostrarTexto("¡Parece que se lo ha tomado como un desafío!");
                enemigo.amistad += 1;
            }else{
                mostrarTexto("No le ha gustado nada lo que le has dicho...");
                enemigo.amistad -= 3;
            }
            Orco.turno_enemigo();
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        if(jugador.velocidad >= enemigo.velocidad){
            mostrarTexto("¡Has escapado corriendo del conflicto!");
            if(jugador.energia >= 2){jugador.energia -= 2;}
            finCombate();
            moverse(jugador, 5, world);
        }else{
            mostrarTexto("¡El Orco es demasiado rápido! Tal vez a la próxima vez lo consigas.");
            enemigo.velocidad -= (Math.floor(Math.random() * 4) + 1);
            Orco.turno_enemigo();
        }
        });
    }
}

function combate_Gigante(){
    imagen.src = Gigante.src;
    combate = true;
    menu_combate();
    inicio_combate(Gigante);
    let turn = 1;
    let alud = 0;

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
            mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
            escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
            enemigo.amistad -= 1;
            if(enemigo.vida <= 0){
                mostrarTexto("Has acabado con la vida del Gigante...");
                mostrarTexto("Te has quedado con su dinero. Recibes " + enemigo.dinero + " monedas.");
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                jugador.dinero += enemigo.dinero;
                exp += 5;
                finCombate();
            }else{
                turn *= -1;
                alud = Gigante.turno_enemigo(turn,alud);
            }
        });

        createButton('defender', 'Defenderse', function() {
            mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
            if(escudo_jugador < jugador.defensa){
                escudo_jugador = jugador.defensa;
            }
            turn *= -1;
            alud = Gigante.turno_enemigo(turn,alud);
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        createButton('canto', 'Cantar junto al gigante', function() {
            mostrarTexto("¡Decides cantar junto al gigante! Se le ve muy contento.");
            mostrarTexto(jugador.nombre + ": " + Gigante.cancion[Math.floor(Math.random()*Gigante.cancion.length)]);
            enemigo.amistad += 5;
            alud += 1;
            turn *= -1;
            alud = Gigante.turno_enemigo(turn,alud);
        });
        createButton('negociar', 'Decirle un cumplido', function() {
            mostrarTexto("Le haces un cumplido al Gigante...");
            if(Math.floor(Math.random() * 100) > 45){
                mostrarTexto("¡Parece que le ha gustado!");
                enemigo.amistad += 3;
            }else{
                mostrarTexto("¡No te ha escuchado!");
            }
            turn *= -1;
            alud = Gigante.turno_enemigo(turn,alud);
        });
        createButton('amenaza', 'Amenazarle', function() {
            mostrarTexto("Le has amenazado...");
            if(Math.floor(Math.random() * 100) > 55){
                mostrarTexto("¡Parece que no te ha escuchado!");
            }else{
                mostrarTexto("No le ha gustado nada lo que le has dicho...");
                enemigo.amistad -= 3;
            }
            turn *= -1;
            alud = Gigante.turno_enemigo(turn,alud);
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        if(jugador.velocidad >= enemigo.velocidad){
            mostrarTexto("¡Has escapado corriendo del conflicto!");
            if(jugador.energia >= 3){jugador.energia -= 3;}
            finCombate();
            moverse(jugador, 5, world);
        }else{
            mostrarTexto("¡El Gigante es demasiado rápido! Tal vez a la próxima vez lo consigas.");
            enemigo.velocidad -= (Math.floor(Math.random() * 4) + 1);
            turn *= -1;
            alud = Gigante.turno_enemigo(turn,alud);
        }
        });
    }
}

function combate_Fenix(){
    imagen.src = Fenix.src;
    combate = true;
    menu_combate();
    inicio_combate(Fenix);
    let revivir = false;

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
        mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
        escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
        enemigo.amistad -= 3;
        if(enemigo.vida <= 0){
            mostrarTexto("Has acabado con la vida del Fénix...");
            revivir = Fenix.turno_enemigo(revivir);
        }else{revivir = Fenix.turno_enemigo(revivir);}
        });

        createButton('defender', 'Defenderse', function() {
        mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
        if(escudo_jugador < jugador.defensa){
            escudo_jugador = jugador.defensa;
        }
        enemigo.amistad += 1;
        revivir = Fenix.turno_enemigo(revivir);
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        if(jugador.inventarioContiene("Bayas Silvestres")){
            createButton('dar', 'Darle unas Bayas Silvestres', function() {
                mostrarTexto("Le das unas bayas silvestres al Fénix. Este empieza a comerselas, parece que le gustan.");
                recuperaVida(3, enemigo);
                jugador.quitarAlInventario("Bayas Silvestres");
                enemigo.amistad += 4;
                revivir = Fenix.turno_enemigo(revivir);
            });
        };
        if(jugador.vida > 2){
            createButton('negociar', 'Acariciar', function() {
                mostrarTexto("Te acercas a él para intentar acariciarle, parece gustarle. Pero te has quitado 2 puntos de vida por las llamas...");
                jugador.vida -= 2;
                enemigo.amistad += 6;
                revivir = Fenix.turno_enemigo(revivir);
            });
        }else{
            createButton('negociar', 'Suplicar', function() {
                mostrarTexto("Le ruegas clemencia por tú vida...");
                enemigo.amistad += 18;
                revivir = Fenix.turno_enemigo(revivir);
            });
        }
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
            if(jugador.velocidad >= enemigo.velocidad){
                mostrarTexto("¡Has escapado corriendo del conflicto!");
                if(jugador.energia >= 2){jugador.energia -= 2;}
                finCombate();
                moverse(jugador, 5, world);
            }else{
                mostrarTexto("¡El Fénix es demasiado rápido! Tal vez a la próxima vez lo consigas.");
                enemigo.velocidad -= (Math.floor(Math.random() * 4) + 1);
                revivir = Fenix.turno_enemigo(revivir);
            }
        });
    }
}

function combate_Basilisco(){
    imagen.src = Basilisco.src;
    combate = true;
    menu_combate();
    inicio_combate(Basilisco);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
        mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
        escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
        if(enemigo.vida <= 0){
            mostrarTexto("Has acabado con la vida del Basilisco...");
            exp += Math.floor(Math.random()*100);
            finCombate();
        }else{Basilisco.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
        mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
        if(escudo_jugador < jugador.defensa){
            escudo_jugador = jugador.defensa;
        }
        Basilisco.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        if(jugador.inventarioContiene("Bayas Silvestres")){
            createButton('dar', 'Darle unas Bayas Silvestres', function() {
                mostrarTexto("Le das unas bayas silvestres al Basilisco. Este empieza a comerselas, parece que le gustan.");
                recuperaVida(3, enemigo);
                jugador.quitarAlInventario("Bayas Silvestres");
                enemigo.amistad += 6;
                Basilisco.turno_enemigo();
            });
        };
        if(jugador.inventarioContiene("Cristal de la confianza")){
            createButton('espejo', 'Cubrirte con el cristal', function() {
                mostrarTexto("Te has cubierto con el cristal. El rayo fulminante del basilisco queda atrapado dentro de este cristal, ahora es un cristal letal...");
                jugador.quitarAlInventario("Cristal de la confianza");
                asignar_objeto("Cristal letal");
                finCombate();
            });
        };
        createButton('cubrirte', 'Cubrirte detras de una piedra', function() {
            mostrarTexto("Te has cubierto detras de una piedra, ganas 20 puntos de protección.");
            escudo_jugador += 20;
            Basilisco.turno_enemigo();
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
            if(jugador.velocidad >= enemigo.velocidad){
                mostrarTexto("¡Has escapado corriendo del conflicto!");
                if(jugador.energia >= 2){jugador.energia -= 2;}
                finCombate();
                moverse(jugador, 5, world);
            }else{
                mostrarTexto("¡El Basilisco es demasiado rápido! Tal vez a la próxima vez lo consigas.");
                enemigo.velocidad -= (Math.floor(Math.random() * 4) + 1);
                Basilisco.turno_enemigo();
            }
        });
    }
}

function combate_Piratas(){
    imagen.src = Pirata.src[Math.floor(Math.random()*Pirata.src.length)];
    combate = true;
    menu_combate();
    inicio_combate(Pirata);
    let ancla = 1;
    let muertes = 0;

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
            mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
            escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
            if(enemigo.vida <= 0){
                mostrarTexto("Has acabado con la vida del pirata...");
                mostrarTexto("Te has quedado con sus objetos y sus " + enemigo.dinero + " monedas.");
                jugador.dinero += enemigo.dinero;
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                exp += 1;
                muertes += 1;
                mostrarTexto("...");
                if((Math.floor(Math.random()*10) - muertes) < 3){
                    mostrarTexto("Los piratas se han acobardado porque pareces un tipo muy fuerte.");
                    finCombate();
                }else{
                    enemigo = null;
                    escudo_oponente = 0;
                    inicio_combate(Pirata);
                    imagen.src = Pirata.src[Math.floor(Math.random()*Pirata.src.length)];
                    mostrarTexto("¡Te ha abordado otro pirata desde su barco!");
                }
            }else{ancla += Pirata.turno_enemigo();}
        });

        createButton('defender', 'Defenderse', function() {
        mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
        if(escudo_jugador < jugador.defensa){
            escudo_jugador = jugador.defensa;
        }
        ancla += Pirata.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        if(jugador.dinero > 0){
            createButton('dar', 'Darle todo tu dinero', function() {
            mostrarTexto("Le das todo tu dinero y le dices que no buscas problemas. El pirata coge el botín y se marcha.");
            jugador.dinero = 0;
            finCombate();
            });
        };
        createButton('negociar', 'Convencer', function() {
            mostrarTexto("Le das un sermón explicando que esa no es la manera de hacer las cosas, que siempre hay un futuro mejor. Tus palabras le dejan algo pensativo.");
            enemigo.amistad += 2;
            ancla += Pirata.turno_enemigo();
        });
        if(ancla > 0){
            createButton('captura', 'Desatar anclas', function() {
                mostrarTexto("Intentas quitar una de las anclas que te impiden huir...");
                if(Math.floor(Math.random()*10) >= 3){
                    if(ancla == 1){
                        mostrarTexto("¡Consigues quitar todas las anclas, puedes escapar!");

                    }else{
                        mostrarTexto("¡Consigues desatar una! Solo te quedan: " + ancla);
                    }
                    ancla -= 1;
                }else{
                    mostrarTexto("¡Estan demasido ancladas, intentalo de nuevo.");
                }
                ancla += Pirata.turno_enemigo();
            });
        }
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
            if(ancla <= 0){
                mostrarTexto("¡Escapas sin ningún problema del conflicto!");
            }else{
                mostrarTexto("Huir no es una opción cuando te tienen retenido con " + ancla + " anclas...");
            }
        });
    }
}

function combate_Sirena(){
    imagen.src = Sirena.src;
    combate = true;
    menu_combate();
    inicio_combate(Sirena);

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
            mostrarTexto("Decides atacarle, le has hecho " + jugador.ataque +" puntos de daño.");
            escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
            enemigo.amistad -= 3;
            if(enemigo.vida <= 0){
                mostrarTexto("Has acabado con la vida de la sirena...");
                mostrarTexto(comercio_sirena.nombre + ": " +comercio_sirena.frases[Math.floor(Math.random() * comercio_sirena.frases.length)] + "..");
                mostrarTexto("...");
                mostrarTexto("Te has quedado con su dinero. Recibes " + enemigo.dinero + " monedas.");
                asignar_objeto("Espuma de Sirena");
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                jugador.dinero += enemigo.dinero;
                exp += 5;
                finCombate();
            }else{
                Sirena.turno_enemigo();
            }
        });

        createButton('defender', 'Defenderse', function() {
            mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
            if(escudo_jugador < jugador.defensa){
                escudo_jugador = jugador.defensa;
            }
            Sirena.turno_enemigo();
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        createButton('canto', 'Cantar junto a la sirena', function() {
            mostrarTexto("¡Decides cantar junto a la sirena! Se le ve muy contenta.");
            mostrarTexto(jugador.nombre + ": " +comercio_sirena.frases[Math.floor(Math.random() * comercio_sirena.frases.length)]);
            enemigo.amistad += 6;
            Sirena.turno_enemigo();
        });
        createButton('negociar', 'Decirle un cumplido', function() {
            mostrarTexto("Le haces un cumplido a la sirena...");
            if(Math.floor(Math.random() * 100) > 45){
                mostrarTexto("¡Parece que le ha gustado!");
                enemigo.amistad += 3;
            }else{
                mostrarTexto("Ya no tiene intención de pelear.");
                combate = false;
            }
            Sirena.turno_enemigo();
        });
        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        if(jugador.velocidad >= enemigo.velocidad){
            mostrarTexto("¡Has escapado del conflicto!");
            if(jugador.energia >= 3){jugador.energia -= 3;}
            finCombate();
            moverse(jugador, 5, world);
        }else{
            mostrarTexto("¡La sirena es demasiado rápida! Tal vez a la próxima vez lo consigas.");
            enemigo.velocidad -= (Math.floor(Math.random() * 2) + 1);
            Sirena.turno_enemigo();
        }
        });
    }
}

function combate_Kraken(){
    imagen.src = Kraken.src;
    let tentáculos = Math.floor((Math.random() * 7) + 1);
    mostrarTexto(tentáculos + " tentáculos han salido de las aguas dispuestos a luchar.");
    combate = true;
    enemigo = JSON.parse(JSON.stringify(Kraken));
    if (enemigo.velocidad * tentáculos > jugador.velocidad){
        Kraken.turno_enemigo(tentáculos);
    }
    menu_combate();

    function menu_combate(){
        createButton('atacar', 'Atacar', function() {
            mostrarTexto("Decides atacar a uno de los tentáculos, le has hecho " + jugador.ataque +" puntos de daño.");
            escudo_oponente = conflicto(enemigo,jugador,escudo_oponente);
            if(enemigo.vida <= 0){
                if(tentáculos > 0){
                    mostrarTexto("Dañado a un tentáculo... Este vuelve a sumergirse malherido.");
                    asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                    if(tentáculos > 0){
                        mostrarTexto("Aún quedan otros "+ tentáculos + " tentáculos.");
                        enemigo.vida = enemigo.vida_max;
                        tentáculos -= 1;
                        exp += 2;
                        Kraken.turno_enemigo(tentáculos);
                    }else{
                        mostrarTexto("El kraken vuelve a las profundidades de los ocenos debido a los daños causados...");
                        finCombate();
                    }
                }else{
                    mostrarTexto("El kraken vuelve a las profundidades de los ocenos debido a los daños causados...");
                    finCombate();
                }
            }else{
                Kraken.turno_enemigo(tentáculos);
            }
        });

        createButton('defender', 'Defenderse', function() {
            mostrarTexto("Decides cubrirte y defenderte del próximo ataque.");
            if(escudo_jugador < jugador.defensa){
                escudo_jugador = jugador.defensa;
            }
            Kraken.turno_enemigo(tentáculos);
        });

        createButton('acciones', 'Acciones', function() {
        quitarBotones();
        
        if(jugador.inventarioContiene("Pedernal")){
            createButton('fuego', 'Encender un fuego', function() {
                mostrarTexto("Enciendes fuego con tu perdernal para quemar un trozo de madera, esto asusta al kraken y vuelve a las profundidades...");
                jugador.quitarAlInventario("Pedernal");
                finCombate();
            });
        }
        if(jugador.inventarioContiene("Romboide de arena celeste")){
            createButton('fin', 'Tirar el romboide de arena celeste por la borda', function() {
                mostrarTexto("Decides tirar el romboide de arena celeste por la borda de la barca.");
                mostrarTexto("Este cae directamente dónde esta el kraken, quien sin dudarlo dos veces se come el romboide.");
                mostrarTexto("Después de eso todo es un poco confuso, el mar empieza a brillar, las aguas se mueven como si fueran un trovellino furioso.");
                mostrarTexto("La barca es engullida por esta fuerza misteriosa.");
                jugador.quitarAlInventario("Romboide de arena celeste");
                finCombate();
                imagen.src = "https://w.wallhaven.cc/full/z8/wallhaven-z8g96v.jpg";
                quitarBotones();
                contenedorRosa.style.display = "none";
                setTimeout(function() {
                moverse(jugador,[tesoro[0],tesoro[1]], world, false);
                contenedorRosa.style.display = "block";}, 3500);
                mostrarTexto("De repente, vuelves a ser consciente, ya no estás en el mismo lugar...");
            });
        }
        
        createButton('pescado', 'Darle pescado al Kraken', function() {
            if(jugador.inventarioContiene("Pescado Fresco")){
                mostrarTexto("Lanzas tu pescado fresco al agua, parece que al kraken le ha gustado.");
                jugador.quitarAlInventario("Pescado Fresco");
                enemigo.amistad += 17;
                Kraken.turno_enemigo(tentáculos);
            }else{
                mostrarTexto("¡No tienes pescado fresco para darle!");
            }
        });
        
        createButton('negociar', 'Decir al kraken que no buscas problemas', function() {
            enemigo.amistad += 4;
            mostrarTexto("Gritas con todas tus fuerzas para que el kraken se vaya, no sabes si te ha logrado escuchar.");
            Kraken.turno_enemigo(tentáculos);
        });

        createButton('atras', 'Atrás', function() {quitarBotones(); menu_combate();});
        });

        createButton('huir', 'Huir', function() {
        if(jugador.velocidad >= enemigo.velocidad * tentáculos){
            mostrarTexto("¡Has escapado del conflicto!");
            if(jugador.energia >= 3){jugador.energia -= 3;}
            finCombate();
            moverse(jugador, 5, world);
        }else{
            mostrarTexto("Hay demasiados tentáculos, el kraken te tiene rodeado...");
            Kraken.turno_enemigo(tentáculos);
        }
        });
    }
}