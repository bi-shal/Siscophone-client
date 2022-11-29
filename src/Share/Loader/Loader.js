import React from 'react';
import { Audio, Puff } from 'react-loader-spinner'
;<Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>

const Loader = () => {
    return (
        <div>
            <Puff height='100' width='100' color='red' ariaLabel='Loading'></Puff>
        </div>
    );
};

export default Loader;