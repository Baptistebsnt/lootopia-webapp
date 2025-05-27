import { PropsWithChildren } from 'react';
import { DEFAULT_CLASSNAME, MODES, TEXTS } from './constants';

export type TLoader = PropsWithChildren & {
  className?: string;
  message?: string;
  mode?: keyof typeof MODES;
};

const Loader = ({ className = '', mode = MODES.none, message = TEXTS[mode], children }: TLoader) => (
  <>
    {mode !== MODES.none ? (
      <div role="alert" aria-label={message} aria-live="polite" aria-busy className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className={DEFAULT_CLASSNAME} />
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      </div>
    ) : (
      children
    )}
  </>
);

export default Loader;
