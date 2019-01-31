import React, {Component} from 'react';
import ResponseFormComponent from './ResponseFormComponent';
import TFButtonComponent from './TFButtonComponent';

class ChooserComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
      <h1>Chooser</h1>
      <ResponseFormComponent/>
      <TFButtonComponent />
      </div>
    )
  }

}

export default ChooserComponent;
