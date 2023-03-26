# watchyourback

Explicación de las rutas funcionamiento de la app a través de thunder client:
Para acceder a los productos de la db:

//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para postear en la db seria localhost:8080/mongop/post
//la ruta para llamar a todos los productos en la db seria localhost:8080/mongop/get
//la ruta para llamar por ID en la db seria localhost:8080/mongop/get/:id
//la ruta para modificar por ID en la db seria localhost:8080/mongop/get/:id
//la ruta para eliminar por ID en la db seria localhost:8080/mongop/get/:id

Para acceder a los carritos de la db

/EN LAS RUTAS SIEMPRE comienzan con /MONGOC/...
//la ruta para postear en la db seria localhost:8080/mongoc/post
//la ruta para mostrar los carritos de la db seria localhost:8080/mongoc/get/carts
//la ruta para mostrar los carritos de la db por id seria localhost:8080/mongoc/get/carts/:cid
//la ruta para agregar un producto a un carrito de la db por id seria localhost:8080/mongoc/post/carts/:cid
//la ruta para borrar un producto de un carrito de la db por id seria localhost:8080/mongoc/put/carts/:cid
//la ruta para eliminar un carrito de la db por id seria localhost:8080/mongoc/delete/carts/:cid

Para acceder a los mensajes de la db

//EN LAS RUTAS SIEMPRE /MONGOP/...
//la ruta para mostrar mensajes de la db seria localhost:8080/mongom/get
//la ruta para postear mensjaes en la db seria localhost:8080/mongom/post
//la ruta para mostrar mensajes por id de la db seria localhost:8080/mongom/get/id
//la ruta para modificar mensajes por id de la db seria localhost:8080/mongom/put/id
//la ruta para eliminar mensajes por id de la db seria localhost:8080/mongom/delete/id
 