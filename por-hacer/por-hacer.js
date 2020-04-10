const fs = require('fs');

let listadoPOrHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPOrHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {
    try {
        listadoPOrHacer = require('../db/data.json');
    } catch (error) {
        listadoPOrHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion: descripcion,
        completado: false
    };

    listadoPOrHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const gesListado = () => {
    cargarDB();
    return listadoPOrHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPOrHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPOrHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPOrHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPOrHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    gesListado,
    actualizar,
    borrar
}