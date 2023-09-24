const Orco = { nombre: "Orco",  inventario: ["Espada","Escudo","Carne seca","Carne seca","Carne seca","Piedra Rúnica"], vida: 30, vida_max: 30, energia: 10, energia_max: 10, ataque: 15, defensa: 14, velocidad: 8, dinero: 25, src: "https://image.lexica.art/full_jpg/673d6c11-7ba4-45fe-93de-d1e1badf7c56", amistad: 8, testarudo: 20};
Orco.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            let ataque = enemigo.ataque;
            if(enemigo.vida <= enemigo.vida_max*0.5){
                if(num < 80 && inventarioContiene_enemigo("Carne seca")){
                    mostrarTexto("El Orco se come un poco de carne seca para recuperarse.");
                    quitarAlInventario_enemigo("Carne seca");
                    recuperaVida(enemigo.vida_max*1.35, enemigo);
                }else if(num < 70){
                    mostrarTexto("El Orco se pone en una posición defensiva.");
                    if(escudo_oponente < enemigo.defensa){
                        escudo_oponente = enemigo.defensa;
                    }
                }else{
                    if(enemigo.amistad < 5){
                        mostrarTexto("¡El Orco esta enfurecido!");
                        ataque *= 2;
                    }
                    if(escudo_jugador > 0){
                        mostrarTexto("Te ha atacado con " + ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                    }else{
                        mostrarTexto("Te ha atacado con " + ataque + " puntos de daño.");
                    }
                    escudo_jugador = conflicto_daño(jugador,ataque,escudo_jugador);
                    if(jugador.vida <= 0){
                        mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto...");
                        finDelJuego();
                    }
                }
            }
            else{
                if(num < 80){
                    if(enemigo.amistad < 5){
                        mostrarTexto("¡El Orco esta enfurecido!");
                        ataque *= 2;
                    }
                    if(escudo_jugador > 0){
                        mostrarTexto("Te ha atacado con " + ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                    }else{
                        mostrarTexto("Te ha atacado con " + ataque + " puntos de daño.");
                    }
                    escudo_jugador = conflicto_daño(jugador,ataque,escudo_jugador);
                    if(jugador.vida <= 0){
                        mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto...");
                        finDelJuego();
                    }
                }else {
                    mostrarTexto("El Orco se pone en una posición defensiva.");
                    if(escudo_oponente < enemigo.defensa){
                        escudo_oponente = enemigo.defensa;
                    }
                }
            }
        }else {
            mostrarTexto("El Orco se ha apiadado de tí, puedes irte, pero antes de hacerlo decide darte algo.");
            asignar_objeto("Ballesta");
            exp += 3;
            finCombate();
        }
    }
};

const Bandido = { nombre: "Bandido",  inventario: ["Daga","Pan","Legumbres"], vida: 40, vida_max: 40, energia: 20, energia_max: 20, ataque: 14, defensa: 8, velocidad: 12, dinero: 40, src: "https://image.lexica.art/full_jpg/109b557a-cc06-426d-af19-590474a9befc", amistad: 0, testarudo: 10}; 
Bandido.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo && jugador.dinero > 0){
            let num = Math.floor(Math.random()*100);
            if(num < 10){
                if(enemigo.vida <= enemigo.vida_max * 0.4){
                    mostrarTexto("El bandido sale huyendo debido a los golpes recibidos.");
                    finCombate();
                }else{
                    if(escudo_jugador > 0){
                        mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                    }else{
                        mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño.");
                    }
                    escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                    if(jugador.vida <= 0){
                        mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto...");
                        finDelJuego();
                    }
                }
            }else if(num < 20){
                if(escudo_jugador > 0){
                    mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto.");
                    finDelJuego();
                }
            }else if(num < 80){
                if(escudo_jugador > 0){
                    mostrarTexto("Te ha atacado con " + Math.floor(enemigo.ataque* 0.3) + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("Te ha atacado con " + Math.floor(enemigo.ataque* 0.3) + " puntos de daño.");
                }
                escudo_jugador = conflicto_daño(jugador, Math.floor(enemigo.ataque* 0.3) ,escudo_jugador);
                if(jugador.dinero > 5){
                    mostrarTexto("¡Oh no, tras el último golpe te ha robado "+ Math.floor(jugador.dinero * 0.35) +" monedas!");
                    enemigo.dinero += Math.floor(jugador.dinero * 0.35);
                    jugador.dinero -= Math.floor(jugador.dinero * 0.35);
                }else{
                    mostrarTexto("¡Oh no, tras el último golpe te ha robado "+ jugador.dinero +" monedas!");
                    enemigo.dinero += jugador.dinero;
                    jugador.dinero -= jugador.dinero;
                }
                if(jugador.vida <= 0){
                    mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto.");
                    finDelJuego();
                }
                
            }else {
                if(enemigo.vida <= enemigo.vida_max * 0.4){
                    mostrarTexto("El bandido sale huyendo debido a los golpes recibidos.");
                    finCombate();
                }else{
                    mostrarTexto("El bandido se pone en una posición defensiva.");
                    if(escudo_oponente < enemigo.defensa){
                        escudo_oponente = enemigo.defensa;
                    }
                }
            }
        }else {
            mostrarTexto("El bandido se ha apiadado de tí y sale corriendo.");
            exp += 3;
            finCombate();
        }
    }
};

