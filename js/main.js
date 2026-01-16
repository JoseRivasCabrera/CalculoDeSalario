const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');
const modal = document.getElementById('modalProcesando');
const modalTexto = modal.querySelector('p');
const modalSpinner = modal.querySelector('.spinner');
const btnCalcular = document.getElementById('btnCalcular');
const btnLimpiar = document.getElementById('btnLimpiar');

btnCalcular.onclick = () => {
  const valoresRaw = [
    document.getElementById('diurna').value,
    document.getElementById('mixta').value,
    document.getElementById('nocturna').value,
    document.getElementById('libre').value
  ];

  const valores = valoresRaw.map(v => v === '' ? null : Number(v));

  const hayVacio = valores.some(v => v === null);
  const tieneNegativos = valores.some(v => v < 0);
  const todosCero = valores.every(v => v === 0);

  if (hayVacio || tieneNegativos || todosCero) {
    modalSpinner.style.display = 'none'; // ocultamos spinner
    modalTexto.innerText = '⚠️ Debe llenar correctamente los espacios';
    modal.style.display = 'flex';

    setTimeout(() => {
      modal.style.display = 'none';
      modalSpinner.style.display = 'block'; // restauramos spinner
      modalTexto.innerText = 'Procesando información…';
    }, 2000);

    return;
  }

  modalSpinner.style.display = 'block'; // nos aseguramos que el spinner se vea
  modalTexto.innerText = 'Procesando información…';
  modal.style.display = 'flex';

  const delay = Math.floor(Math.random() * 1500) + 2000;

  setTimeout(() => {
    const diurno = valores[0];
    const mixto = valores[1];
    const nocturnoVal = valores[2];
    const diasLibres = valores[3];

    const horasExtraMixtas = mixto;
    const horasExtraNocturnas = nocturnoVal * 2;

    const valorExtrasMixto = horasExtraMixtas * HoraMixta;
    const valorExtrasNocturno = horasExtraNocturnas * HoraNocturna;

    const totalDias = diurno + mixto + nocturnoVal + diasLibres;
    const horasOrdinarias = totalDias * 8;

    const subtotalLibre = diasLibres * guardiaLibre;
    const totalOrdinario =
      (diurno * guardiaDiurna) +
      (mixto * guardiaMixta) +
      (nocturnoVal * guardiaNocturna);

    const ccss = (totalOrdinario + subtotalLibre) * porcentajeCCSS;
    const salarioLibreTotal = totalOrdinario + subtotalLibre - ccss;

    const formatoMoneda = new Intl.NumberFormat('es-CR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    resultado.innerHTML = `
      <div class="resultado-plantilla">
        <div class="tabla-scroll">
          <table class="tabla-resultado">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Cant.</th>
                <th></th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Días trabajados</td><td>${totalDias}</td><td></td><td></td></tr>
              <tr><td>H.Ordinarias</td><td>${horasOrdinarias}</td><td>₡</td><td>${formatoMoneda.format(HoraDiurna * horasOrdinarias)}</td></tr>
              <tr><td>H.extra mixtas</td><td>${horasExtraMixtas}</td><td>₡</td><td>${formatoMoneda.format(valorExtrasMixto)}</td></tr>
              <tr><td>H.extra nocturnas</td><td>${horasExtraNocturnas}</td><td>₡</td><td>${formatoMoneda.format(valorExtrasNocturno)}</td></tr>
              <tr><td>Días libres</td><td>${diasLibres}</td><td>₡</td><td>${formatoMoneda.format(subtotalLibre)}</td></tr>
              <tr><td>CCSS (10,83%)</td><td></td><td>₡</td><td>${formatoMoneda.format(ccss)}</td></tr>
            </tbody>
          </table>
        </div>
        <hr>
        <div class="fila total">
          <span><strong>Salario libre:</strong></span>
          <span class="totallibre"><strong>₡${formatoMoneda.format(salarioLibreTotal)}</strong></span>
        </div>

        <div class="buttons" style="margin-top:1rem;">
          <button id="btnVolver" class="secondary">Volver</button>
          <button onclick="exportarResultadoPDF()">Exportar PDF</button>
        </div>
      </div>
    `;

    formulario.style.display = 'none';
    resultado.style.display = 'block';
    modal.style.display = 'none';

    document.getElementById('btnVolver').onclick = () => {
      resultado.style.display = 'none';
      formulario.style.display = 'block';
    };
  }, delay);
};

btnLimpiar.onclick = () => {
  document.querySelectorAll('.form-grid input').forEach(i => i.value = '');
  resultado.innerHTML = '';
};
