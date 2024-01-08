---
sidebar_position: 3
description: Tutorial inicial.
tags:
  - Tutorial
  - React Joyride
---

# Tutorial inicial

El tutorial de Boar fue creado con [React Joyride](https://docs.react-joyride.com/).

El recorrido del tutorial esta dentro del arreglo `tutorialSteps` en el archivo `src/tutorialSteps.tsx`.

```typescript title="/src/tutorialSteps.tsx"
const tutorialSteps = [
  {
    content: 'Una aplicación para gestionar tareas.',
    disableBeacon: true,
    placement: 'center',
    target: 'body',
    title: 'Bienvenido a Boar',
  },
  {
    content: 'Así son las tareas.',
    disableBeacon: true,
    target: ".task",
    showSkipButton: false,
    title: 'Boar',
  },
]
```

El arreglo `tutorialSteps` se pasa como prop al componente `Joyride`.

```jsx title="/src/App.tsx"
<Joyride 
        // highlight-next-line
        steps={tutorialSteps} 
        showProgress 
        showSkipButton 
        hideCloseButton
        disableScrolling
        continuous
        locale={{
          back: 'Volver', 
          close: 'Cerrar', 
          last: 'Anterior', 
          next: 'Siguiente', 
          skip: 'Saltar tutorial'
        }}
        styles={{
          options: {
            backgroundColor: "#f3f3f3",
            overlayColor: "rgb(0 0 0 / 46%)",
            textColor: "#000",
            primaryColor: "rgb(136,163,253)",
            width: "18rem",
            zIndex: 1
          },
        }}
      />
```

## Atributos

La mayoría de los atributos están documentados por la misma librería en [React Joyride](https://docs.react-joyride.com/), salvo los atributos definidos a continuación.

El atributo `disableBeacon` permite que el tutorial inicie automáticamente, solo es necesario en el primer elemento.

```typescript title="/src/App.tsx"
const tutorialSteps = [
  {
    content: 'Una aplicación para gestionar tareas.',
    // highlight-next-line
    disableBeacon: true,
    placement: 'center',
    target: 'body',
    title: 'Bienvenido a Boar',
  }
]
```

**TypeScript detecta un error** en la propiedad `placement`, la cual existe en la interfaz de `steps` y nos permite definir manualmente donde estará el cuadro de dialogo.

```typescript
const tutorialSteps = [
  {
    content: 'Una aplicación para gestionar tareas.',
    disableBeacon: true,
    // highlight-next-line
    placement: 'center',
    target: 'body',
    title: 'Bienvenido a Boar',
  }
];
```