const Ciervo = { nombre: "Ciervo",  inventario: ["Bayas Silvestres"], vida: 15, vida_max: 15, energia: 20, energia_max: 20, ataque: 13, defensa: 8, velocidad: 24, dinero: 0, src: "https://image.lexica.art/full_jpg/54d4e79d-73ac-4a5f-9aa8-06c630cce237", amistad: 2, testarudo: 5};
Ciervo.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            if(num < 20){
                if(escudo_jugador > 0){
                    mostrarTexto("El ciervo te embiste con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("El ciervo te embiste con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("La embestida ha dado el golpe fulminante que ha acabado con tu vida. El ciervo acto seguido sale corriendo.");
                    finDelJuego();
                }
            }else if(num < 40){
                mostrarTexto("El ciervo pasa a optar por una postura a la defensiva.");
                if(escudo_oponente < enemigo.defensa){
                    escudo_oponente = enemigo.defensa;
                }
            }else if(num < 80){
                if(enemigo.vida < enemigo.vida_max){
                    mostrarTexto("Confundido por el daño recibido el ciervo te observa con detenimiento.");
                }
                else{
                    mostrarTexto("El ciervo te observa con una postura majestuosa digna de un rey.");
                }
            }else {
                mostrarTexto("Sale corriendo y se escabullo entre las sombras del bosque.");
                finCombate();
            }
        }else {
            mostrarTexto("El ciervo esta agradecido contigo y os habéis hecho amigos. Te da un objeto como muestra de gratitud, acto seguido sale corriendo bosque a dentro.");
            asignar_objeto("Gota del alba");
            exp += 3;
            finCombate();
        }
    }
};

const Duende = { nombre: "Duende",  inventario: ["Gota del alba","Tallo del Bosque","Tallo del Bosque","Espada hoja","Bayas Silvestres","Bayas Silvestres"], vida: 10, vida_max: 10, energia: 30, energia_max: 30, ataque: 8, defensa: 5, velocidad: 18, dinero: 15, src: "https://image.lexica.art/full_jpg/b3b013ea-399d-4fc0-8fa5-aaed722eda89", amistad: 3, testarudo: 7};
Duende.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            if(Math.floor(Math.random()*100) < 65){
                if(escudo_jugador > 0){
                    mostrarTexto("El Duende te ha atacado con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("El Duende te ha atacado con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("El Duende te ha dado el golpe fulminante que ha acabado con tu vida.");
                    finDelJuego();
                }
            }else{
                mostrarTexto("El Duende ha decidido cubrirse detrás de una piedra. Se esta defendiendo.");
                if(escudo_oponente < enemigo.defensa){
                    escudo_oponente = enemigo.defensa;
                }
            }
        }else {
            mostrarTexto("El Duende esta agradecido contigo y os habéis hecho amigos. Te ha dado unos objetos como regalo.");
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            exp += 3;
            finCombate();
        }
    }
};

