# julipichan-posidonia-shop

This project was bootstrapped with [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app)

# Next.js Telo Shop

Para correr localmente, se necesita la base de datos.

```
sudo docker-compose up -d
```

- El -d, significa **detached**

- En MAC hay que ejecutar la aplicacion de docker para que funcione el comando, sino dara el siguiente error: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

- Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamara:

```
http://localhost:3000/api/seed
```
