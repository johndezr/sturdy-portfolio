---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Reactividad en JS (React vs Vue)'
description: 'Entiende cómo funciona realmente la reactividad en JavaScript comparando Vanilla JS con Vue, React y jQuery. Proxies, Virtual DOM, reconciliación, diffing y gestión manual explicados con ejemplos claros.'
excerpt: '¿React es reactivo? Te explico cómo funciona la reactividad en JavaScript y las diferencias entre Vanilla JS, Vue, React y jQuery. Spoiler: React no usa Proxies.'
slug: reactivity-in-js
tags: ['Vue', 'React', 'Virtual DOM', 'Proxies', 'Diffing', 'Reconciliación']
image: '/images/projects/basek-drive.png'
pubDate: '2024-11-21'
status: draft
---

## Reactividad en JavaScript: Así funcionan Vanilla, Vue, React y jQuery

La palabra “reactivo” se ha vuelto omnipresente en frontend, pero no todo el mundo entiende realmente lo que implica. React, por ejemplo, no es _reactivo_ en el sentido estricto. Este post te explica cómo funciona la reactividad en diferentes entornos: **Vanilla JS**, **Vue 3**, **React** y sí, **jQuery** también.

Este es un artículo para desarrolladores con experiencia que quieren comprender cómo las distintas herramientas manejan el cambio de estado y actualizan la interfaz. Vamos.

---

## 📌 ¿Qué es la reactividad?

De forma simple:

> **Reactividad** es la capacidad de un sistema para responder automáticamente a los cambios de estado sin intervención manual directa.

En JavaScript clásico:

```js
let count = 0;

function render() {
  document.body.innerHTML = `<p>Count: ${count}</p>`;
}

count = 1;
render();
```

Nada ocurre hasta que **tú llamas manualmente a `render()`**. Los frameworks modernos automatizan esa parte.

---

## 📚 Conceptos Clave

### 🔄 Proxies

Un objeto envoltorio que permite interceptar y redefinir operaciones sobre otro objeto (lectura, escritura, etc.). Base del sistema reactivo de Vue 3.

### 📑 Virtual DOM

Representación ligera del DOM real en memoria, que permite calcular diferencias y actualizar solo los nodos necesarios.

### 📊 Diffing

Proceso de comparar el Virtual DOM actual con el anterior para encontrar qué ha cambiado.

### 🔁 Reconciliación

Aplicar al DOM real solo las diferencias detectadas en el diffing.

### 🎛️ Dependency Tracking

Sistema que detecta qué funciones dependen de qué propiedades reactivas, permitiendo ejecutar solo las que lo necesiten.

---

## 🛠️ Vanilla JS con Proxy

```js
const state = new Proxy(
  { count: 0 },
  {
    set(target, prop, value) {
      target[prop] = value;
      render();
      return true;
    },
  }
);

function render() {
  document.body.innerHTML = `<p>Count: ${state.count}</p>`;
}

state.count = 1;
```

Cada cambio en `state.count` activa `set` y se actualiza la vista. Manual pero reactivo.

### 📌 Ventaja:

- Control total.

### 📌 Desventaja:

- Re-render completo en cada cambio.

---

## 🟢 Vue 3: Proxies + Dependency Tracking

Desde Vue 3, su sistema reactividad usa `Proxy` para envolver los datos y un sistema de efectos para rastrear dependencias.

```js
import { reactive, effect } from 'vue';

const state = reactive({ count: 0 });

effect(() => {
  console.log(`Count: ${state.count}`);
});

state.count++;
```

**¿Qué ocurre aquí?**

1. `reactive()` crea un Proxy.
2. `effect()` ejecuta su callback y registra qué propiedades se leen.
3. Cuando una propiedad cambia, se vuelven a ejecutar solo las funciones dependientes.

### 📌 Ventaja:

- Actualización eficiente.

### 📌 Desventaja:

- Más abstracción y complejidad.

---

## 🔵 React: No es reactivo, pero es rápido

React funciona con Virtual DOM y diffing. No usa Proxies ni dependency tracking.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

Cada vez que se ejecuta `setCount()`, React:

1. Ejecuta de nuevo la función componente.
2. Crea una nueva versión del Virtual DOM.
3. Compara con el Virtual DOM anterior (diffing).
4. Solo actualiza en el DOM real lo necesario.

### 📌 Ventaja:

- Difícil romperlo.

### 📌 Desventaja:

- Re-render completo del componente.

---

## 🟣 jQuery: Reactividad manual

Antes de la era de los frameworks, gestionábamos el DOM a mano.

```js
let count = 0;

function update() {
  $('#counter').text(count);
}

$('#inc').click(() => {
  count++;
  update();
});
```

Todo depende de que **tú llames a la función `update()`** tras cada cambio. No hay Proxies, ni Virtual DOM, ni diffing.

### 📌 Ventaja:

- Simple, directo.

### 📌 Desventaja:

- Fácil de olvidar actualizaciones.
- Difícil de mantener en apps grandes.

---

## 📊 Comparativa Resumida

| Concepto            | Vanilla + Proxy | Vue 3 | React | jQuery |
| :------------------ | :-------------: | :---: | :---- | :----- |
| ¿Usa Proxy?         |       ✅        |  ✅   | ❌    | ❌     |
| Dependency Tracking |       ❌        |  ✅   | ❌    | ❌     |
| Virtual DOM         |       ❌        |  ✅   | ✅    | ❌     |
| Diffing             |       ❌        |  ✅   | ✅    | ❌     |
| Reconciliación      |       ❌        |  ✅   | ✅    | ❌     |
| Manual Updates      |       ❌        |  ❌   | ❌    | ✅     |

---

## 📈 Diagrama Resumen (Excalidraw-style)

```js
[ Estado ] ---> [ Proxy ] ---> [ Dependencias ] ---> [ UI ]
       |                     |
       |                     v
       ------> [ Virtual DOM ] --> [ Diffing ] --> [ DOM Real ]
```

---

## 📝 Conclusión

Cada enfoque tiene sentido según contexto:

- **Vanilla + Proxy**: didáctico, ideal para entender cómo funciona.
- **Vue 3**: moderno, eficiente, dependency-aware.
- **React**: Virtual DOM rápido sin dependencia tracking.
- **jQuery**: nostalgia y control manual.
