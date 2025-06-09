import packageJson from '../../../package.json';

type TFooter = {
  version?: string;
  copyright?: string;
  year?: number;
  fullScreen?: boolean;
};

const Footer = ({
  fullScreen = false,
  year = new Date().getFullYear(),
  version = packageJson.version,
  copyright = `© ${year} Lootopia Tous droits réservés - v${version}`,
}: TFooter) => {
  return (
    <footer className={`w-full p-4  text-center ${fullScreen ? 'fixed' : 'relative'} bottom-0 left-0`}>
      <p>{copyright}</p>
    </footer>
  );
};

export default Footer;
