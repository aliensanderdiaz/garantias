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
  async function sacarServiciosNewells() {
    const fileStream = fs.createReadStream(inputNewells);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let index = 0;
    let servicios = [];
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
        index++;
        continue;
      }

      if (index === 4 || index === 5) {
        index++;
        continue;
      }

      if (index === 6) {
        if (servicio.estado !== "Entregado") {
          let urlAPI = URL + servicio.codigo;
          console.log({ urlAPI })

          try {
            const response = await fetch(urlAPI);
            const data = await response.json();
            console.log({ data })

            if (data && data.ok && data.servicio) {
              // console.log({data});
              servicio.interno = data.servicio.codigo;
              servicio.fechaIngreso = data.servicio.fechaDeIngreso;
              servicio.productoIngreso = data.servicio.producto;
              servicio.lugarDeCompra = data.servicio.lugarDeCompra;
              servicio.observaciones = data.servicio.observaciones.map(serv => '[' + serv.fecha + ']' + serv.descripcion).join('-')
            }
          } catch (error) {
            console.log({ error })
          }
        }

        servicio.cliente = line;
        index++;
        index = 0;
        servicios.push(servicio);
        servicio = {
          codigo: "",
          cliente: "",
          estado: "",
        };
        continue;
      }
    }

    let data = "let garantiasNewells = " + JSON.stringify(servicios, null, 2);

    fs.writeFileSync(outputNewells, data);
  }

  await sacarServiciosNewells();

  async function sacarServiciosRedelec() {
    const fileStream = fs.createReadStream(inputRedelec);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let servicios = [];
    let servicio = {
      codigo: "",
      cliente: "",
      estado: "",
      clienteId: "",
      fecha: "",
      producto: "",
      almacen: "",
    };

    for await (const line of rl) {
      if (
        line.includes("	Almacenes Universal S.A.S.	John Fredy Bahamon Bonilla")
      ) {
        const array = line.split("	");

        // console.log({ array })

        servicio = {
          codigo: array[1],
          cliente: array[5],
          clienteId: array[6],
          fecha: array[7].split(" ")[0],
          producto: array[10],
          estado: array[11],
          almacen: array[12],
        };

        let urlAPI = URL + servicio.codigo;
        console.log({ urlAPI })

        try {
          const response = await fetch(urlAPI);
          const data = await response.json();
          console.log({ data })

          if (data && data.ok && data.servicio) {
            // console.log({data});
            servicio.interno = data.servicio.codigo;
            servicio.fechaIngreso = data.servicio.fechaDeIngreso;
            servicio.productoIngreso = data.servicio.producto;
            servicio.lugarDeCompra = data.servicio.lugarDeCompra;
            servicio.observaciones = data.servicio.observaciones.map(serv => '[' + serv.fecha + ']' + serv.descripcion).join('-')
          }
        } catch (error) {
          console.log({ error })
        }

        servicios.push(servicio);
      }
    }

    let data = "let garantiasRedelec = " + JSON.stringify(servicios, null, 2);

    fs.writeFileSync(outputRedelec, data);
  }

  await sacarServiciosRedelec();

  async function sacarServiciosUniversal() {
    const fileStream = fs.createReadStream(inputUniversal);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let servicios = [];
    let servicio = {
      codigo: "",
      estado: "",
      tipo: "",
      clienteId: "",
      referencia: "",
      producto: "",
      falla: "",
      s2: "",
      fecha: "",
    };

    for await (const line of rl) {
      const array = line.split("	");

      servicio = {
        codigo: array[0],
        estado: array[1],
        tipo: array[2],
        clienteId: array[3],
        referencia: array[4],
        producto: array[5],
        falla: array[6],
        s2: array[10],
        fecha: array[11],
      };

      let urlAPI = URL + servicio.codigo;
      console.log({ urlAPI })

      try {
        const response = await fetch(urlAPI);
        const data = await response.json();
        console.log({ data })

        if (data && data.ok && data.servicio) {
          // console.log({data});
          servicio.interno = data.servicio.codigo;
          servicio.fechaIngreso = data.servicio.fechaDeIngreso;
          servicio.productoIngreso = data.servicio.producto;
          servicio.lugarDeCompra = data.servicio.lugarDeCompra;
          servicio.observaciones = data.servicio.observaciones.map(serv => '[' + serv.fecha + ']' + serv.descripcion).join('-')
        }
      } catch (error) {
        console.log({ error })
      }

      servicios.push(servicio);
    }

    let data = "let garantiasUniversal = " + JSON.stringify(servicios, null, 2);

    fs.writeFileSync(outputUniversal, data);
  }

  await sacarServiciosUniversal();
}

main();
