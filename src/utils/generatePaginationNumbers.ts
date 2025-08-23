



export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    // mostramos las paginas sin puntos suspensivos
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    // Si la pagina actual esta entre las primeras 3 paginas
    // mostramos las primeras tres, puntos suspensivos, y las ultimas 2
    if (totalPages <= 3) {
        return [1, 2, 3, '...', totalPages--, totalPages]
    }

    //Si la pagina actual esta entre las ultimas tres pags
    // mostramos las primeras dos, ...,  las ultimas 3
    if (totalPages >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages--, totalPages]
    }

    // si la pagina acutal esta en otro lugar medio
    // mostar la primer pagina, ..., la pag actual , y vecinos
    return [
        1, '...', currentPage--, currentPage, currentPage++, '...', totalPages
    ]
}
