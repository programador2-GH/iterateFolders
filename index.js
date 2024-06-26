const { listarElementos } = require('./function')
require('dotenv').config()

function main() {
    // Ejemplo de uso: listar carpetas a un solo nivel y mostrar su tamaño en formato tabla
    listarElementos(process.env.FOLDER_PATH)
}
main()

setInterval(() => { console.log('Ha finalizado correctamente el programa, han pasado 100s segundos'); process.exit(0) }, 100000);