import React, {Component} from 'react';
import ResponseFormComponent from './ResponseFormComponent';

class GuesserComponent extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
      <h1>Guesser</h1>
      <ResponseFormComponent keyUp={this.props.keyUp} onSubmit={this.props.onSubmit}/>
      {this.props.qna}
      </div>
    )
  }

}

export default GuesserComponent;
