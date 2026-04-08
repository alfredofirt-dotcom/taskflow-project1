# Comparativa entre asistentes de IA

En este documento voy a comparar diferentes asistentes de inteligencia artificial como ChatGPT y Claude en tareas relacionadas con programación.

Analizaré aspectos como:
- Claridad en las explicaciones
- Profundidad técnica
- Calidad de los ejemplos
- Capacidad para detectar errores en código
- Calidad del código generado

También incluiré los prompts utilizados, las respuestas obtenidas y mis conclusiones personales.

# AI Comparison (ChatGPT vs Claude)

## 1. Introducción

En este proyecto se comparan dos asistentes de inteligencia artificial: ChatGPT y Claude.  
El objetivo es analizar su rendimiento en tareas relacionadas con programación en JavaScript.

---

## 2. Explicación de conceptos técnicos

### Prompt usado

Explica los siguientes conceptos en JavaScript:
- Closures
- Event Loop
- Hoisting

Incluye:
- Explicación simple
- Explicación profunda
- Ejemplo de código

---

### Resultado ChatGPT

- Explicaciones claras y fáciles de entender.
- Buena estructura (simple → profundo → ejemplo).
- Ejemplos prácticos y correctos.

---

### Resultado Claude

- Explicaciones más detalladas y extensas.
- Lenguaje más natural y conversacional.
- Ejemplos correctos pero más largos.

---

### Comparación

- **Claridad**: ChatGPT es más claro.
- **Profundidad**: Claude es más profundo.
- **Ejemplos**: ChatGPT más simples y útiles.

---

## 3. Detección de bugs

### Código usado

```javascript
function suma(a, b) {
  return a - b;
}

function saludar(nombre) {
  console.log("Hola " + nombre
}

function dividir(a, b) {
  if (b = 0) {
    return "Error";
  }
  return a / b;
}
# AI Comparison (ChatGPT vs Claude)

## 1. Introducción

En este proyecto se comparan dos asistentes de inteligencia artificial: ChatGPT y Claude.
El objetivo es analizar su rendimiento en tareas relacionadas con programación en JavaScript.

---

## 2. Explicación de conceptos técnicos

### Prompt usado

Explica los siguientes conceptos en JavaScript:

* Closures
* Event Loop
* Hoisting

Incluye:

* Explicación simple
* Explicación profunda
* Ejemplo de código

---

### Resultado ChatGPT

* Explicaciones claras y fáciles de entender.
* Buena estructura (simple → profundo → ejemplo).
* Ejemplos prácticos y correctos.

---

### Resultado Claude

* Explicaciones más detalladas y extensas.
* Lenguaje más natural y conversacional.
* Ejemplos correctos pero más largos.

---

### Comparación

* **Claridad**: ChatGPT es más claro.
* **Profundidad**: Claude es más profundo.
* **Ejemplos**: ChatGPT más simples y útiles.

---

## 3. Detección de bugs

### Código usado

```javascript
function suma(a, b) {
  return a - b;
}

function saludar(nombre) {
  console.log("Hola " + nombre
}

function dividir(a, b) {
  if (b = 0) {
    return "Error";
  }
  return a / b;
}
```

---

### Prompt usado

Encuentra los errores en este código, explica cada uno y corrígelo.

---

### Resultado ChatGPT

* Detecta todos los errores correctamente:

  * Uso incorrecto de `-` en lugar de `+`
  * Falta de paréntesis en `console.log`
  * Uso incorrecto de `=` en vez de `===`
* Explicaciones claras y directas.

---

### Resultado Claude

* Detecta todos los errores.
* Explicaciones más largas.
* Menos directo.

---

### Comparación

* **Precisión**: Ambos correctos.
* **Claridad**: ChatGPT mejor.
* **Detalle**: Claude más profundo.

---

## 4. Generación de código

### Prompt usado

Crea en JavaScript:

* Una función que valide un email
* Una función que ordene un array
* Una función que calcule factorial

---

### Resultado ChatGPT

```javascript
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ordenarArray(arr) {
  return arr.sort((a, b) => a - b);
}

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
```

---

### Resultado Claude

```javascript
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function ordenarArray(arr) {
  return arr.sort(function(a, b) {
    return a - b;
  });
}

function factorial(n) {
  let resultado = 1;
  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}
```

---

### Comparación

* **Calidad**: Ambos buenos.
* **Modernidad**: ChatGPT mejor.
* **Legibilidad**: ChatGPT más limpio.

---

## 5. Lenguaje natural a código

### Prompt usado

Crea funciones en JavaScript para:

1. Calcular el precio final con IVA
2. Verificar si una contraseña es segura
3. Contar cuántas palabras tiene un texto

---

### Resultado ChatGPT

```javascript
function calcularPrecioConIVA(precio, iva = 0.21) {
  return precio + precio * iva;
}

function esPasswordSegura(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

function contarPalabras(texto) {
  return texto.trim().split(/\s+/).length;
}
```

---

### Resultado Claude

```javascript
function calcularPrecioConIVA(precio, iva) {
  return precio * (1 + iva);
}

function esPasswordSegura(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

function contarPalabras(texto) {
  return texto.split(" ").length;
}
```

---

### Comparación

* **Comprensión**: Ambos correctos.
* **Eficiencia**: ChatGPT mejor.
* **Robustez**: ChatGPT maneja más casos.

---

## 6. Conclusión final

### ChatGPT

* Más rápido
* Más claro
* Mejor para programar

### Claude

* Más detallado
* Mejor para teoría

---

## 7. Conclusión general

ChatGPT destaca por su claridad, rapidez y código práctico.
Claude destaca por su profundidad y explicaciones más detalladas.

La mejor elección depende del objetivo:

* Desarrollo → ChatGPT
* Aprendizaje → Claude
