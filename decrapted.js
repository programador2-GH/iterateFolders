// Función para listar las carpetas a un solo nivel y calcular el tamaño total
function listarCarpetas(rutaCarpeta) {
    // Obtener la ruta absoluta del directorio
    const directorio = path.resolve(rutaCarpeta);

    // Variable para almacenar las carpetas y sus tamaños
    let carpetas = [];

    // Leer el contenido del directorio
    const elementos = fs.readdirSync(directorio);

    // Iterar sobre los elementos para identificar las carpetas
    elementos.forEach(elemento => {
        const rutaElemento = path.join(directorio, elemento);
        const stats = fs.statSync(rutaElemento);

        if (stats.isDirectory()) {
            // Es una carpeta, calcular su tamaño total
            const tamanoCarpeta = calcularTamanoDirectorio(rutaElemento);
            carpetas.push({
                Carpeta: elemento,
                'Tamaño Total': bytesToSize(tamanoCarpeta)
            });
        }
    });

    // Mostrar las carpetas y sus tamaños en formato tabla
    console.log(`\nCarpetas dentro de ${rutaCarpeta} y su tamaño total:\n`);
    console.table(carpetas);
}

// Función para calcular el tamaño de una carpeta recursivamente
function calcularTamanoDirectorio(ruta) {
    let tamanoTotal = 0;
    const archivos = fs.readdirSync(ruta);

    archivos.forEach(archivo => {
        const rutaArchivo = path.join(ruta, archivo);
        const stats = fs.statSync(rutaArchivo);

        if (stats.isFile()) {
            // Es un archivo, sumar su tamaño
            tamanoTotal += stats.size;
        } else if (stats.isDirectory()) {
            // Es un directorio, llamar recursivamente a esta función
            tamanoTotal += calcularTamanoDirectorio(rutaArchivo);
        }
    });

    return tamanoTotal;
}

// Función para convertir bytes a tamaño legible
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}