export type EstadoMatricula = "ACTIVA" | "INACTIVA" | "SUSPENDIDA";

export interface Matricula {
  tipo: EstadoMatricula;
  asignaturas: string[];
}