const Kappa = { nombre: "Kappa",  inventario: ["Concha Marina","Pescado Fresco","Algas Marinas","Algas Marinas"], vida: 35, vida_max: 35, energia: 20, energia_max: 20, ataque: 7, defensa: 20, velocidad: 7, dinero: 0, src: "https://www.ancient-origins.net/sites/default/files/field/image/kappa-mythological-creature.jpg", amistad: 4, testarudo: 8};
Kappa.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            if(num < 25){
                if(escudo_jugador > 0){
                    mostrarTexto("El Kappa te ha atacado con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("El Kappa te ha atacado con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("El Kappa da un golpe fulminante acabando con tu vida.");
                    mostrarTexto("Kappa: Lo siento humano, eres una amenaza demasiado grande.");
                    finDelJuego();
                }
            }else if( num < 70){
                mostrarTexto("El Kappa se protege en su coraza. Se esta defendiendo.");
                if(escudo_oponente < enemigo.defensa){
                    escudo_oponente = enemigo.defensa;
                }
            }else{
                mostrarTexto("El Kappa ha empezado a decir algo en un lenguaje incomprensible. Notas que eres más lento.");
                jugador.velocidad -= 3;
                if (jugador.velocidad <= 0){jugador.velocidad = 1;}
            }
        }else {
            mostrarTexto("Kappa: Humano, veo que no eres una amenaza.");
            mostrarTexto("Kappa: Te dejaré pasar por esta zona, siempre y cuando no lastimes estas tierras.");
            mostrarTexto("Kappa: Toma, unos obsequios en señal de paz.");
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            exp += 3;
            finCombate();
        }
    }else{
        mostrarTexto("Kappa: Humano, veo que me has regalado una concha marina, ¿Es por la tradición?");
        quitarBotones();
        createButton('si', 'Si', function() {
            mostrarTexto("Kappa: Muy bien, pues es mi deber entregarte esto y despedirme.");
            asignar_objeto("Romboide de arena celeste");
            finCombate();
        });
        createButton('no', 'No', function() {
            mostrarTexto("Kappa: Vaya, ya entiendo, es en señal de amistad. Te daré unos objetos en señal de gratitud.");
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            finCombate();
        });
        createButton('que', 'Que', function() {
            mostrarTexto("Kappa: La tradicción dictamina que si un Kappa recibe una concha de un humano este debe de darle el cubo de las arenas en señal de respeto.");
            mostrarTexto("Kappa: Entiendo que si me lo has dado no es por la tradición sino es en señal de amistad. Te daré unos objetos en señal de gratitud.");
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
            finCombate();
        });
    }
};

const Jabali = { nombre: "Jabalí",  inventario: ["Bayas Silvestres"], vida: 20, vida_max: 20, energia: 10, energia_max: 10, ataque: 16, defensa: 4, velocidad: 16, dinero: 0, src: "https://image.lexica.art/full_jpg/f19863de-df6d-4f2a-b40a-0e72ecf04f8e", amistad: 0, testarudo: 7};
Jabali.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            if(num < 60){
                if(escudo_jugador > 0){
                    mostrarTexto("El jabalí te embiste con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("El jabalí te embiste con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("La embestida ha dado el golpe fulminante que ha acabado con tu vida. El jabalí acto seguido sale corriendo.");
                    finDelJuego();
                }
            }else if(num < 70){
                mostrarTexto("El jabalí pasa a optar por una postura a la defensiva.");
                if(escudo_oponente < enemigo.defensa){
                    escudo_oponente = enemigo.defensa;
                }
            }else {
                mostrarTexto("Sale corriendo y se escabulle entre los matorrales.");
                finCombate();
            }
        }else {
            mostrarTexto("Parece que te has hecho amigo del jabalí. Este se va un momento y al rato regresa con algo para darte.");
            asignar_objeto("Bizcocho");
            exp += 3;
            finCombate();
        }
    }
};

