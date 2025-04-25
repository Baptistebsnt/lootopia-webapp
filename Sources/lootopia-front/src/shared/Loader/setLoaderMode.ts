import { MODES } from './constants';

type TsetLoaderMode = {
  isLoading: boolean;
  LoaderModes?: typeof MODES;
};
const setLoaderMode = ({ isLoading, LoaderModes = MODES }: TsetLoaderMode) => (isLoading ? LoaderModes.get : LoaderModes.none);

export default setLoaderMode;
