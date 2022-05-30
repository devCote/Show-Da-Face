import React from 'react';
import { useDencrypt } from 'use-dencrypt-effect';

const Celebrity = ({ celebrity, box }) => {

  const values = Object.values(celebrity)
    .filter((item) => item.value > 0.02)
    .map((item) => {
      const calc = Math.floor(item.value * 100);
      return `Celeberty match: ${item.name.toUpperCase()} ${calc}%`;
    });
  if (!values.length) {
    values.push('Celeberty match: None');
  }
  const DecrCelebTyper = () => {
    const { result, dencrypt } = useDencrypt();

    React.useEffect(() => {
      let i = 0;

      const action = setInterval(() => {
        dencrypt(values[i]);

        i = i === values.length - 1 ? 0 : i + 1;
      }, 4000);

      return () => clearInterval(action);
    }, [dencrypt]);

    return <p className="p-text">{result}</p>;
  };
  return (
    <div
      className="info-container"
      style={{
        top: box.celebBotom,
        left: box.celebLeft,
      }}
    >
      <DecrCelebTyper values={values} />
    </div>
  );
};

export default Celebrity;
