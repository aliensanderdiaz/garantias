// const fs = require('node:fs')
const fs = require("fs");
const fetch = require("node-fetch");
const URL = "http://localhost:3001/garantias/";
// const URL = "https://api.almacenesuniversal.com/garantias/";
// const readline = require('node:readline');
const readline = require("readline");

let inputNewells = "01-input-pantalla-newells.txt";
let outputNewells = "newells.js";

let inputRedelec = "02-input-pantalla-redelec.txt";
let outputRedelec = "redelec.js";

let inputUniversal = "03-input-pantalla-universal.txt";
let outputUniversal = "universal.js";

console.log("ANTES DE MAIN");

async function main() {

    let codigos = []

    async function sacarServiciosNewells() {
        const fileStream = fs.createReadStream(inputNewells);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        

        let index = 0;

        let servicio = {
            codigo: "",
            cliente: "",
            estado: "",
            fecha: "",
        };

        for await (const line of rl) {
            // console.log({ index, line })

            // if (line.startsWith('Seleccionar elemento ')) {
            if (line === "") {
                index = 1;
                continue;
            }

            if (index === 0) {
                continue;
            }

            if (index === 1) {
                servicio.estado = line;
                index++;
                continue;
            }

            if (index === 2) {
                servicio.codigo = line;
                index++;
                continue;
            }

            if (index === 3) {
                servicio.fecha = line.split(" ")[0];
                servicio.fecha = servicio.fecha.padStart(10, '0')
                index++;
                continue;
            }

            if (index === 4 || index === 5) {
                index++;
                continue;
            }

            if (index === 6) {
                if (servicio.estado !== "Entregado") {
                    codigos.push(servicio.codigo);
                    
                }
                continue;
            }
        }

    }

    await sacarServiciosNewells();

    async function sacarServiciosRedelec() {
        const fileStream = fs.createReadStream(inputRedelec);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });



        for await (const line of rl) {
            if (
                line.includes("	Almacenes Universal S.A.S.	John Fredy Bahamon Bonilla")
            ) {
                const array = line.split("	");

                codigos.push(array[1])


            }
        }

    }

    await sacarServiciosRedelec();

    async function sacarServiciosUniversal() {
        const fileStream = fs.createReadStream(inputUniversal);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });



        for await (const line of rl) {
            const array = line.split("	");

            codigos.push(array[0])


        }


    }

    await sacarServiciosUniversal();

    console.log('codigos')
    console.log('codigos')
    console.log(codigos.join(','))
}

main();
