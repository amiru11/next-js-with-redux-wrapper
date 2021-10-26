import React from 'react';
import styles from './Clock.styled';

type TClockProps = {
  lastUpdate: number;
  isLight: boolean;
};

export default function Clock({ lastUpdate, isLight }: TClockProps): JSX.Element {
  return (
    <div className={isLight ? 'light' : ''}>
      {format(new Date(lastUpdate))}
      <style jsx>{styles}</style>
    </div>
  );
}

const format = (time: Date) =>
  `${padNumber(time.getUTCHours())}:${padNumber(time.getUTCMinutes())}:${padNumber(time.getUTCSeconds())}`;

const padNumber = (num: number) => (num < 10 ? `0${num}` : num);
