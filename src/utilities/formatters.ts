export function dateFormatter(): Intl.DateTimeFormat {
    return Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
}

export function dateVerboseFormatter(): Intl.DateTimeFormat {
  return Intl.DateTimeFormat('es-ES', {
      dateStyle: 'medium'
    });
}

export function getMonth(type: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined): Intl.DateTimeFormat {
  return Intl.DateTimeFormat('es-CO', {
    month: type
  })
} 

export function pesoFormatter(): Intl.NumberFormat {
    return Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      });
}