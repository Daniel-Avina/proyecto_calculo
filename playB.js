document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculo-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const a = parseFloat(document.getElementById('learning-rate_b').value);
        const iterations = parseInt(document.getElementById('iterations_b').value);

        let tabla_c = [];
        let x_k = 0;
        let punto_b;


        function C(x) {
            return 68000 + 150 * x;
          }
          
          function U(x) {
            return R(x) - C(x);
          }
          
          function U_p(x) {
            return 400 - x / 5;
          }
          
          function U_pp() {
            return -1 / 5;
          }

          function R(x) {
            return p(x) * x;
          }
          
          function R_p(x) {
            return 550 - x / 5;
          }
          
          function R_pp() {
            return -1 / 5;
          }

        for (let i = 0; i < iterations; i++) {
            let x_k1 = x_k + a * R_p(x_k);
            tabla_c[i] = { i, x_k, f_p: U_p(x_k), a, x_k1 };
            x_k = x_k1;
        }
        
        punto_c = x_k;

        console.table(tabla_c);
        console.log(`b) MAX en ${punto_c.toFixed(5)} es ${U(punto_c)}`);

        // Generate and display the table
        generarTabla(tabla_c, 'play_b');
    });

    function generarTabla(datos, tbodyId) {
        const tbody = document.getElementById(tbodyId);
        tbody.innerHTML = ''; // Clear existing rows
        datos.forEach(dato => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${dato.i}</td>
                <td>${dato.x_k.toFixed(4)}</td>
                <td>${dato.f_p.toFixed(4)}</td>
                <td>${dato.a}</td>
                <td>${dato.x_k1.toFixed(6)}</td>
            `;
            tbody.appendChild(row);
        });
    }
});