const Gigante = { nombre: "Gigante",  inventario: ["Carne seca","Carne seca","Carne seca","Gota del alba","Gemas Preciosas","Gemas Preciosas"], vida: 155, vida_max: 155, energia: 6, energia_max: 6, ataque: 20, defensa: 4, velocidad: 5, dinero: 70, src: "https://image.lexica.art/full_jpg/e49b6bfb-0de1-4332-b9c0-fabdd7632a7e", amistad: 4, testarudo: 16,
    cancion: ["Las montañas son majestuosas, imponentes, eternas.","Se elevan hacia el cielo, desafiando las nubes, besando el sol.","Sus cumbres nevadas son un espectáculo de belleza, un símbolo de fuerza y poder.","Sus laderas están cubiertas de bosques que albergan una gran variedad de vida silvestre, un oasis de paz y tranquilidad.","Las montañas son un lugar de inspiración, un lugar para escapar del ajetreo y el bullicio de la vida cotidiana, un lugar para encontrar la paz y la tranquilidad.", "Son un lugar para conectarse con la naturaleza, para sentir la grandeza de los elementos, para apreciar la belleza del mundo que nos rodea.", "Las montañas son un lugar sagrado, un lugar de poder y magia, un lugar de sueños y esperanza."]
};
Gigante.turno_enemigo = function(turn,alud){
    if(combate){
        if(turn > 0){
            if(enemigo.amistad < enemigo.testarudo){
                let num = Math.floor(Math.random()*100);
                if(num < 60){
                    if(alud < 3){
                        mostrarTexto("El gigante se ha puesto a cantar alegremente, el eco de su canto resuena por el terreno.");
                        mostrarTexto("Gigante: " + Gigante.cancion[Math.floor(Math.random()*Gigante.cancion.length)]);
                        alud += 1;
                    }else{
                        mostrarTexto("¡El canto ha sido tan fuerte que ha provocado un desprendimiento!");
                        mostrarTexto("Te alejas arrastrado.");
                        jugador.vida *= 0.5;
                        enemigo = null;
                        combate = false;
                        quitarBotones();
                        imagen.src = "https://w.wallhaven.cc/full/z8/wallhaven-z8g96v.jpg";
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
                    }
                }else {
                    if(enemigo.amistad > 9){
                        mostrarTexto("El gigante pasa a optar por una postura más defensiva.");
                        if(escudo_oponente < enemigo.defensa){
                            escudo_oponente = enemigo.defensa;
                        }
                    }else{
                        if(escudo_jugador > 0){
                            mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                        }else{
                            mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño.");
                        };
                        escudo_jugador = conflicto_daño(jugador,enemigo.ataque,escudo_jugador);
                        if(jugador.vida <= 0){
                            mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto...");
                            finDelJuego();
                        }
                    }
                }
            }else {
                mostrarTexto("Le has caído bien, puedes irte, pero antes de hacerlo decide darte algo.");
                asignar_objeto(enemigo.inventario[Math.floor(Math.random() * enemigo.inventario.length)]);
                asignar_objeto("Pico de Cañerul");
                exp += 3;
                finCombate();
            }
        }
    }
    return alud;
};

