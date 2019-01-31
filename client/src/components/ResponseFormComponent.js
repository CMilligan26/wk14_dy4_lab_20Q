import React from 'react';

const ResponseFormComponent = (props) => {

  return (
    <div>
    <form onSubmit={props.onSubmit}>
    <input onKeyUp={props.keyUp} type="text" ></input>
    <input type="submit" value="Send"/>
    </form>
    </div>
  )
}

export default ResponseFormComponent;
