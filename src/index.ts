import { generarReporte } from "./reporte.js";
import type { EstadoMatricula } from "./domain/types/matricula.js";

const estado: EstadoMatricula = {
  tipo: "ACTIVA",
  asignaturas: ["Matemáticas", "Historia"]
};

console.log(generarReporte(estado));