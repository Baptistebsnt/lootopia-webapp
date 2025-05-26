export const ROUTE_URL_AUTH = '/auth';
export const TITLE_BAR_AUTH = 'Authentification';

export const AUTH_MODES = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_UP: 'SIGN_UP',
} as const;

export const AUTH_TEXTS = {
  [AUTH_MODES.SIGN_IN]: {
    title: 'Connexion',
    submit: 'Se connecter',
    email: 'Email',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié ?',
    noAccount: 'Pas encore de compte ?',
    createAccount: 'Créer un compte',
  },
  [AUTH_MODES.SIGN_OUT]: {
    title: 'Déconnexion',
    submit: 'Se déconnecter',
    confirm: 'Êtes-vous sûr de vouloir vous déconnecter ?',
  },
  [AUTH_MODES.SIGN_UP]: {
    title: 'Création de compte',
    submit: 'Créer mon compte',
    email: 'Email',
    password: 'Mot de passe',
    username: "Nom d'utilisateur",
    confirmPassword: 'Confirmer le mot de passe',
    alreadyAccount: 'Déjà un compte ?',
    signIn: 'Se connecter',
  },
} as const;