const Fenix = { nombre: "Fénix",  inventario: [], vida: 25, vida_max: 25, energia: 20, energia_max: 20, ataque: 7, defensa: 8, velocidad: 24, dinero: 0, src: "https://image.lexica.art/full_jpg/b56992db-334d-4fb9-9e8f-355315fa60ae", amistad: 3, testarudo: 25};
Fenix.turno_enemigo = function(revivir){
    if(combate){
        if(enemigo.vida > 0){
            if(enemigo.amistad < enemigo.testarudo){
                let num = Math.floor(Math.random()*100);
                if(enemigo.vida < enemigo.vida_max * 0.4 && revivir == false){
                    revivir = true;
                    mostrarTexto("Su plumaje empieza a brillar con fuerza, parece que reluce como el mismo sol.");
                }else{
                    if(num < 25){
                        if(escudo_jugador > 0){
                            mostrarTexto("El Fénix te embiste con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                        }else{
                            mostrarTexto("El Fénix te embiste con " + enemigo.ataque + " puntos de daño.");
                        }
                        escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                        if(jugador.vida <= 0){
                            mostrarTexto("El último ataque ha dado el golpe fulminante que ha acabado con tu vida.");
                            finDelJuego();
                        }
                    }else if(num < 40){
                        mostrarTexto("El Fénix pasa a optar por una postura a la defensiva.");
                        if(escudo_oponente < enemigo.defensa){
                            escudo_oponente = enemigo.defensa;
                        }
                    }else if(num < 95){
                        if(enemigo.vida < enemigo.vida_max){
                            mostrarTexto("Confundido por el daño recibido el Fénix te observa con detenimiento.");
                            mostrarTexto("Parece que esta recuperando su vida...");
                            recuperaVida(enemigo.vida_max*1.25, enemigo);
                        }
                        else{
                            mostrarTexto("El Fénix te observa con una postura majestuosa digna de un rey.");
                        }
                    }else {
                        mostrarTexto("Sale volando dirección hacía el sol, se pierde de vista y parece fusionarse con los propios rayos de luz.");
                        finCombate();
                    }
                }
            }else {
                mostrarTexto("El Fénix esta agradecido contigo y os habéis hecho amigos. Te da información como muestra de gratitud.");
                mostrarTexto("Fénix: El tesoro... esta...");
                let x = tesoro[0] - jugador.x;
                let y = tesoro[1] - jugador.y;
                if(x > 0){
                mostrarTexto("Fénix: " + x +" pasos al Sur...");
                }else{
                mostrarTexto("Fénix: " + Math.abs(x) +" pasos al Norte...");
                }
                if(y > 0){
                mostrarTexto("Fénix: " + y +" pasos al Este...");
                }else{
                mostrarTexto("Fénix: " + Math.abs(y) +" pasos al Oeste...");
                }
                mostrarTexto("Acto seguido sale volando perdiéndose en el firmamento.");
                exp += 5;
                finCombate();
            }
        }else{
            if(revivir){
                mostrarTexto("Pero... el Fénix ha resurgido de entre las cenizas, volviendo a la vida de nuevo.");
                enemigo.vida = enemigo.vida_max;
                revivir = false;
            }else{
                exp += 3;
                finCombate();
            }
        }
    }
    return revivir;
};

const Basilisco = { nombre: "Basilisco",  inventario: [], vida: 40, vida_max: 40, energia: 10, energia_max: 10, ataque: 1, defensa: 5, velocidad: 14, dinero: 0, src: "https://image.lexica.art/full_jpg/b9695291-f0dd-4e44-b982-d961ff044afa", amistad: 2, testarudo: 10};
Basilisco.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            let ataque = jugador.vida_max;
            if(num < 60){
                if(Math.floor(Math.random()*100) > 80){
                    if(escudo_jugador > 0){
                        mostrarTexto("El Basilisco te lanza un rayo letal de " + ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                    }else{
                        mostrarTexto("El Basilisco te lanza un rayo letal de " + ataque + " puntos de daño.");
                    }
                    escudo_jugador = conflicto_daño(jugador,ataque,escudo_jugador);
                    if(jugador.vida <= 0){
                        mostrarTexto("El rayo te impacta directamente convirtiéndote en piedra al instante. Has muerto.");
                        finDelJuego();
                    }
                }else{
                    mostrarTexto("Un rayo letal sale de los ojos del Basilisco, un sudor frío te recorre ya que el impacto ha estado cerca...");
                }
            }else if(num < 70){
                mostrarTexto("El Basilisco pasa a optar por una postura a la defensiva.");
                if(escudo_oponente < enemigo.defensa){
                    escudo_oponente = enemigo.defensa;
                }
            }else {
                mostrarTexto("Se acicala el plumaje... ¡Parece que ahora es más rápido!");
                enemigo.velocidad += (Math.floor(Math.random() * 4) + 1);
            }
        }else {
            mostrarTexto("Parece que el Basilisco se ha cansado de perseguirte, vuelve a las montañas a dormir...");
            exp += Math.floor(Math.random()*100);
            finCombate();
        }
    }
};

