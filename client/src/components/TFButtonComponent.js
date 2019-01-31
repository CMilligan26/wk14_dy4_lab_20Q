import React from 'react';

const TFButtonComponent = (props) => {

  return (
    <div>
    <form onSubmit={props.onSubmit}>
    <input type="submit" value="True"></input>
    <input type="submit" value="False"></input>
    </form>
    </div>
  )
};

export default TFButtonComponent;
