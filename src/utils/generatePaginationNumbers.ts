export type PageItem = number | "...";

export const generatePaginationNumbers = (currentPage: number, totalPages: number): PageItem[] => {
    // Si no hay páginas o solo hay 1, retornamos array vacío o [1]
    if (totalPages <= 0) return [];
    if (totalPages === 1) return [1];

    // Si tenemos 7 páginas o menos, mostramos todas sin puntos suspensivos
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Si la página actual está entre las primeras 3 páginas
    // Mostramos: [1, 2, 3, 4, "...", totalPages]
    if (currentPage <= 3) {
        return [1, 2, 3, 4, '...', totalPages];
    }

    // Si la página actual está entre las últimas 3 páginas
    // Mostramos: [1, "...", totalPages-3, totalPages-2, totalPages-1, totalPages]
    if (currentPage >= totalPages - 2) {
        return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // Si la página actual está en el medio
    // Mostramos: [1, "...", currentPage-1, currentPage, currentPage+1, "...", totalPages]
    return [
        1, 
        '...', 
        currentPage - 1, 
        currentPage, 
        currentPage + 1, 
        '...', 
        totalPages
    ];
};