const Pirata = { nombre: "Bandido",  inventario: ["Pan","Legumbres","Pan","Legumbres","Algas Marinas","Algas Marinas","Algas Marinas","Algas Marinas","Pescado Fresco","Pescado Fresco","Pescado Fresco"], vida: 20, vida_max: 20, energia: 10, energia_max: 10, ataque: 7, defensa: 7, velocidad: 7, dinero: 50, 
    src: ["https://image.lexica.art/full_jpg/4152a1c7-e913-421b-8792-b3429d924568","https://image.lexica.art/full_jpg/3301c00b-d236-4214-89ec-336fd0715577","https://image.lexica.art/full_jpg/00335e81-ee13-467e-ac87-68b72426d12e","https://image.lexica.art/full_jpg/d70f2b7b-ef9b-4f8c-9605-67fd4c537e70","https://image.lexica.art/full_jpg/488ab0b1-b721-423d-8ed6-67c3d8fefb7a","https://image.lexica.art/full_jpg/49c2ed19-d2c7-48a8-9b80-a3f02bc9366a","https://image.lexica.art/full_jpg/3689ac0d-7a39-4e0f-8d71-23fc74cfc2cb","https://image.lexica.art/full_jpg/0b5ddd18-db8d-4d61-bbfa-aa8ab69415d7","https://image.lexica.art/full_jpg/aae49db6-6c2d-4476-b107-2ad648a5f49a","https://image.lexica.art/full_jpg/4bc6fdb6-7c46-4881-8463-d214cf11ff39"], 
    amistad: 0, testarudo: 15
}; 
Pirata.turno_enemigo = function(){
    let ancla = 0;
    if(combate){
        if(enemigo.amistad < enemigo.testarudo && jugador.dinero > 0){
            let num = Math.floor(Math.random()*100);
            if(num < 20){
                mostrarTexto("¡Te ha atado un ancla extra a tu barca! Ahora es más difícil huir");
                ancla = 1;
            }else if(num < 50){
                if(escudo_jugador > 0){
                    mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("Te ha atacado con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto.");
                    finDelJuego();
                }
            }else if(num < 80){
                if(escudo_jugador > 0){
                    mostrarTexto("Te ha atacado con " + Math.floor(enemigo.ataque* 0.7) + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("Te ha atacado con " + Math.floor(enemigo.ataque* 0.7) + " puntos de daño.");
                }
                escudo_jugador = conflicto_daño(jugador, Math.floor(enemigo.ataque* 0.7) ,escudo_jugador);
                if(jugador.dinero > 5){
                    mostrarTexto("¡Oh no, tras el último golpe te ha robado "+ Math.floor(jugador.dinero * 0.35) +" monedas!");
                    enemigo.dinero += Math.floor(jugador.dinero * 0.35);
                    jugador.dinero -= Math.floor(jugador.dinero * 0.35);
                }else{
                    mostrarTexto("¡Oh no, tras el último golpe te ha robado "+ jugador.dinero +" monedas!");
                    enemigo.dinero += jugador.dinero;
                    jugador.dinero -= jugador.dinero;
                }
                if(jugador.vida <= 0){
                    mostrarTexto("El golpe que te ha asestado ha sido fatídico y te has muerto.");
                    finDelJuego();
                }
                
            }else {
                if(enemigo.vida <= enemigo.vida_max * 0.4){
                    mostrarTexto("El pirata se ha tomado unas hierbas que tenía escondidas...");
                    recuperaVida(10,enemigo);
                }else{
                    mostrarTexto("El pirata se pone en una posición defensiva.");
                    if(escudo_oponente < enemigo.defensa){
                        escudo_oponente = enemigo.defensa;
                    }
                }
            }
        }else {
            mostrarTexto("Los piratas se apiadan de ti y te dejan escapar sin problema alguno.");
            exp += 2;
            finCombate();
        }
    }
    return ancla;
};

const Sirena = { nombre: "Sirena",  inventario: ["Cola de Tritón","Escamas de Coral"], vida: 25, vida_max: 25, energia: 20, energia_max: 20, ataque: 8, defensa: 12, velocidad: 16, dinero: 150, src: "https://image.lexica.art/full_jpg/0f50af94-aa58-434d-9cd3-178fc4677603", amistad: 5, testarudo: 10};
Sirena.turno_enemigo = function(){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            if(num < 30){
                if(escudo_jugador > 0){
                    mostrarTexto("La sirena te muerde con " + enemigo.ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("La sirena te muerde con " + enemigo.ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto(jugador,enemigo,escudo_jugador);
                mostrarTexto("¡Se ha comido tu carne!");
                recuperaVida(8,enemigo);
                if(jugador.vida <= 0){
                    mostrarTexto("Tras el último mordisco ha acabado con tu vida. Has caído al agua, perdiéndote en las profundidades del mar...");
                    finDelJuego();
                }
            }else if(num < 60){
                mostrarTexto("La sirena pasa a optar por una postura a la defensiva.");
                if(escudo_oponente < enemigo.defensa){
                    escudo_oponente = enemigo.defensa;
                }
            }else if(num < 80){
                mostrarTexto("La sirena empieza a cantar una melodía...");
                mostrarTexto(comercio_sirena.nombre + ": " +comercio_sirena.frases[Math.floor(Math.random() * comercio_sirena.frases.length)]);
                num = Math.floor(Math.random()*100);
                if(num < 33){
                    mostrarTexto("Su voz es tan cautivadora que has bajado la guardia y tu defensa ha disminuido 3 puntos...");
                    jugador.defensa -= 3;
                }else if(num < 66){
                    mostrarTexto("Su voz es tan cautivadora que no quieres herirle y tu ataque ha disminuido 3 puntos...");
                    jugador.ataque -= 3;
                }else{
                    mostrarTexto("Su voz es tan cautivadora que deseas no irte y tu velocidad ha disminuido 3 puntos...");
                    jugador.velocidad -= 3;
                }
            }else {
                mostrarTexto("La sirena te observa fijamente...");
                combate = false;
            }
        }else {
            mostrarTexto("Le has caído bien así que ha decidido cantarte una melodía explicándote dónde esta lo que andas buscando");
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
            finCombate();
        }
    }else{
        finCombate();
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
    }
};

const Kraken = { nombre: "Kraken",  inventario: ["Pescado Fresco","Escamas de Coral","Algas Marinas"], vida: 15, vida_max: 15, energia: 12, energia_max: 12, ataque: 6, defensa: 4, velocidad: 8, dinero: 0, src: "https://i.pinimg.com/564x/9c/a7/97/9ca797fb024b5660d1848d653705105e.jpg", amistad: 0, testarudo: 100};
Kraken.turno_enemigo = function(tentáculos){
    if(combate){
        if(enemigo.amistad < enemigo.testarudo){
            let num = Math.floor(Math.random()*100);
            let ataque = enemigo.ataque * tentáculos;
            if(num < 60){
                if(escudo_jugador > 0){
                    mostrarTexto("El Kraken te ataca con todos sus tentáculos, inflige " + ataque + " puntos de daño. Pero has parado " + escudo_jugador + " del daño gracias a que estabas cubierto.");
                }else{
                    mostrarTexto("El Kraken te ataca con todos sus tentáculos, inflige " + ataque + " puntos de daño.");
                }
                escudo_jugador = conflicto_daño(jugador,ataque,escudo_jugador);
                if(jugador.vida <= 0){
                    mostrarTexto("Tras el último golpe ha acabado con tu vida. El Kraken enrolla sus tentáculos a la barca y la sumerge a lo más profundo de los mares...");
                    finDelJuego();
                }
            }else{
                mostrarTexto("Los tentáculos pasan a optar por una postura a la defensiva.");
                if(escudo_oponente < enemigo.defensa * tentáculos){
                    escudo_oponente = enemigo.defensa * tentáculos;
                }
            }
        }else {
            mostrarTexto("El kraken se ha cansado, se ha ido a las profundidades del océano.");
            mostrarTexto("Tras este encuentro una calma te invade, recuperas toda tu energía.");
            jugador.energia = jugador.energia_max;
            if(Math.abs(tesoro[0] - jugador.x) < 4 || Math.abs(tesoro[1] - jugador.y) < 4){
                mostrarTexto("¡El rastro de la corriente parece indicar que lo que buscas esta cerca!");
            }else{
                mostrarTexto("El rastro de la corriente parece indicar que lo que buscas esta lejos de aquí.");
            }
            finCombate();
        }
    }
};