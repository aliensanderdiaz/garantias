
garantiasNewells = garantiasNewells.filter(garantia => garantia.estado !== 'Entregado')
    .map(garantia => {
        return {
            ...garantia,
            fecha: garantia.fecha.split('/').reverse().join('-')
        }
    })


garantiasRedelec = garantiasRedelec.filter(garantia => garantia.estado !== 'Entregado')


garantiasUniversal = garantiasUniversal.filter(garantia => garantia.estado !== 'Entregado')
    .map(garantia => {
        return {
            ...garantia,
            fecha: garantia.fecha.split('/').reverse().join('-')
        }
    })

let garantias = [...garantiasNewells, ...garantiasRedelec, ...garantiasUniversal]

garantias.sort((a,b) => {
    if (!a.fecha) {
        return false
    }

    return a.fecha.localeCompare(b.fecha)
})

const container = document.querySelector('.container')

let estados = [
    'Por entregar',
    'PREFINALIZADO',
    'Pre-terminado',
    'AUTORIZADO'
]

let html = ''

html += `
<table>
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Fecha</th>
            <th scope="col">Interno</th>
            <th scope="col">Código</th>
            <th scope="col">Producto</th>
            <th scope="col">Estado</th>
            <th scope="col">Lugar</th>
            <th scope="col">Observaciones</th>
        </tr>
    </thead>
    <tbody>`

garantias.forEach((garantia, index) => {
    html += `
                <tr>
                    <td>${ index + 1 }</td>
                    <td>${ garantia.fechaIngreso }</td>
                    <td>${ garantia.fecha }</td>
                    <td>${ garantia.interno }</td>
                    <td>${ garantia.codigo }</td>
                    <td>${ garantia.productoIngreso ? garantia.productoIngreso.substring(0,15) : '' }</td>
                    <td class="${ estados.includes(garantia.estado) ? 'listo': 'no-listo' }">${ garantia.estado.substring(0,15) }</td>
                    <td>${ garantia.lugarDeCompra?.substring(0,15) }</td>
                    <td>${ garantia.observaciones?.toLowerCase().replaceAll('-[', '<br>[') }</td>
                </tr>
    `
})





html += `
            </tbody>
        </table>
`

container.innerHTML = html

