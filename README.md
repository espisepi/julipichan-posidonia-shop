# julipichan-posidonia-shop

This project was bootstrapped with [`create-r3f-app`](https://github.com/utsuboco/create-r3f-app)



# Next.js Telo Shop
Para correr localmente, se necesita la base de datos.
```
sudo docker-compose up -d
```

* El -d, significa __detached__



## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de pruebas

Llamara:
```
http://localhost:3000/api/seed
```