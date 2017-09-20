import React from 'react';

const UnrealisticDumbComponent = ({ onReply }) => (
  <div>
    <button onClick={() => onReply('Ja')}>Alles gut?</button>
  </div>
);

export default UnrealisticDumbComponent;
