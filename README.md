Proyecto: Cálculo de Salario
Descripción

Este proyecto es un sistema web para el cálculo de salarios de empleados, incluyendo días diurnos, mixtos, nocturnos y libres, así como el cálculo de la CCSS. Permite exportar los resultados a PDF y tiene validaciones para asegurar que los datos ingresados sean correctos.

El proyecto está desarrollado siguiendo buenas prácticas de modularización, dividiendo HTML, CSS y JavaScript en varios archivos y componentes.

Funcionalidades principales

Ingreso de días trabajados:

Diurnos

Mixtos

Nocturnos

Libres

Validaciones:

No se permiten valores negativos.

No se permite calcular si todos los inputs están vacíos o son cero.

Cálculo automático de:

Horas ordinarias y extras

Salario bruto

Deducción CCSS

Salario neto a recibir

Modal de proceso con spinner y modal de advertencia con ícono ⚠️

Exportación de resultados a PDF con formato profesional

Interfaz responsiva para escritorio y dispositivos móviles

Estructura de archivos
/proyecto-salario
│
├─ index.html
├─ README.md
│
├─ css/
│   ├─ reset.css
│   ├─ layout.css
│   ├─ components.css
│   └─ responsive.css
│
├─ js/
│   ├─ main.js
│   ├─ menu.js
│   ├─ salary.config.js
│   ├─ salary.logic.js
│   ├─ salary.ui.js
│   └─ pdf.export.js
│
└─ public/
    └─ img/logo.png

Tecnologías utilizadas

HTML5

CSS3 (Flexbox, Grid, Media Queries)

JavaScript (ES6+)

jsPDF
 para generación de PDF

Instalación y uso

Clonar el repositorio o descargar los archivos.

Abrir index.html en cualquier navegador moderno.

Ingresar los días trabajados en los inputs correspondientes.

Presionar Calcular salario.

Descargar resultados en PDF si se desea.

Buenas prácticas aplicadas

Modularización de JavaScript y CSS.

Separación de lógica, UI y configuración salarial.

Validaciones de entrada de datos robustas.

Interfaz responsiva para escritorio y móvil.

Código limpio y comentado (cuando es necesario).

Créditos

Desarrollado por RIVASTECH
Versión: 3.3
© 2026. Todos los derechos reservados.