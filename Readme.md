Trabajo fin de grado realizado por Francisco Cuenca Salido, se procede a la creación de una herramienta web libre para la especificación de requisitos con el lenguaje de notacion UML.

# Running with Docker

## Create mongo container and run in background 

    docker run --name uml-mongo -d mongo

## Generate image 

    docker build -t iuml-node .

## Create node container and run interactively to see log:

    docker run -it --rm -p 3000:3000 --link uml-mongo:mongodb --name uml-node iuml-node

Here the web is working at: http://127.0.0.1:8080/ and the terminal displays log and errors


# Uso de MongoDB #

1. `show databases` para ver las bases de datos.
2. `use tfg` para la eleccón de nuestra base de datos 
3. `show collections` para ver las colecciones
4. `db.users.find().pretty()` para mostrar los datos de forma ordenada.

