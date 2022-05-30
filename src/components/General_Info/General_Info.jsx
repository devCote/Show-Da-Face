import React from 'react';
import { useDencrypt } from 'use-dencrypt-effect';

const GeneralInfo = ({ generalInfo }) => {
  const values = Object.values(generalInfo).map(
    (item) =>
      `Possible traits: ${item.name.toUpperCase()} ${Math.floor(
        item.value * 100
      )}%`
  );

  const DecrGeneralTyper = () => {
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

  const calculateOffSet = () => {
    const infoPossition = {
      top: 10,
      left: 32,
    };

    return infoPossition;
  };

  const { top, left } = calculateOffSet();

  return (
    <div
      className="info-container"
      style={{
        top: top,
        left: left,
      }}
    >
      <DecrGeneralTyper values={values} />
    </div>
  );
};

export default GeneralInfo;
