# watchyourback

 Proyecto final para el curso de Backend de CoderHouse, realizado en express y node js. Se trata de un ecommerce en el que se incorpora la siguiente funcionalidad:

Explicación de las rutas funcionamiento de la app a través de thunder client o postman:

//RUTAS DE PRODUCTOS...
//la ruta para postear en la db seria localhost:8080/mongop/post
//la ruta para llamar a todos los productos en la db seria localhost:8080/mongop/get
//la ruta para llamar por ID en la db seria localhost:8080/mongop/get/:id
//la ruta para modificar por ID en la db seria localhost:8080/mongop/get/:id
//la ruta para eliminar por ID en la db seria localhost:8080/mongop/get/:id
// la ruta para mostrar un producto por categoria localhost:8080/mongop/:category (Indumentaria/Accesorio)
//la ruta para llamar por PAGINATE en la db sería localhost:8080/mongop?limit=2&page=1&sort=asc (limit=num que yo quiera page=num que yo quiera, por defecto toma 1 y 1, sort para desc es de más caro a más barato)

/RUTAS DE CARRITOS...
//la ruta para postear en la db seria localhost:8080/mongoc/post
//la ruta para mostrar los carritos de la db seria localhost:8080/mongoc/get/carts
//la ruta para mostrar los carritos de la db por id seria localhost:8080/mongoc/get/:cid
//la ruta para agregar un producto a un carrito de la db por id seria localhost:8080/mongoc/post/:cid
//(paso por body { "pid": " ", "cid": " "} )
//la ruta para borrar un producto de un carrito de la db por id seria localhost:8080/mongoc/put/:cid
//(paso por body { "pid": " ", "cid": " "} )
//la ruta para eliminar un carrito de la db por id seria localhost:8080/mongoc/delete/:cid

//RUTAS DE USUARIOS
//login http://localhost:8080/login
//current http://localhost:8080/current
//logout http://localhost:8080/logout
//register http://localhost:8080/register
//reset-pass http://localhost:8080/reset-password
//ver usuarios http://localhost:8080/mongou/users
//register por postman o thunder client http://localhost:8080/mongou/
//user x id, modificar y eliminar http://localhost:8080/mongou/id (cambia el metodo GET, PUT, DELETE)
//subir docs localhost:8080/mongou/id/documents
//http://localhost:8080/mongou/ usuarios con nombre, mail y role GET
//elimina usuarios inactivos http://localhost:8080/mongou/ DELETE

//PURCHASE y TICKET
http://localhost:8080/cid/purchase
//(paso por body {"cid": " "} )

//PREMIUM
//ruta que modifica role de usuario http://localhost:8080/mongou/premium/pid GET
//ruta de vista para management de usuario por admin http://localhost:8080/management/pid


//RUTAS PARA MENSAJES...
//la ruta para mostrar mensajes de la db seria localhost:8080/mongom/get
//la ruta para postear mensjaes en la db seria localhost:8080/mongom/post
//la ruta para mostrar mensajes por id de la db seria localhost:8080/mongom/get/messages/id
//la ruta para modificar mensajes por id de la db seria localhost:8080/mongom/put/messages/id
//la ruta para eliminar mensajes por id de la db seria localhost:8080/mongom/delete/messages/id


RUTAS PARA LAS VISTAS DE NAVEGADOR 
//la ruta para llamar a todos los productos sería localhost:8080/productos/total (vista de todos los productos)
//la ruta para llamar por PAGINATE en la db sería localhost:8080/productos?limit=2&page=1&sort=asc (o bien por defecto localhost:8080/productos/) !!!problema con las etiquetas de hbs
//la ruta para llamar a todos los productos por categoría sería localhost:8080/productos/:category (category = Accesorios o Indumentaria)
//la ruta para llamar a un carrito con sus productos sería localhost:8080/carrito/:cid (id de ejemplo 64209a00d2bd264c9b0b19d8) !!!problema con las etiquetas de hbs


