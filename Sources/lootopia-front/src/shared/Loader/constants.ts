export const MODES = {
  none: 'none',
  get: 'get',
  post: 'post',
  delete: 'delete',
  update: 'update',
  error: 'error',
} as const;

export const TEXTS = {
  none: '',
  get: 'Chargement en cours',
  post: 'Sauvegarde en cours',
  delete: 'Suppression en cours',
  update: 'Mise à jour en cours',
  error: 'Une erreur est survenue lors du chargement',
} as const;

export const DEFAULT_CLASSNAME =
  'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary';
