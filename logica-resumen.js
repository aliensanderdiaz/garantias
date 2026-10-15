
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

garantias.sort((a, b) => {
    if (!a.fechaIngreso) {
        return false
    }

    return a.fechaIngreso.localeCompare(b.fechaIngreso)
})



const dibujar = (garantiasDibujar = garantias) => {
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
            <th scope="col">Interno</th>
            <th scope="col">Código</th>
            <th scope="col">Producto</th>
            <th scope="col">Estado</th>
            <th scope="col">Lugar</th>
            <th scope="col">Observaciones</th>
        </tr>
    </thead>
    <tbody>`

    garantiasDibujar.forEach((garantia, index) => {
        html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${garantia.fechaIngreso} <br> ${garantia.fecha}</td>
                    <td>${garantia.interno}</td>
                    <td>${garantia.codigo}</td>
                    <td>${garantia.productoIngreso ? garantia.productoIngreso.substring(0, 15) : ''}</td>
                    <td class="${estados.includes(garantia.estado) ? 'listo' : garantia.estado === 'Despachado' || garantia.estado === 'En reparación' ? 'despachado' : 'no-listo'}">${garantia.estado.substring(0, 15)}</td>
                    <td>${garantia.lugarDeCompra?.substring(0, 15)}</td>
                    <td>${garantia.observaciones?.toLowerCase().replaceAll('-[', '<br>[')}</td>
                </tr>
    `
    })





    html += `
            </tbody>
        </table>
`

    container.innerHTML = html
}

dibujar(garantias)

const estadosListas = [
    "Pre-terminado",
    "Por entregar",
]

const estadosReparacion = [
    "Intervención técnica",
    "En reparación"
]

const estadosRevisadas = [
    "En progreso",
    "Aprobación pendiente",
        "Solicitud / producto",
    
    "Solicitud de validación para cambio de producto",
    "Solicitud / repuesto",
]

const todosLosEstados = [...estadosListas,...estadosReparacion,...estadosRevisadas]


const filtrar = (estado) => {
    if (estado === 'listas') {

        const filtradas = garantias.filter(garantia => estadosListas.includes(garantia.estado))
        dibujar(filtradas)
    }
    if (estado === 'reparacion') {

        const filtradas = garantias.filter(garantia => estadosReparacion.includes(garantia.estado))
        dibujar(filtradas)

    }
    if (estado === 'revisadas') {


        const filtradas = garantias.filter(garantia => estadosRevisadas.includes(garantia.estado))
        dibujar(filtradas)
    }
    if (estado === 'otras') {


        const filtradas = garantias.filter(garantia => !todosLosEstados.includes(garantia.estado))
        dibujar(filtradas)
    }
    if (estado === 'todas') {


        dibujar(garantias)
    }
}