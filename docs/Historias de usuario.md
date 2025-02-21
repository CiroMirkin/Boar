
# Historias de usuario

Esta son las historias de usuario implementadas actualmente en Boar.

## Tablero

* Como usuario, al entrar a Boar puedo leer una introducción a su funcionamiento.
  * La introducción solo aparecerá la primera vez que entre el usuario. 

* Como usuario, puedo crear tareas.
  * Puede crear tareas solo en la primer columna.
  * Puede crear tareas dentro del limite del limite de tareas por columna.
  * No puede crear tareas vacías, deben tener una descripción.
  * La longitud de una tarea no debe exceder los 200 caracteres.
* Como usuario, puedo eliminar las tareas que quiera.
* Como usuario, puedo mover las tareas entre columnas.
  * Puede mover tareas solo si la columna tiene espacio. Las columnas tienen un limite de 10 tareas.

## Archivo

* Como usuario, puedo archivar tareas.
  * Puede archivar todas las tareas de la ultima columna.
  * Puede archivar tareas individuales en la última columna.
  * No se puede archivar una lista de tareas vacía.
  * El archivo es diario. Si se archivan varias tareas el mismo dia, estas deberían archivarse juntas.
  * El archivo diario tiene capacidad para 30 tareas.
  * El archivo tiene capacidad para 60 días.

* Como usuario, puedo ver las tareas archivadas.
  * Puede ver las tareas archivadas.
  * El archivo es una lista con las tareas archivadas y la fecha en que se archivaron.

* Como usuario, puedo exportar el archivo.
  * Se exportara en formato PDF.

## Ajustes

* Como usuario, puedo cambiar el nombre del tablero.
  * El nombre del tablero no puede sobrepasar los 30 caracteres.
* Como usuario, puedo crear nuevas columnas.
  * No pude haber mas de 6 columnas
* Como usuario, puede cambiar el nombre de las columnas.
  * Las columnas deben tener un nombre.
  * El nombre de las columnas no puede sobrepasar los 30 caracteres.
* Como usuario, puedo eliminar columnas.
  * No puede haber menos de dos columnas.

* Como usuario, puedo crear un recordatorio.
  * El recordatorio se mostrará al usuario cada vez que una tarea entre en la columna indicada.
  * El recordatorio debe tener una descripción.
  * El recordatorio debe tener una columna especificada por el usuario.

* Como usuario, puedo cambiar el idioma de la aplicación a Ingles o Español.  
  * El idioma por defecto es Español.  
  * Se debe cambiar el idioma automáticamente a Ingles si es el idioma del dispositivo del usuario.

* Como usuario, puedo cambiar el tema de color de toda la aplicación.