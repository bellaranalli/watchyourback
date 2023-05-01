﻿# watchyourback

Explicación de las rutas funcionamiento de la app a través de thunder client:
Para acceder a los productos de la db:

//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para postear en la db seria localhost:8080/mongop/post
//la ruta para llamar a todos los productos en la db seria localhost:8080/mongop/get
//la ruta para llamar por ID en la db seria localhost:8080/mongop/get/:id
//la ruta para modificar por ID en la db seria localhost:8080/mongop/get/:id
//la ruta para eliminar por ID en la db seria localhost:8080/mongop/get/:id

Para acceder a los carritos de la db

/EN LAS RUTAS SIEMPRE comienzan con /MONGOC/... IMPLEMENTACIONES SOLICITADAS EN 2DA PRE ENTREGA
//la ruta para postear en la db seria localhost:8080/mongoc/post
//la ruta para mostrar los carritos de la db seria localhost:8080/mongoc/get/carts
//la ruta para mostrar los carritos de la db por id seria localhost:8080/mongoc/get/carts/:cid
//la ruta para agregar un producto a un carrito de la db por id seria localhost:8080/mongoc/post/carts/:cid
//(paso por body de thunder client { "pid": " ", "cid": " "} )
//la ruta para borrar un producto de un carrito de la db por id seria localhost:8080/mongoc/put/carts/:cid
//(paso por body de thunder client { "pid": " ", "cid": " "} )
//la ruta para eliminar un carrito de la db por id seria localhost:8080/mongoc/delete/carts/:cid

Para acceder a los mensajes de la db

//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para mostrar mensajes de la db seria localhost:8080/mongom/get
//la ruta para postear mensjaes en la db seria localhost:8080/mongom/post
//la ruta para mostrar mensajes por id de la db seria localhost:8080/mongom/get/id
//la ruta para modificar mensajes por id de la db seria localhost:8080/mongom/put/id
//la ruta para eliminar mensajes por id de la db seria localhost:8080/mongom/delete/id


RUTAS PARA LAS VISTAS DE NAVEGADOR CON IMPLEMENTACIONES DE 2DA PRE ENTREGA
//la ruta para llamar a todos los productos sería localhost:8080/productos/total (vista de todos los productos)
//la ruta para llamar por PAGINATE en la db sería localhost:8080/productos?limit=2&page=1&sort=asc (o bien por defecto localhost:8080/productos/)
//la ruta para llamar a todos los productos por categoría sería localhost:8080/productos/:category (category = Accesorios o Indumentaria)

//la ruta para llamar a un carrito con sus productos sería localhost:8080/carrito/:cid (id de ejemplo 64209a00d2bd264c9b0b19d8)

RUTAS DE API POR THUNDER CLIENT CON IMPLEMENTACIONES DE 2DA PRE ENTREGA
//la ruta para llamar por categoria en la db sería localhost:8080/mongop/get/:category
//la ruta para llamar por PAGINATE en la db sería localhost:8080/mongop?limit=2&page=1&sort=asc (limit=num que yo quiera page=num que yo quiera, por defecto toma 1 y 1, sort para desc es de más caro a más barato)

*Se agrega un botón de "añadir producto" aún sin funcionalidad, solicitado en 2da pre entrega.


RUTA http://localhost:8080/api/sessions/current correspondiente a 2da práctica integradora. La ruta muestra la sesión activa. Si se usa la ruta http://localhost:8080/current se muestra el perfíl del usuario en ese momento (no es necesario esto pero no está de más).
Se vicnula en la creación de un usuario, la creación automática de un carrito vacío, al cual se le pueden agregar productos como se indica líneas arriba.

