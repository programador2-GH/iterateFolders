const fs = require('fs');
const path = require('path');

// Función para verificar si una cadena contiene solo caracteres ASCII
function esASCII(cadena) {
    return /^[\x00-\x7F]*$/.test(cadena);
}

// Función para listar las carpetas y archivos recursivamente con estructura de árbol
function listarElementos(rutaCarpeta, prefijo = '') {
    // Obtener la ruta absoluta del directorio
    const directorio = path.resolve(rutaCarpeta);

    // Leer el contenido del directorio
    const elementos = fs.readdirSync(directorio);

    // Iterar sobre los elementos para identificar las carpetas y archivos
    return elementos.forEach((elemento, index) => {
        // Comprobación previa: verificar si el nombre del elemento contiene solo caracteres ASCII
        if (!esASCII(elemento)) {
            return; // Saltar al siguiente elemento
        }

        const rutaElemento = path.join(directorio, elemento);
        const stats = fs.statSync(rutaElemento);

        // Determinar el prefijo para la impresión
        const esUltimoElemento = index === elementos.length - 1;
        const nuevoPrefijo = prefijo + (esUltimoElemento ? '└── ' : '├── ');
        const nuevoPrefijoParaSubElementos = prefijo + (esUltimoElemento ? '    ' : '│   ');

        if (stats.isDirectory()) {
            // Es una carpeta
            console.log(`${nuevoPrefijo}Carpeta: ${elemento}`);
            // Llamar recursivamente para listar su contenido
            listarElementos(rutaElemento, nuevoPrefijoParaSubElementos);
        } else if (stats.isFile()) {
            // Es un archivo
            console.log(`${nuevoPrefijo}Archivo: ${elemento}`);
        }
    });
}



module.exports = {
    listarElementos
}