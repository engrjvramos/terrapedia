import { getTimeForOffset } from '@/lib/utils';
import { useEffect, useState } from 'react';

type Props = {
  countryName: string;
  capital: string;
  timeZone: string;
};

export default function CountryTime({ capital, countryName, timeZone }: Props) {
  const [timeResult, setTimeResult] = useState(getTimeForOffset({ offset: timeZone, capital, country: countryName }));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateTime = () => {
      setTimeResult(getTimeForOffset({ offset: timeZone, capital, country: countryName }));

      if (interval) clearInterval(interval);

      const now = new Date();
      const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

      setTimeout(() => {
        setTimeResult(getTimeForOffset({ offset: timeZone, capital, country: countryName }));

        interval = setInterval(() => {
          setTimeResult(getTimeForOffset({ offset: timeZone, capital, country: countryName }));
        }, 60000);
      }, msUntilNextMinute);
    };

    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, [timeZone, capital, countryName]);

  return (
    <div className="text-center xl:text-left">
      <div className="text-4xl">{timeResult.time}</div>
      <div className="text-muted-foreground">
        {timeResult.date} <span>({timeResult.gmt})</span>
      </div>
      <div className="text-muted-foreground">{timeResult.location}</div>
    </div>
  );
}
