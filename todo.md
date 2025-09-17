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

[ ] Mejorar Banner Critio, con logo
[ ] revisar skeletons
[ ] responsive del carrusel, cuando deslizas que cambie de peli, y ocultaria las flechas
[ ] Moviespage: Hacer una pagina que muestre solamente el grid, con el pagination.
[ ] SearchPage: 
    -[ ] responsive del modal de las categorias, y que indique por que categoria estas buscando
    -[ ] agregar Orden personalizado, ej (por anio de lanzamiento, etc)

[ ] Review hay que tocar Backend:
    -[ ] que cuando se haga una review se modifique las props de la movie (score, y totalReviews)
    -[ ] permitir que el score de la review sea con coma

[ ] ADMIN PANEL: hay que hacerlo todo, agregaria una opcion en las settings, para ir al panel
    -[x] Listar todos los usuarios, y 
    -[ ] que pueda cambiar rol de usuarios, con un select
    -[x] Listar todas las reviews, 
    -[ ] que pueda eliminar
    <!-- -[ ] Listar todas las peliculas, que pueda editar data
    -[ ] Listar todas las actores, que pueda editar data
    -[ ] Listar todas las directores, que pueda editar data -->
    <!-- NO SE SI HACE FALTA -->

[ ] Like en las reviews, hay que hacer modulo en el back, y ordenar las reviews siempre por likes

!Importante, pero no hace falta.
[ ] Cambiar toda la logica del useApi, por funciones, usando la logica de nextjs, cache, revalidatePath, optimistic, y el loading
[ ] Tirar revalidatePath despues de una review para que aparezca en la movie
[ ] Metadata personalisada


[ ] hacer responsive toda la pagina
[ ] Realizar al menos 1 test unitario de un componente.
[ ] Realizar al menos 1 test de end-to-end.
[ ] Variables de entorno** configuradas (.env dev/prod)
[ ] README.md con instrucciones de instalación