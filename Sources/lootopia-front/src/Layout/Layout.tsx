import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Footer from './Footer';

export type TLayout = {
  children?: ReactNode;
  className?: string;
  fullscreen?: boolean;
  disabled?: {
    footer?: boolean;
  };
  propsFooter?: ComponentPropsWithoutRef<typeof Footer>;
  FooterCmpt?: typeof Footer;
};

export type TLayoutPage = TLayout & {
  titleBar?: string;
  title?: ReactNode;
};

const Layout = ({ children, className = '', fullscreen = false, disabled = {}, propsFooter = {}, FooterCmpt = Footer }: TLayout) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <main className="flex-grow">{children}</main>

      {!disabled.footer && <FooterCmpt fullScreen={fullscreen} {...propsFooter} />}
    </div>
  );
};

export default Layout;
