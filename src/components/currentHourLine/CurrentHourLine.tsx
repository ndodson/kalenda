import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { parseCssDark } from '../../utils/common';
import { useContext } from 'react';

const CurrentHourLine = () => {
  const [store] = useContext(Context);
  const { config, colors } = store;
  
  const currentTime = DateTime.now();

  const wrapperStyle: any = {
    top:
      currentTime.hour * config.hourHeight +
      (currentTime.minute / 60) * config.hourHeight,
  };

  return (
    <div style={wrapperStyle} className={'Kalend__CurrentHourLine'}>
      <div
        className={parseCssDark(
          'Kalend__CurrentHourLine__circle',
          false
        )}
        style={{background: store.style.primaryColor}}
      />
      <div
        style={{background: store.style.primaryColor}}
        className={parseCssDark('Kalend__CurrentHourLine__line', false)}
      />
    </div>
  );
};

export default CurrentHourLine;