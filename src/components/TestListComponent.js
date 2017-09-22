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
        	questions: [],
            sections: [],
            sectionIndex: '',
			answers: {},
			value: '',
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



    getData(){
        axios.get('https://api.myjson.com/bins/1h43gp').then((response) => {
            this.setState({questions: response.data, 
            			   sections: [...this.state.sections, response.data[0].section], 
            			   sectionIndex: 0});
            let sections = [];
            for(let question of response.data){
                if(sections.findIndex(section => section.guid === question.section.guid) < 0) sections.push(question.section);
            }
            this.setState({ sections , status: true});
        });
    }

    nextSection(){
        if(this.state.sectionIndex + 1  < this.state.sections.length){
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

	render() {
        let type = this.state.questions.map((question, i) => {
            switch(question.answerType){
                case 'string': {
                    return <StringComponent onChange={this.onChange} question={question}
											value={this.state.answers[question.guid] !== undefined
												? this.state.answers[question.guid]
												:null}
											key={i}/>;
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
                	return <MultipleAnswerComponent onChange={this.someOf} question={question}
													value={this.state.answers[question.guid] !== undefined
                                                        ? this.state.answers[question.guid]
                                                        :null}
													key={i}/>;
				}
            }
		});

		const questions = this.state.questions.map((question, i) => {
			return (
				<div key={i}>
				  {this.state.questions[i].section.guid === 
				  	this.state.sections[this.state.sectionIndex].guid 
					  	? <li>
					  		{question.title}
						  	{type[i]}
					  	  </li>
					  : null}
				</div>
			)
		});
		return (
	      <div className="container">
		    <div className="header clearfix">
  		      <h3>
  		      	{this.state.sections.length > 0  
	      			? this.state.sections[this.state.sectionIndex].title 
	      			: 'Загрузка'}
  		      </h3>
		      <p className="float-right">
		      	Раздел {this.state.sectionIndex + 1} из {this.state.sections.length}
		      </p>
		      <hr />
		      <button type="button" className="btn" disabled={this.state.sectionIndex === 0} 
		      		  onClick={this.prevSection}>
		      		Назад
		      </button>
			  {this.state.sectionIndex + 1 === this.state.sections.length 
			  	? <button type="button" className="btn btn-success" id="btn-forward" onClick={this.sendAnswers}>
			  		Отправить
			  	  </button> 
			  	: <button type="button" className="btn btn-primary" id="btn-forward" 
			  			onClick={this.nextSection}>
			  		Вперед
			  	</button>}
		    </div>
			  {this.state.status ? <div className="main">
				  <ol>{questions}</ol>
			  </div>: (<div className="cssload-container">
				  <div className="cssload-lt"></div>
				  <div className="cssload-rt"></div>
				  <div className="cssload-lb"></div>
				  <div className="cssload-rb"></div>
			  </div>)}


		    <div className="bottom-nav">
	    		<button type="button" className="btn" disabled={this.state.sectionIndex === 0} 
	    				onClick={this.prevSection}>Назад</button>
				{this.state.sectionIndex + 1 === this.state.sections.length 
					?  <button type="button" className="btn btn-success" 
								id="btn-forward"
								onClick={this.sendAnswers}>
							Отправить
						</button> 
					:   <button type="button" className="btn btn-primary" id="btn-forward" 
								onClick={this.nextSection}>
							Вперед
						</button>}
		    </div>
		  </div>
		)


	}
}

export default TestListComponent;