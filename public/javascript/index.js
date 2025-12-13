const salarioBase = 399203.69;
const porcentajeCCSS = 0.1067;

const diasMEs = 30;
const horasDiurnasPorDia = 8;
const horasMixtasPorDia = 7;
const horasNocturnasPorDia = 6;

const horasDiurnasMensuales = horasDiurnasPorDia * diasMEs;
const horasMixtasMensuales = horasMixtasPorDia * diasMEs;
const horasNocturnasMensuales = horasNocturnasPorDia * diasMEs;

const HoraDiurna = salarioBase / horasDiurnasMensuales;
const HoraMixta = salarioBase / horasMixtasMensuales;
const HoraNocturna = salarioBase / horasNocturnasMensuales;

const ExtraDiurna = HoraDiurna * 1.5;
const ExtraMixta = HoraMixta * 1.5;
const ExtraNocturna = HoraNocturna * 1.5;

const guardiaLibre = salarioBase / 30;
const guardiaDiurna = HoraDiurna * 8;
const guardiaMixta = HoraMixta * 7 + ExtraMixta;
const guardiaNocturna = HoraNocturna * 6 + ExtraNocturna * 2;


console.log("GuardiaDiurna", guardiaDiurna);
console.log("guardiaMixta", guardiaLibre);
console.log("guardiaNocturna", guardiaLibre);



calcularSalario = () => {

  const campos = ["diurno", "mixto", "nocturno", "libre"];
  const valores = {};

  for (const campo of campos) {
    const valor = document.getElementById(campo).value;

    if (valor === "") {
      document.getElementById('overlay').style.display = 'block';
      document.getElementById('popupMensaje').style.display = 'block';
      return;
    }

    valores[campo] = parseInt(valor) || 0;
  }

  const { diurno, mixto, nocturno, libre } = valores;

  const totalNormal =
    (diurno * guardiaDiurna) +
    (mixto * guardiaMixta) +
    (nocturno * guardiaNocturna) +
    (libre * guardiaLibre);

  const horasExtraMixtas = mixto;
  const horasExtraNocturnas = nocturno * 2;

  const valorExtrasMixto = horasExtraMixtas * HoraMixta;
  const valorExtrasNocturno = horasExtraNocturnas * HoraNocturna;

  const totalExtras = valorExtrasMixto + valorExtrasNocturno;

  window.datosExtras = {
    horasExtraMixtas,
    horasExtraNocturnas,
    valorExtrasMixto,
    valorExtrasNocturno,
    totalExtras
  };


  mostrarResultado();

};


mostrarResultado = () => {
  const { horasExtraMixtas, horasExtraNocturnas, valorExtrasMixto, valorExtrasNocturno } = window.datosExtras;
  const diurno = parseInt(document.getElementById('diurno').value) || 0;
  const mixto = parseInt(document.getElementById('mixto').value) || 0;
  const nocturno = parseInt(document.getElementById('nocturno').value) || 0;
  const libre = parseInt(document.getElementById('libre').value) || 0;

  const totalDias = diurno + mixto + nocturno + libre;
  const horasOrdinarias = totalDias * 8;
  const subtotalLibre = libre * guardiaLibre;
  const totalOrdinario = (diurno * guardiaDiurna) + (mixto * guardiaMixta) + (nocturno * guardiaNocturna);
  const ccss = (totalOrdinario + subtotalLibre) * porcentajeCCSS;
  const salarioLibreTotal = totalOrdinario + subtotalLibre - ccss;

  const formatoMoneda = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const resultadoHtml = `
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
            <tr><td>Días libres</td><td>${libre}</td><td>₡</td><td>${formatoMoneda.format(subtotalLibre)}</td></tr>
            <tr><td>Rebajos</td><td></td><td></td><td></td></tr>
            <tr><td>CCSS (10,67%)</td><td></td><td>₡</td><td>${formatoMoneda.format(ccss)}</td></tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="fila total">
        <span><strong>Salario libre:</strong></span>
        <span class='totallibre' ><strong>₡${formatoMoneda.format(salarioLibreTotal)}</strong></span>
      </div>
    </div>`;

  document.getElementById('resultado').innerHTML = resultadoHtml;
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('resultado').style.display = 'block';
  document.getElementById("btn-calcular").style.display = "none";
}

function cerrarPopups() {
  document.getElementById('overlay').style.display = 'none';
  //   document.getElementById('popupExtras').style.display = 'none';
  //   document.getElementById('popupCantidadExtras').style.display = 'none';
  document.getElementById('popupMensaje').style.display = 'none';
  document.getElementById('mantenimiento').style.display = 'none';
}

function limpiarCampos() {
  document.getElementById('diurno').value = '';
  document.getElementById('mixto').value = '';
  document.getElementById('nocturno').value = '';
  document.getElementById('libre').value = '';
  // document.getElementById('cantidadExtras').value = '';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('resultado').style.display = 'none';
  document.getElementById("btn-calcular").style.display = "block";
}