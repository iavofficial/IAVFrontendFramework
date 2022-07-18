import React, { useEffect, useState } from 'react';
import { useTranslator } from './internationalization/translators';
import { BLUE2 } from '../constants';

interface Props{
  clockColor?: string;
  dateColor?: string;
}


export const Clock = (props: Props) => {
  const t = useTranslator();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateString = date.toLocaleDateString('de-DE', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='p-d-flex p-jc-between p-pl-3 p-pr-3 p-pb-2'>
      <div style={{ fontWeight: 500, color: (props.dateColor ? props.dateColor: "black" )}}>{t('Date')}:</div>
      <div style={{ color: (props.clockColor ? props.clockColor: BLUE2 )}}>{dateString}</div>
    </div>
  );
};
