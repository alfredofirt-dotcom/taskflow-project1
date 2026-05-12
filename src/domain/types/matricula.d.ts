export interface MatriculaActiva {
    tipo: "ACTIVA";
    asignaturas: string[];
}
export interface MatriculaSuspendida {
    tipo: "SUSPENDIDA";
    motivo: string;
}
export interface MatriculaFinalizada {
    tipo: "FINALIZADA";
    notaMedia: number;
}
export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;
//# sourceMappingURL=matricula.d.ts.map