[x] vista mis Favoritos
[x] vista Busqueda de peliculas
[x] Arreglar paginacion
[x] Mejorar el seed de las peliculas 
[x] btn Logout
[x] form Modificar Perfil, con avatars disponibles cambair schema back
[x] Cambiar logica de jwt, para poder ver si un token esta vencido, y revalidarlo.
[x] Mejoroar UX/UI btn review
[x] Mejoroar UX/UI serach Page
[x] vista watchList, con logica Backend
[x] cambiar vista page a watchlist page del user

[x] ADMIN PANEL: hay que hacerlo todo, agregaria una opcion en las settings, para ir al panel
    -[x] Listar todos los usuarios, y 
    -[x] que pueda cambiar rol de usuarios, con un select
    -[x] Listar todas las reviews, 
    -[x] que pueda eliminar
    -[x] Listar Peliculas, que se puedan editar, y hacer un btn para cargar peliculas nuevas.

- Todos Faciles


(Alpaca)
[ ] Review hay que tocar Backend:
    -[x] que cuando se haga una review se modifique las props de la movie (score, y totalReviews)
    -[ ] permitir que el score de la review sea con coma
    
[ ] Responsive
    -[ ]  carrusel, cuando deslizas que cambie de peli, y ocultaria las flechas
    -[ ] responsive del modal de las categorias, y que indique por que categoria estas buscando

(ZALO)
-[ ] Usar Server-Actions en Actors, directors, reviews(sin cache)
-[ ] Tirar revalidatePath despues de una review para que aparezca en la movie
-[ ] Poner logo de favicon.
-[ ] Metadata personalizada
-[ ] esconder bibgrafia si es muy larga
-[ ] Moviespage: Hacer una pagina que muestre solamente el grid, con el pagination.


- Importantes
[ ] Realizar al menos 4 test unitario de un componente.
[ ] Realizar al menos 1 test de end-to-end.
[x] README.md con instrucciones de instalación





<!-- [ ] Like en las reviews, hay que hacer modulo en el back, y ordenar las reviews siempre por likes -->
<!-- Mejoras que nos recomendo Alejo
[x] Baja Logica, agregar atr deleted at a todas las clases, y cambiar las querys.
[x] Normalizar la BD, que todas las entidades tengan createdAt, updatedAt
[ ] Usar transactions, en los metodos de los controller que usen mas de un DAO
[ ] Separar la logica de express, con la de negocio, agregando la capa service, habria que tocar todo el codigo, es para kilombo. -->