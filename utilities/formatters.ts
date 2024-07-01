export function dateFormatter(): Intl.DateTimeFormat {
    return Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
}

export function pesoFormatter(): Intl.NumberFormat {
    return Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      });
}