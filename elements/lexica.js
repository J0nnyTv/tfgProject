// Imagenes Lexica
function colocar_imagen_world(word, variable){
    fetch("https://lexica.art/api/v1/search?q="+word)
    .then(response => {
    if (response.ok) {
        return response.json(); // Devuelve los datos en formato JSON
    } else {
        throw new Error('Error en la solicitud GET'); // Lanza un error si la respuesta no es exitosa
    }
    })
    .then(data => {
    // Manipula los datos de la respuesta --> console.log(data.images[Math.floor(Math.random() * data.images.length)].src);
    switch (variable) {
        case 0:
            lexica_bosque = data.images;
            break;
        case 1:
            lexica_montana = data.images;
            break;
        case 2:
            lexica_playa = data.images;
            break;
        case 3:
            lexica_mar = data.images;
            break;
        case 4:
            lexica_poblado = data.images;
            break;
        case 5:
            lexica_prado = data.images;
            break;
        default:
          console.log("No hay número válido en el segundo parámetro");
          break;
      }
      return true
    })
    .catch(error => {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error(error);
    return null;
    });
}
//Math.floor(Math.random() * nombres.length)
var lexica_bosque = null; colocar_imagen_world("forest Hyperrealistic", 0);
var lexica_montana = null; colocar_imagen_world("mountains landscape", 1);
var lexica_playa = null; colocar_imagen_world("coast landscape", 2);
var lexica_mar = null; colocar_imagen_world("ship in the rough ocean", 3);
var lexica_poblado = null; colocar_imagen_world("medieval village", 4);
var lexica_prado = null; colocar_imagen_world("realistic  meadow landscape", 5);