// * Base
import React, { memo } from 'react';

const Loading: React.FC = memo(() => {
  return (
    <div className="wrapper">
      <div className="font-base text-2xl mt-3">Loading...</div>
    </div>
  );
});

export default Loading;
