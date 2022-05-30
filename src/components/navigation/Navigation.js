import React from 'react';

const Navigation = ({ title, marginTop = 0, cursor = 'default', refresh }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: `${marginTop}px`,
      }}
      onClick={refresh}
    >
      <p
        className={refresh ? "f3 black dim ma2 pa1" : "f3 ma2 pa1"}
        style={{ color: '#3f3', fontSize: '3rem', cursor }}
      >
        {title}
      </p>
    </div >
  );
};

export default Navigation;
