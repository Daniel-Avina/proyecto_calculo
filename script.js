/*
CODIGO ITERATIVO USANDO EL LENGUAJE DE PROGRAMACION JAVASCRIPT

LEONARDO DANIEL AVIÑA NERI

descenso de gradiente
MAX: X(k+1) = X(k) + a f'( X(k) )
MIN: X(k+1) = X(k) - a f'( X(k) )
*/

// respuestas de forma analítica: a) p(x)=550-1x/10, b) $175, c)$100

// a) p(x)=550-1x/10: funcion de demanda (precio unitario)
function p(x) {
  return 550 - x / 10;
}

// funcion para calcular el descuento, se usa para obtener los resultados b) y c) 
// sustituyendo x por el punto maximo que obtenemos por descenso de gradiente
function descuento(x){
  return 450 - p(x) ;
  // return (450 - p(x) ) / 100;
}

/* b) maximizar funcion de ingreso
      ingreso = (precio unitario) * cantidad
      I(x) = p(x) * x
      I(x) = (550 - x/10) * x
      I(x) = 550x - x^2/10
      I'(x) = 550 - x/5
      0 = 550 - x/5
      x = 2750 -> punto critico

      I''(x) = -1/5
      I''(2750) = -1/5 -> negativo -> maximo
      p(2750) = 550 - 2750/10 = 275

      I(2750) = 275 * 2750 = 756250

      275*10 porque la funcion esta "en terminos de 10"
      MAX(2750, 756250)

*/

// funcion I(x) que representa el ingreso 
function I(x) {
  return p(x) * x;
}

// funcion I'(x)
function I_p(x) {
  return 550 - x / 5;
}

// funcion I''(x)
function I_pp() {
  return -1 / 5;
}

/*
c) maximizar sus ganancias
Ganancia (utilidad) = ingreso - costo
G(x) = I(x) - C(x)
G(x) = (550 - x/10) * x - (68000 + 150x)
G(x) = 550x - x^2/10 - 68000 - 150x

G(x) = 400x - x^2/10 - 68000

G'(x) = 400 - x/5
0 = 400 - x/5 -> x = 2000 -> punto critico
G''(x) = -1/5
G''(2000) = -1/5 -> negativo -> maximo en x = 2000

G(2000) =400(2000) - (2000)^2/10 - 68000 = 332000

MAX(2000, 332000)

*/

// funcion de costo C(x)
function C(x) {
  return 68000 + 150 * x;
}

// funcion de utilidad G(x)
function G(x) {
  return I(x) - C(x);
}

// funcion G'(x)
function G_p(x) {
  return 400 - x / 5;
}

// funcion G''(x)
function G_pp() {
  return -1 / 5;
}

// ---------------------------------------------------------
// resolver usando descenso de gradiente

// clase para almacenar los datos de la tabla
class Tabla {
  constructor(i, x_k, f_p, a, x_k1) {
      this.i = i;
      this.x_k = x_k;
      this.f_p = f_p;
      this.a = a;
      this.x_k1 = x_k1;
  }
}

// VARIABLES PARA B)
let a=0.5 // learning rate
let tabla_b = [] // tabla de descenso de gradiente para b)
let x_k = 0 // valor inicial de x
let x_k1 = 0 // valor de x en la siguiente iteracion
let punto_b // punto maximo de b)

// "b) maximizar funcion de ingreso"
// sabemos que el Maximo es en (2750, 756250) por lo que nos debe de dar un valor cercano a 2750
for (let i = 0; i < 170; i++) {
  x_k1=x_k + a * I_p(x_k);
  tabla_b[i]=new Tabla(i, x_k, I_p(x_k), a, x_k1);
  x_k=x_k1;
}

// imprimir tabla y resultado final de b) por consola
punto_b=x_k
console.table(tabla_b)
console.log(`b) MAX en ${punto_b.toFixed(3)} es ${I(punto_b).toFixed(5)}`)

let respuesta_b = descuento(punto_b) // respuesta de b) descuento en el punto maximo 

// "c) maximizar sus ganancias"
// sabemos que el Maximo es en (2000, 332000) por lo que nos debe de dar un valor cercano a 2000

// VARIABLES PARA c)
let tabla_c = [] // tabla de descenso de gradiente para c)
a=0.27 // learning rate
x_k = 0 // valor inicial de x
let punto_c // punto maximo

// ciclo para encontrar el minimo de la funcion de costo
for (let i = 0; i < 300; i++) {
  x_k1=x_k + a * G_p(x_k);
  tabla_c[i]=new Tabla(i, x_k, G_p(x_k), a, x_k1);
  x_k=x_k1;
}

// imprimir tabla y resultado final de c) por consola
punto_c=x_k
console.table(tabla_c)
console.log(`b) MAX en ${punto_c.toFixed(5)} es ${G(punto_c)}`)

let respuesta_c = descuento(punto_c) // tamaño de la caja para maximizar las ganancias

// aqui termina el codigo de descenso de gradiente

// ---------------------------------------------------------
// generar la tabla HTML

document.addEventListener('DOMContentLoaded', () => {

  // obtener elementos del DOM para mostrar los resultados
  const b_resp = document.getElementById('b_resp');
  const c_resp = document.getElementById('c_resp');

  // mostrar los resultados en el DOM
  b_resp.textContent = `b) DESCUENTO( ${punto_b.toFixed(8)} ) = ${respuesta_b.toFixed(5)}) `;
  

  c_resp.textContent = `c) DESCUENTO( ${punto_c.toFixed(8)} ) = ${respuesta_c.toFixed(5)}) `;

  // generar la tabla HTML
  function generarTabla(datos, tbodyId) {
      const tbody = document.getElementById(tbodyId);
      datos.forEach(dato => {
          let row = document.createElement('tr');
          row.innerHTML = `
              <td>${dato.i}</td>
              <td>${dato.x_k.toFixed(4)}</td>
              <td>${dato.f_p.toFixed(4)}</td>
              <td>${dato.a}</td>
              <td>${dato.x_k1.toFixed(8)}</td>
          `;
          tbody.appendChild(row);
      });
  }

  // generar y agregar la tabla para tabla_b
  generarTabla(tabla_b, 'tbody_b');

  // generar y agregar la tabla para tabla_c
  generarTabla(tabla_c, 'tbody_c');
});
