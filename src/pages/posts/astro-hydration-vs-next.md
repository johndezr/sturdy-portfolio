---
layout: '../../layouts/BlogPostLayout.astro'
title: 'Partial Hydration en Astro y comparación con Next.js'
description: 'Exploramos cómo funciona la hydration en Astro, qué es la partial hydration, y en qué se diferencia del enfoque clásico de frameworks como Next.js.'
excerpt: 'Astro propone un enfoque distinto a la hydration en aplicaciones web modernas. Te explico cómo funciona la partial hydration, sus ventajas, y en qué se distancia de frameworks como Next.js.'
tags:
  ['Astro', 'Next.js', 'Hydration', 'Partial Hydration', 'Web Performance', 'Islands Architecture']
pubDate: '28 April 2025'
status: done
slug: astro-hydratation-vs-next
image: https://res.cloudinary.com/dgkjzoae8/image/upload/v1746299454/istockphoto-1271584187-612x612_jlqzlu.jpg
---

## ⚡ Partial Hydration en Astro y cómo se diferencia de Next.js

En los últimos años, los frameworks de frontend han encontrado soluciones cada vez más creativas para mejorar la performance de las aplicaciones web. Uno de los conceptos más importantes en esta evolución es **hydration**.

Hoy te quiero contar cómo **Astro** implementa una técnica llamada **partial hydration**, qué resuelve exactamente y cómo se diferencia de frameworks como **Next.js** que manejan hydration de una forma más tradicional.

---

## 📖 ¿Qué es Hydration?

Cuando generas una web con **renderizado en servidor (SSR)** o **generación estática (SSG)**, el navegador recibe HTML ya renderizado. Pero ese HTML es estático, y para que los componentes sean interactivos, se necesita asociarles el comportamiento JavaScript que se definió en el cliente.

Ese proceso se llama **hydration**.

**Proceso clásico:**

1. El servidor renderiza el HTML.
2. El cliente recibe ese HTML.
3. Se descarga y ejecuta el bundle JS.
4. El framework recorre el DOM, rehidrata los componentes y los vuelve interactivos.

**Problema:** se hidrata todo, incluso lo que no es necesario.

---

## 🚀 ¿Qué es Partial Hydration?

Es una optimización que hidrata solo las partes interactivas de una página — los **islands** — dejando el resto como HTML estático.

Ventaja:
✅ Menos JS que descargar y ejecutar.
✅ Mayor performance inicial.
✅ Mejora en Core Web Vitals.

---

## 🌌 Astro y su enfoque “Islands Architecture”

Astro usa este modelo desde su núcleo. Genera HTML estático para toda la página, y solo hidrata los componentes que realmente lo necesitan.

**Ejemplo:**

```astro
---
import Counter from '../components/Counter.jsx';
---

<html>
  <body>
    <h1>Blog Post</h1>
    <Counter client:load />
  </body>
</html>
```

**`client:load`** indica que ese componente se hidratará al cargarse la página.

Astro permite varios modos de carga:

- `client:load` → al cargar la página.
- `client:idle` → cuando el navegador está en idle.
- `client:visible` → cuando entra en viewport.
- `client:media` → según media queries.

👉 Esto permite tener control fino sobre cuándo y cómo se hidrata cada componente.

---

## 🔍 ¿Cómo se diferencia de Next.js?

**Next.js** usa hydration completa por defecto. Toda la página generada en SSR/SSG se hidrata en cliente al cargar el bundle.

Aunque Next.js ha mejorado con **React Server Components (RSC)**, sigue basándose en hydration completa o parcial controlada con _dynamic imports_ o _use client_.

Ejemplo en Next.js:

```jsx
'use client';

export default function Counter() {
  // Componente que solo vive en cliente
}
```

Pero:

- **No tiene granularidad por componente aislado** con control de hydration progresiva.
- **No aplica islands architecture** como modelo de diseño.

---

## 📊 Comparativa rápida

| 📌 Concepto             | Astro                              | Next.js                          |
| :---------------------- | :--------------------------------- | :------------------------------- |
| Hydration Default       | Partial per-component (islands)    | Full hydration                   |
| Control por carga       | `client:load`, `client:idle`, etc. | `use client`, dynamic imports    |
| HTML inicial            | 100% estático (salvo islands)      | HTML con hydration JS global     |
| Ideal para              | Blogs, landing pages, e-commerce   | SPAs, dashboards, apps complejas |
| React Server Components | En roadmap                         | Implementado desde Next 13       |

---

## 📚 Referencias

- 📄 [Astro Docs: Partial Hydration](https://docs.astro.build/en/core-concepts/component-islands/)
- 📘 [Next.js Docs: React Server Components](https://nextjs.org/docs/getting-started/react-architecture)
- 📖 [Islands Architecture explicado](https://www.patterns.dev/posts/islands-architecture/)

---

## 🎯 Conclusión

Astro propone una solución moderna a los problemas de hydration: hidratar solo lo necesario, cuando es necesario. Esto reduce el JS en cliente, mejora la performance y hace que las webs sean más rápidas desde su primer render.

Mientras Next.js sigue evolucionando con React Server Components, Astro ya ofrece control granular por componente, y por eso es una opción excelente para proyectos donde el contenido estático predomina y la interactividad está bien localizada.

---
