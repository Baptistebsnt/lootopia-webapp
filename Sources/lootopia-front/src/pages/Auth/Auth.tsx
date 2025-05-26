import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { AUTH_MODES, AUTH_TEXTS, ROUTE_URL_AUTH } from './constants';

type TAuth = {
  mode?: keyof typeof AUTH_MODES;
};

type FormInputs = {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
};

const Auth = ({ mode: propMode = AUTH_MODES.SIGN_IN }: TAuth) => {
  const [searchParams] = useSearchParams();
  const urlMode = searchParams.get('mode') as keyof typeof AUTH_MODES;
  const mode = urlMode && AUTH_MODES[urlMode] ? urlMode : propMode;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log('Auth submit:', { mode, ...data });
    reset();
  };

  const texts = AUTH_TEXTS[mode];
  const isSignIn = mode === AUTH_MODES.SIGN_IN;
  const isSignUp = mode === AUTH_MODES.SIGN_UP;
  const signInTexts = AUTH_TEXTS[AUTH_MODES.SIGN_IN];
  const signUpTexts = AUTH_TEXTS[AUTH_MODES.SIGN_UP];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{texts.title}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {(isSignIn || isSignUp) && (
            <>
              <div className="rounded-md shadow-sm -space-y-px">
                {isSignUp && (
                  <div>
                    <label htmlFor="username" className="sr-only">
                      {signUpTexts.username}
                    </label>
                    <input
                      id="username"
                      type="text"
                      {...register('username', {
                        required: isSignUp ? "Nom d'utilisateur requis" : false,
                        minLength: {
                          value: 3,
                          message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
                        },
                      })}
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                        errors.username ? 'border-red-300' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                      placeholder={signUpTexts.username}
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="sr-only">
                    {signInTexts.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Adresse email invalide',
                      },
                    })}
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 ${isSignUp ? '' : 'rounded-t-md'} focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    placeholder={signInTexts.email}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    {signInTexts.password}
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'Mot de passe requis',
                      minLength: {
                        value: 6,
                        message: 'Le mot de passe doit contenir au moins 6 caractères',
                      },
                    })}
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 ${isSignUp ? '' : 'rounded-b-md'} focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    placeholder={signInTexts.password}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>
                {isSignUp && (
                  <div>
                    <label htmlFor="confirmPassword" className="sr-only">
                      {signUpTexts.confirmPassword}
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Confirmation du mot de passe requise',
                        validate: value => value === password || 'Les mots de passe ne correspondent pas',
                      })}
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                      placeholder={signUpTexts.confirmPassword}
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                  </div>
                )}
              </div>

              {isSignIn && (
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-dark">
                      {signInTexts.forgotPassword}
                    </a>
                  </div>
                </div>
              )}
            </>
          )}

          {!isSignIn && !isSignUp && (
            <div className="text-center">
              <p className="text-gray-600">{AUTH_TEXTS[AUTH_MODES.SIGN_OUT].confirm}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting ? 'bg-primary-light cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {isSubmitting ? 'Traitement en cours...' : texts.submit}
            </button>
          </div>

          {isSignIn && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {signInTexts.noAccount}{' '}
                <a href={`${ROUTE_URL_AUTH}?mode=${AUTH_MODES.SIGN_UP}`} className="font-medium text-primary hover:text-primary-dark">
                  {signInTexts.createAccount}
                </a>
              </p>
            </div>
          )}

          {isSignUp && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {signUpTexts.alreadyAccount}{' '}
                <a href={`${ROUTE_URL_AUTH}?mode=${AUTH_MODES.SIGN_IN}`} className="font-medium text-primary hover:text-primary-dark">
                  {signUpTexts.signIn}
                </a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
