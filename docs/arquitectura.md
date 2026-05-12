# Arquitectura del proyecto

Este proyecto utiliza TypeScript para garantizar tipado estático y reducir errores en tiempo de ejecución.

## Modelado del dominio

Se han utilizado interfaces para representar entidades como Estudiante, Asignatura y Matricula.

## Unión discriminada

EstadoMatricula usa un patrón de unión discriminada para representar estados válidos del sistema:
- ACTIVA
- SUSPENDIDA
- FINALIZADA

Esto evita estados inválidos.

## Genéricos

El servicio API utiliza genéricos para permitir reutilización de lógica sin perder tipado.

## Tipo never

Se usa en el switch de generarReporte para asegurar que todos los casos estén cubiertos (exhaustiveness checking).