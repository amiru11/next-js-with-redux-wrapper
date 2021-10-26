import React from 'react';
import styles from 'styles/globals.styled';

type TLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

function Layout({ children }: TLayoutProps): JSX.Element {
  return (
    <div>
      {children}
      <style jsx>{styles}</style>
    </div>
  );
}

export default Layout;
