garantiasNewells.sort((a,b) => a.codigo.localeCompare(b.codigo))

garantiasNewells = garantiasNewells.filter(garantia => garantia.estado !== 'Entregado')

const containerNewells = document.querySelector('.containerNewells')

let htmlNewells = ''

htmlNewells += `
<table>
    <thead>
        <tr>
            <th scope="col">Interno</th>
            <th scope="col">Código</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Cliente</th>
        </tr>
    </thead>
    <tbody>`

garantiasNewells.forEach((garantia, index) => {
    htmlNewells += `
                <tr>
                <td>${ index + 1 } - ${ garantia.interno }</td>
                    <th scope="row">${ garantia.codigo }</th>
                    <td>${ garantia.fecha }</td>
                    <td>${ garantia.estado }</td>
                    <td>${ garantia.cliente }</td>
                </tr>
    `
})

htmlNewells += `
            </tbody>
        </table>
`

containerNewells.innerHTML = htmlNewells

// redelec

garantiasRedelec.sort((a,b) => a.codigo.localeCompare(b.codigo))

garantiasRedelec = garantiasRedelec.filter(garantia => garantia.estado !== 'Entregado')

const containerRedelec = document.querySelector('.containerRedelec')

let htmlRedelec = '<hr>'

htmlRedelec += `
<table>
    <thead>
        <tr>
        <th scope="col">Interno</th>
            <th scope="col">Código</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Cliente</th>
            <th scope="col">Identificación</th>
            <th scope="col">Producto</th>
            <th scope="col">Almacen</th>
        </tr>
    </thead>
    <tbody>`

garantiasRedelec.forEach((garantia) => {
    htmlRedelec += `
                <tr>
    <td>${ garantia.interno }</td>
                    <th scope="row">${ garantia.codigo }</th>
                    <td>${ garantia.fecha }</td>
                    <td>${ garantia.estado }</td>
                    <td>${ garantia.cliente }</td>
                    <td>${ garantia.clienteId }</td>
                    <td>${ garantia.producto }</td>
                    <td>${ garantia.almacen }</td>
                </tr>
    `
})

htmlRedelec += `
            </tbody>
        </table>
`

containerRedelec.innerHTML = htmlRedelec

// Universal

garantiasUniversal.sort((a,b) => {
    // return a.fecha.localeCompare(b.fecha)
    let numberA = a.codigo.split('-')[1] * 1
    let numberB = b.codigo.split('-')[1] * 1

    return numberA - numberB
})

garantiasUniversal = garantiasUniversal.filter(garantia => garantia.estado !== 'Entregado')

const containerUniversal = document.querySelector('.containerUniversal')

let htmlUniversal = '<hr>'

htmlUniversal += `
<table>
    <thead>
        <tr>
        <th scope="col">Interno</th>
            <th scope="col">Código</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">Tipo</th>
            <th scope="col">cliente</th>
            <th scope="col">Producto</th>
            <th scope="col">Referencia</th>
            <th scope="col">Falla</th>
            <th scope="col">S2</th>
        </tr>
    </thead>
    <tbody>`

garantiasUniversal.forEach((garantia) => {
    htmlUniversal += `
                <tr>
                <td>${ garantia.interno }</td>
                    <th scope="row">${ garantia.codigo }</th>
                    <td>${ garantia.fecha }</td>
                    <td>${ garantia.estado }</td>
                    <td>${ garantia.tipo }</td>
                    <td>${ garantia.clienteId }</td>
                    <td>${ garantia.producto }</td>
                    <td>${ garantia.referencia }</td>
                    <td>${ garantia.falla }</td>
                    <td>${ garantia.s2 }</td>
                </tr>
    `
})

htmlUniversal += `
            </tbody>
        </table>
`

containerUniversal.innerHTML = htmlUniversal


const containerGarantiasSinRevisar = document.querySelector('.containerGarantiasSinRevisar')

let htmlContainerGarantiasSinRevisar = '<hr><p>'

// 

garantiasSinRevisar.forEach((garantia, index) => {
    htmlContainerGarantiasSinRevisar += `
        <br>${ index + 1 } - ${ garantia }<br>
    `
})

htmlContainerGarantiasSinRevisar += '</p>'

containerGarantiasSinRevisar.innerHTML = htmlContainerGarantiasSinRevisar


const containerGarantiasExitoPitalito = document.querySelector('.containerGarantiasExitoPitalito')

let htmlContainerGarantiasExitoPitalito = '<hr><p>'

// 

garantiasExitoPitalito.forEach((garantia) => {
    htmlContainerGarantiasExitoPitalito += `
        <br>${ garantia }
    `
})

htmlContainerGarantiasExitoPitalito += '</p>'

containerGarantiasExitoPitalito.innerHTML = htmlContainerGarantiasExitoPitalito