import React from 'react'
import GuesserComponent from '../components/GuesserComponent'
import ChooserComponent from '../components/ChooserComponent'
import io from 'socket.io-client';

class GameContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      playerType: null,
      questions: [],
      question: null,
      answers: [],
      answer: null,
      celeb: null
    };
    this.socket = io('http://localhost:3001');
    this.socket.on('question', this.addQuestion);
    this.socket.on('answer', this.addAnswer);

    this.setCeleb = this.setCeleb.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  selectPlayerType(playerType) {
    this.setState({ playerType })
  }

  setCeleb(celeb){
    this.setState({celeb: celeb})
  }

  addQuestion(question){
    const questions = this.state.questions;
    const newQuestions = [question, ...questions];
    this.setState(
      {questions: newQuestions}
    )
  }

  addAnswer(answer){
    const answers = this.state.answers;
    const newAnswers = [answer, ...answers];
    this.setState(
      {answers: newAnswers}
    )
  }

  celebKeyUp(event){
    this.setState({
      celeb: event.target.value
    });
  }

  questionKeyUp(event) {
    this.setState({
      question: event.target.value
    });
  }

  answerKeyUp(event) {
    this.setState({
      answer: event.target.value
    });
  }

  render() {

    switch(this.state.playerType) {
      case "PLAYERTYPE_GUESSER":
      return (
        <GuesserComponent questionKeyUp={this.questionKeyUp}/>
      )
      case "PLAYERTYPE_CHOOSER":
      return (
        <ChooserComponent celebKeyUp={this.celebKeyUp} answerKeyUp={this.answerKeyUp}/>
      )
      default:
      return (
        <div id="homeWrapper">
        <h1 className="title">20 Questions</h1>
        <h3 className="title">Choose your player</h3>
        <button onClick={()=>{this.selectPlayerType("PLAYERTYPE_GUESSER")}}>
        Guesser
        </button>
        <button onClick={()=>{this.selectPlayerType("PLAYERTYPE_CHOOSER")}}>
        Chooser
        </button>
        </div>
      )
    }

  }
}

export default GameContainer
