export type RespuestaAPI<T> = {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
};

export async function obtenerRecurso<T>(
  endpoint: string
): Promise<RespuestaAPI<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        codigoEstado: 200,
        exito: true,
        datos: {} as T
      });
    }, 500);
  });
}