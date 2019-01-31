import React from 'react';
import GuesserComponent from '../components/GuesserComponent';
import ChooserComponent from '../components/ChooserComponent';
import io from 'socket.io-client';
import MessageComponent from '../components/MessageComponent';

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

    this.celebKeyUp = this.celebKeyUp.bind(this);
    this.questionKeyUp = this.questionKeyUp.bind(this);

    this.submitQuestionForm = this.submitQuestionForm.bind(this);
    this.submitAnswerForm = this.submitAnswerForm.bind(this);
    this.submitCelebForm = this.submitCelebForm.bind(this);


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

  submitQuestionForm(event){
    event.preventDefault()

    if (this.state.question){
      const newQuestion = {question: this.state.question};

      this.socket.emit('question', newQuestion);
    }
  }

  submitAnswerForm(event){
    event.preventDefault()

    if (this.state.answer){
      const newAnswer = {answer: this.state.answer};

      this.socket.emit('answer', newAnswer);
    }
  }

  submitCelebForm(event){
    event.preventDefault()

    if (this.state.celeb){
      const newCeleb = {celeb: this.state.celeb};

      this.socket.emit('celeb', newCeleb);
    }
  }

  render() {

    const questions = this.state.questions.map((question, index) => {
      return <MessageComponent key={index} text="Question:" message={question.question}/>
    })

    const answers = this.state.answers.map((answer, index) => {
      return <MessageComponent key={index} text="Answer:" message={answer.answer}/>
    })

    const questionsAndAnswers = [];

    for (var i = 0; i < questions.length; i++) {
      questionsAndAnswers.push(questions[i])
      if (answers[i] !== null) {
      questionsAndAnswers.push(answers[i])
    }
    }

    switch(this.state.playerType) {
      case "PLAYERTYPE_GUESSER":
      return (
        <GuesserComponent keyUp={this.questionKeyUp} qna={questionsAndAnswers} onSubmit={this.submitQuestionForm}/>
      )
      case "PLAYERTYPE_CHOOSER":
      return (
        <ChooserComponent keyUp={this.celebKeyUp} qna={questionsAndAnswers} onSubmit={this.submitAnswerForm} celebSubmit={this.submitCelebForm}/>
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
