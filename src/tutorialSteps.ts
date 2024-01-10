export const tutorialSteps = [
    {
      content: 'Una aplicación para gestionar tareas. Empezaras con un tablero básico.',
      disableBeacon: true,
      target: '.board-header-component',
      title: 'Bienvenido a Boar',
    },
    {
      content: 'Así son las tareas.',
      target: ".task",
      showSkipButton: false,
      title: 'Boar',
    },
    {
      content: 'Al presionar una tarea puedes ver sus opciones.',
      target: ".task",
      showSkipButton: false,
      title: 'Boar',
    },
    {
      content: 'Las columnas representan el estado de las tareas.',
      target: ".column--first-column",
      showSkipButton: false,
      title: 'Boar',
    },
    {
      content: 'Al lado del nombre de una columna están las opciones editar y eliminar.',
      target: ".column-header",
      showSkipButton: false,
      title: 'Boar',
      locale: {
        last: 'Terminar tutorial', 
      },
    },
  ];