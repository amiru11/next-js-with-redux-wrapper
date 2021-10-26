import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Link from 'next/link';

import { StoreState } from 'store';

import Clock from 'components/Clock';
import AddCount from 'components/AddCount';

type TPageProps = {
  title: string;
  linkTo: string;
};

function Page({ title, linkTo }: TPageProps): JSX.Element {
  const { lastUpdate, isLight } = useSelector(
    (state: StoreState) => ({
      lastUpdate: state.tick.get('lastUpdate'),
      isLight: state.tick.get('isLight'),
    }),
    shallowEqual
  );

  return (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} isLight={isLight} />
      <AddCount />
      <nav>
        <Link href={linkTo}>
          <a>Navigate</a>
        </Link>
      </nav>
    </div>
  );
}

export default Page;
