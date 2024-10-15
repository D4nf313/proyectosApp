# ProyectosApp

Proyecto hecho con angular 17.3 y angular material 17.3, se corre ejecutando primero npm i y ng serve -o
El proyecto cuenta primeramente con un login, por le momento solo se pude ingresar con dos perfiles que son: 
*  user1, password: 1234
* 'user2', password: password2,
  el login es hecho con reactive forms y tiene validaciones para verificar que si se ingresen datos y mostrar un snackbar cuando las credenciales son incorrectas.
  Al ingresar credenciales correctas el sistema lo redirecciona al modulo de proyectos el cual trabaja con lazy load para cargar primeramente al listar-proyectos que es en realidad en listado de la data que llega con la url de https://jsonplaceholder.typicode.com/users.
  se muestra en forma de tabla y permite ver el detalle de las tareas vinculadas a los usuarios por el id y el userId de la data que me llega de:
  https://jsonplaceholder.typicode.com/todos 
  al darle clic en detalle el sistema redirecciona a la vista de detalle-tareas la cual tambien muestra en forma de tabla las tareas vinculadas a ese usuario. En esa vista se realiza una especie de CRUD, donde a traves del servicio de proyectos permito almacenar en el localstorage una nueva tarea, editar o eliminar.
  Para lograr crear o editar una tarea realice un componente que funciona en forma de modal reutilizable en ambas funcionalidades, funciona con  reactive forms y tiene alidaciones de requerido y minlengh y confirmacion de accion con snackbars.
El sistema ademas tiene un navbar que es un componente standalone que se integra a la vista de listar-proyectos y detalle-tareas, el cual cuenta con un boton para cerrar sesion y volver a la vista del login.( cuando se cierra sesion se eliminan todas las tareas editadas guardadas o eliminadas hechas la sesion).
la vista detalle y listar cuentan con can activate para que validen si el estado del aplicativo es autenticado atraves de localstorage
Se integro un interceptor para manejar las posibles respuestas de error q pueda generar el backend mostrando el error por medio de snackbars.
  


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
