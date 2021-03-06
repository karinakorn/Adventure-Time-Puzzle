// Representación de la grilla. Cada número representa a una pieza.
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Variable con la posición vacia
var filaVacia = 2;
var columnaVacia = 2;

// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];

// Arreglo que contiene las intrucciones del juego 
var instrucciones = ["Utiliza las flechas para mover las piezas", "Ordenar las piezas hasta alcanzar la imagen objetivo"];

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

// Recorre el arreglo de instrucciones pasadas por parámetro. 
function mostrarInstrucciones(instrucciones) {
  instrucciones.forEach(function (value) {
    mostrarInstruccionEnLista(value, 'lista-instrucciones')
  })
}

// agrega la última dirección al arreglo de movimientos
// y actualiza el tablero en pantalla 
function agregarUltimaDireccion(direccion) {
  movimientos.push(direccion);
  actualizarUltimoMovimiento(direccion);
}

// Verifica si el Rompecabezas está en la posicion ganadora.
function chequearSiGano() {
  var estanOrdenados = true
  var inicio = 0;
  grilla.forEach(function (arrayfila) {
    arrayfila.forEach(function (contenido) {
      if (contenido <= inicio) {
        estanOrdenados = false;
      }
      inicio = contenido;
    });

  })
  return estanOrdenados;
}

//  Anuncia que ganaste
function mostrarCartelGanador() {
  alert("¡Felicitaciones, ganaste!");
}

// Función que intercambia dos posiciones en la grilla.
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
  var posicionTemporal = grilla[filaPos1][columnaPos1];
  grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
  grilla[filaPos2][columnaPos2] = posicionTemporal;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;

}

// Verifica si el movimiento de fichas es válido
function posicionValida(fila, columna) {
  return fila < 3 && fila >= 0 && columna < 3 && columna >= 0;
}

/* Movimiento de fichas, en este caso la que se mueve es la vacia intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;

  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;

  }

  // A continuación se chequea si la nueva posición es válida, si lo es, se intercambia. 
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarUltimoMovimiento(direccion);
  }
}


//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////ViENEN INCLUIDAS EN EL TP DE ACÁMICA//////////
//////////////////////////////////////////////////////////

/* Las funciones y variables que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */

/* codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
  IZQUIERDA: 37,
  ARRIBA: 38,
  DERECHA: 39,
  ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}


/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
    codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
  ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function () {
    mezclarPiezas(veces - 1);
  }, 100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en 
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora, 
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
  document.body.onkeydown = (function (evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if (gano) {
        setTimeout(function () {
          mostrarCartelGanador();
        }, 500);
      }
      evento.preventDefault();
    }
  })
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces 
y ejecutando la función para que se capturen las teclas que 
presiona el usuario */
function iniciar() {
  mostrarInstrucciones(instrucciones);
  mezclarPiezas(30);
  capturarTeclas();
}

iniciar();