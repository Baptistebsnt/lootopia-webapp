import { ComponentPropsWithoutRef, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

export type TLayout = {
  children?: ReactNode;
  className?: string;
  fullscreen?: boolean;
  disabled?: {
    footer?: boolean;
    header?: boolean;
  };
  propsFooter?: ComponentPropsWithoutRef<typeof Footer>;
  FooterCmpt?: typeof Footer;
  HeaderCmpt?: typeof Header;
};

export type TLayoutPage = TLayout & {
  titleBar?: string;
  title?: ReactNode;
};

const Layout = ({
  children,
  className = '',
  fullscreen = false,
  disabled = {},
  propsFooter = {},
  FooterCmpt = Footer,
  HeaderCmpt = Header,
}: TLayout) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {!disabled.header && <HeaderCmpt />}
      <main className="flex-grow">{children}</main>
      {!disabled.footer && <FooterCmpt fullScreen={fullscreen} {...propsFooter} />}
    </div>
  );
};

export default Layout;
