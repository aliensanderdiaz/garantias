const garantiasParaReparar = garantias.filter(garantia => estadosReparacion.includes(garantia.estado))

console.log({ garantiasParaReparar })

const containerParaReparar = document.querySelector('.container-para-reparar')

let htmlContainerParaReparar = `<h3>${ garantiasParaReparar.length } Garantias Para Reparar</h3><hr><p>`

// 

garantiasParaReparar.forEach((servicio, index) => {
    htmlContainerParaReparar += `
        <br>${ index + 1 } - ${servicio.fechaIngreso} - *${ servicio.interno }* - ${ servicio.codigo } - ${ servicio.productoIngreso } - Falla: ${ servicio.falla || '' } - Lugar de Compra: ${ servicio.lugarDeCompra } - Observaciones: ${ servicio.observaciones }<br>
    `
})

htmlContainerParaReparar += '</p>'

containerParaReparar.innerHTML = htmlContainerParaReparar