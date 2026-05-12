import type { EstadoMatricula } from "./domain/types/matricula.js";

export function generarReporte(estado: EstadoMatricula): string {

  switch (estado.tipo) {

    case "ACTIVA":
      return `Asignaturas: ${estado.asignaturas.join(", ")}`;

    case "SUSPENDIDA":
      return `Motivo: ${estado.motivo}`;

    case "FINALIZADA":
      return `Nota media: ${estado.notaMedia}`;

    default:
      const check: never = estado;
      return check;
  }
}