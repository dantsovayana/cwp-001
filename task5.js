const path = require('path');
const fs = require('fs');


const DIR_PATH = process.argv[2];
const NEW_DIRECTORY = DIR_PATH + '\\' + path.basename(DIR_PATH);
let prefix = "";
const sum = fs.createWriteStream('summary.js');
let copyright = "";


let createDir = function (callback) {
    // создание нового директория
    fs.access(NEW_DIRECTORY, (err) => {
        if(err && err.code == 'ENOENT') {
            fs.mkdir(NEW_DIRECTORY, (err) => {
                if (err) console.error("ошибка при создании директории");
            });
            fs.watch(NEW_DIRECTORY, (eventType, filename) => {
                console.log(`${eventType} - ${filename}`);
            });
        }
        else console.log("директорий уже существует!");
    });
    // получение copyright
    fs.readFile("config.json", (err, data) => {
        if (err) console.error("Пошибка при чтении файла")
        else {
            copyright = JSON.parse(data).copyright;
        }
    });
    callback();
}
createDir(() => readAndCopyDirectory(DIR_PATH, prefix));

