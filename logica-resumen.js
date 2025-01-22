
garantiasNewells = garantiasNewells.filter(garantia => garantia.estado !== 'Entregado')


garantiasRedelec = garantiasRedelec.filter(garantia => garantia.estado !== 'Entregado')


garantiasUniversal = garantiasUniversal.filter(garantia => garantia.estado !== 'Entregado')

let garantias = [...garantiasNewells, ...garantiasRedelec, ...garantiasUniversal]

garantias.sort((a,b) => {
    if (!a.fechaIngreso) {
        return false
    }

    return a.fechaIngreso.localeCompare(b.fechaIngreso)
})

const container = document.querySelector('.container')

let html = ''

html += `
<table>
    <thead>
        <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Fecha</th>
            <th scope="col">Interno</th>
            <th scope="col">Código</th>
            <th scope="col">Producto</th>
            <th scope="col">Estado</th>
        </tr>
    </thead>
    <tbody>`

garantias.forEach((garantia) => {
    html += `
                <tr>
                    <td>${ garantia.fechaIngreso }</td>
                    <td>${ garantia.fecha }</td>
                    <td>${ garantia.interno }</td>
                    <td>${ garantia.codigo }</td>
                    <td>${ garantia.productoIngreso ? garantia.productoIngreso.substring(0,15) : '' }</td>
                    <td>${ garantia.estado.substring(0,15) }</td>
                </tr>
    `
})





html += `
            </tbody>
        </table>
`

container.innerHTML = html

