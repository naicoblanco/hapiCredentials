# hapiCredentials

Aplicación rápida para login y página privata con credenciales Hawk.

- Hacer el `/login` con algún usuario de `lib/users.json` y te devuelve todas su info.
- Acceder a `/private` con credenciales Hawk (las de `/lib/auth-hawk.js`, vía Postman), y te devuelve un mensaje de bienvenida.

** Si con el Postman da error, abrir primero la aplicación con el Chrome, y aceptar el certificado autofirmado**, luego ya debería dejar el Postman hacer peticiones.

El archivo `index.html` devuelve (ejecutando `guid()` en la consola del navegador) un UUID que se puede usar para los navegadores.

Falta por ejemplo:

- Tomar los datos de usuario y apps de la BD de Mongo
- Limitar el número de intentos de login
- Logout
- Registrar las `apps`/devices/clients nuevas del usuario, con su `id` y `key`.
