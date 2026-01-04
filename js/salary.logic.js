function calcularSalario(data) {
  const diurno = data.diurno;
  const mixto = data.mixto;
  const nocturno = data.nocturno;
  const diasLibres = data.diasLibres;

  const horasExtraMixtas = mixto;
  const horasExtraNocturnas = nocturno * 2;

  const valorExtrasMixto = horasExtraMixtas * HoraMixta;
  const valorExtrasNocturno = horasExtraNocturnas * HoraNocturna;

  const totalDias = diurno + mixto + nocturno + diasLibres;
  const horasOrdinarias = totalDias * 8;

  const subtotalLibre = diasLibres * guardiaLibre;

  const totalOrdinario =
    (diurno * guardiaDiurna) +
    (mixto * guardiaMixta) +
    (nocturno * guardiaNocturna);

  const ccss = (totalOrdinario + subtotalLibre) * porcentajeCCSS;
  const salarioLibreTotal = totalOrdinario + subtotalLibre - ccss;

  return {
    totalDias,
    horasOrdinarias,
    horasExtraMixtas,
    horasExtraNocturnas,
    valorExtrasMixto,
    valorExtrasNocturno,
    subtotalLibre,
    totalOrdinario,
    ccss,
    salarioLibreTotal
  };
}
