import React from 'react';
import '../App.css';
import axios from 'axios';
import StringComponent from './StringComponent';
import TextComponent from './TextComponent';
import BooleanComponent from './BooleanComponent';
import CommentComponent from './CommentComponent';
import DateComponent from './DateComponent';
import MultipleAnswerComponent from './MultipleAnswerComponent';
import NumberComponent from './NumberComponent';
import SingleAnswerComponent from './SingleAnswerComponent';



class TestListComponent extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        sections: [],
        sectionIndex: 0,
        answers: {},
        status: false
      };

      this.nextSection = this.nextSection.bind(this);
      this.prevSection = this.prevSection.bind(this);
      this.onChange = this.onChange.bind(this);
      this.someOf = this.someOf.bind(this);
      this.sendAnswers = this.sendAnswers.bind(this);
    }

    componentDidMount(){
      this.getData();
    }

    async getData(){
        try{
          let response = await axios.get('https://api.myjson.com/bins/tkvgp');

          this.setState({ data: response.data , status: true});
        } catch(e) {
          alert(e.message);
          console.error('fetch error', e);
        }
    }

    nextSection(){
        if(this.state.sectionIndex + 1  < this.state.data.sections.length){
            this.setState({sectionIndex: this.state.sectionIndex + 1});
        }
    }

    prevSection(){
        if(this.state.sectionIndex  > 0){
            this.setState({sectionIndex: this.state.sectionIndex - 1});
        }
    }

    onChange(value, guid){
    	console.log(guid);
    	let answers = Object.assign(this.state.answers);
    	answers[guid] = value;
    	this.setState({answers}, () => {console.log(this.state.answers);});
   }

  	someOf(value, guid){
  		let answers = Object.assign(this.state.answers);
  		console.log("value: ",value, 'guid',guid);

  		let index = answers[guid] ? answers[guid].indexOf(value) : -1;
  		if(index > -1 ){
  			answers[guid].splice(index,1);
  		}else{
              answers[guid] = answers[guid] ? [...answers[guid], value] : [value];
          }
          this.setState({answers}, () => {console.log(this.state.answers);});
      }

      sendAnswers(){
  		console.log("Hey here is your answers!!! : ", this.state.answers);
  		// axios.post('',this.state.answers);
  	}

    questionSwitch(question, i){
      switch(question.answerType){
        case 'Строка': {
          return (
            <StringComponent
              onChange={this.onChange}
              question={question}
							value={this.state.answers[question.guid] !== undefined ? this.state.answers[question.guid] :null }
							key={i}
            />
          )
        }
				case 'text': {
                	return <TextComponent onChange={this.onChange} question={question}
										  value={this.state.answers[question.guid] !== undefined
                                              ? this.state.answers[question.guid]
                                              :null}Name
										  key={i}/>;
				}
				case 'number': {
                	return <NumberComponent onChange={this.onChange} question={question}
											value={this.state.answers[question.guid] !== undefined
                                                ? this.state.answers[question.guid]
                                                :null}
											key={i}/>;
				}
				case 'date': {
                	return <DateComponent onChange={this.onChange} question={question}
										  value={this.state.answers[question.guid] !== undefined
                                              ? this.state.answers[question.guid]
                                              :null}
										  key={i}/>;
				}
				case 'bool': {
                	return <BooleanComponent onChange={this.onChange} question={question}
											 value={this.state.answers[question.guid] !== undefined
                                                 ? this.state.answers[question.guid]
                                                 :null}
											 key={i}/>;
				}
				case 'oneof': {
                	return <SingleAnswerComponent onChange={this.onChange} question={question}
												  value={this.state.answers[question.guid] !== undefined
                                                      ? this.state.answers[question.guid]
                                                      :null}
												  key={i}/>;
				}
				case 'someof': {
        	return (
            <MultipleAnswerComponent
              onChange={this.someOf}
              question={question}
  						value={this.state.answers[question.guid] !== undefined ? this.state.answers[question.guid] : null}
  						key={i}
            />
          )
				}
        default:
          return <div key={i} className="alert alert-danger" role="alert"><i className="fa fa-bolt" aria-hidden="true"></i> Неизвестный тип вопроса</div>
      }
    }

  	render() {
		const questions = this.state.status ? this.state.data.sections[this.state.sectionIndex].questions.map((question, i) => this.questionSwitch(question, i)) : [];

		return (
      <div className="container">

        {this.state.status ? (
          <div className="questions-header">
            <h3>{this.state.data.introduction}</h3>
            <span>{this.state.data.concluding}</span>
            <p className="sections-counter">
  		      	Раздел {this.state.sectionIndex + 1} из {this.state.status ? this.state.data.sections.length : 0}
              <br />
              {this.state.data.sections[this.state.sectionIndex].title}
  		      </p>
  		      <hr />
          </div>
        ) : null}


	      <button type="button" className="btn" disabled={this.state.sectionIndex === 0} onClick={this.prevSection}>
      		Назад
	      </button>
        { this.state.status && this.state.sectionIndex + 1 === this.state.data.sections.length ? (
          <button type="button" className="btn btn-success" id="btn-forward" onClick={this.sendAnswers}>
			  		Отправить
		  	  </button>
        ) : (
          <button type="button" className="btn btn-primary" id="btn-forward" onClick={this.nextSection}>
			  		Вперед
			  	</button>
        )}

			  {this.state.status ? (
          <div className="main">
  				  <ol>{questions}</ol>
  			  </div>
        ): (
          <div className="cssload-container">
  				  <div className="cssload-lt"></div>
  				  <div className="cssload-rt"></div>
  				  <div className="cssload-lb"></div>
  				  <div className="cssload-rb"></div>
  			  </div>
        )}

        <button type="button" className="btn" disabled={this.state.sectionIndex === 0} onClick={this.prevSection}>
      		Назад
	      </button>
        { this.state.status && this.state.sectionIndex + 1 === this.state.data.sections.length ? (
          <button type="button" className="btn btn-success" id="btn-forward" onClick={this.sendAnswers}>
			  		Отправить
		  	  </button>
        ) : (
          <button type="button" className="btn btn-primary" id="btn-forward" onClick={this.nextSection}>
			  		Вперед
			  	</button>
        )}
		  </div>
		)


	}
}

export default TestListComponent;
