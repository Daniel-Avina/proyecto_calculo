document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculo-form');

    document.getElementById('tb_b_play').style.display = 'none';
    document.getElementById('tb_c_play').style.display = 'none';
    
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        document.getElementById('tb_b_play').style.display = 'table';
        document.getElementById('tb_c_play').style.display = 'table';

        const a = parseFloat(document.getElementById('learning-rate').value);
        const a_b = parseFloat(document.getElementById('learning-rate_b').value);
        const iterations = parseInt(document.getElementById('iterations').value);
        const iterations_b = parseInt(document.getElementById('iterations_b').value);

        let tabla_b = [];
        let tabla_c = [];
        let x_k = 0;
        let punto_b;
        let punto_c;


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

        // b) maximizar funcion de utilidad
        for (let i = 0; i < iterations_b; i++) {
          let x_k1 = x_k + a_b * R_p(x_k);
          tabla_b[i] = { i, x_k, f_p: R_p(x_k), a_b, x_k1 };
          x_k = x_k1;
        }
        punto_b = x_k;

        // c) minimizar funcion de costo
        x_k = 0;
        for (let i = 0; i < iterations; i++) {
            let x_k1 = x_k + a * U_p(x_k);
            tabla_c[i] = { i, x_k, f_p: U_p(x_k), a, x_k1 };
            x_k = x_k1;
        }
        punto_c = x_k;

        console.table(tabla_c);
        console.log(`b) MAX en ${punto_c.toFixed(5)} es ${U(punto_c)}`);

        // Generate and display the table
        generarTablaB(tabla_b, 'play_b');
        generarTablaC(tabla_c, 'play_c');
    });

    function generarTablaC(datos, tbodyId) {
        const tbody = document.getElementById(tbodyId);
        tbody.innerHTML = ''; // Clear existing rows
        datos.forEach(dato => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${dato.i}</td>
                <td>${dato.x_k.toFixed(4)}</td>
                <td>${dato.f_p.toFixed(4)}</td>
                <td>${dato.a}</td>
                <td>${dato.x_k1.toFixed(7)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function generarTablaB(datos, tbodyId) {
      const tbody = document.getElementById(tbodyId);
      tbody.innerHTML = ''; // Clear existing rows
      datos.forEach(dato => {
          let row = document.createElement('tr');
          row.innerHTML = `
              <td>${dato.i}</td>
              <td>${dato.x_k.toFixed(4)}</td>
              <td>${dato.f_p.toFixed(4)}</td>
              <td>${dato.a_b}</td>
              <td>${dato.x_k1.toFixed(7)}</td>
          `;
          tbody.appendChild(row);
      });
  }
});