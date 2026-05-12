export function generarReporte(estado) {
    switch (estado.tipo) {
        case "ACTIVA":
            return `Asignaturas: ${estado.asignaturas.join(", ")}`;
        case "SUSPENDIDA":
            return `Motivo: ${estado.motivo}`;
        case "FINALIZADA":
            return `Nota media: ${estado.notaMedia}`;
        default:
            const check = estado;
            return check;
    }
}
//# sourceMappingURL=reporte.js.map