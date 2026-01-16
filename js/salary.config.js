const salarioBase = 405710.70;
const porcentajeCCSS = 0.1083;
const diasMes = 30;

const HoraDiurna = salarioBase / (8 * diasMes);
const HoraMixta = salarioBase / (7 * diasMes);
const HoraNocturna = salarioBase / (6 * diasMes);

const ExtraMixta = HoraMixta * 1.5;
const ExtraNocturna = HoraNocturna * 1.5;

const guardiaLibre = salarioBase / 30;
const guardiaDiurna = HoraDiurna * 8;
const guardiaMixta = HoraMixta * 7 + ExtraMixta;
const guardiaNocturna = HoraNocturna * 6 + ExtraNocturna * 2;
