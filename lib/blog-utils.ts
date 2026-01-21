/**
 * Utilidades para el blog - slugificación y normalización
 */

/**
 * Convierte un nombre de categoría a slug URL-friendly
 * Ej: "Internet y Telefonía" -> "internet-y-telefonia"
 */
export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-')      // Reemplazar caracteres especiales por -
    .replace(/^-+|-+$/g, '');          // Eliminar - al inicio/final
}

/**
 * Convierte un slug a nombre de categoría capitalizado
 * Ej: "internet-y-telefonia" -> "Internet y Telefonía"
 */
export function categoryFromSlug(slug: string): string | null {
  // Mapeo manual de slugs a categorías conocidas
  const categoryMap: Record<string, string> = {
    'comparativas': 'Comparativas',
    'gaming': 'Gaming',
    'guias': 'Guías',
    'tecnologia': 'Tecnología',
    'telecomunicaciones': 'Telecomunicaciones',
  };

  return categoryMap[slug] || null;
}

/**
 * Obtiene todas las categorías como slugs
 */
export function getCategorySlugMapping(categories: string[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  categories.forEach(cat => {
    mapping[slugifyCategory(cat)] = cat;
  });
  return mapping;
}
