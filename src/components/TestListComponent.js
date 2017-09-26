import React from 'react';
import '../App.css';
import axios from 'axios';
import questionSwitch, {setContext} from '../questionSwitch';
import SuccessImg from './success_contact.png';

const body = document.querySelector('body');

class TestListComponent extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        sections: [],
        sectionIndex: 0,
        answers: {},
        comments: {},
        status: false,
        sent: false
      };

      this.nextSection = this.nextSection.bind(this);
      this.prevSection = this.prevSection.bind(this);
      this.sendAnswers = this.sendAnswers.bind(this);

      setContext(this);
    }

    componentDidMount(){
      this.getData();
    }

    async getData(){
      try{
        let response = await axios.get('https://api.myjson.com/bins/1hg0h5');

        this.setState({ data: response.data , status: true});
      } catch(e) {
        alert(e.message);
        console.error('fetch error', e);
      }
    }

    nextSection(){
      if(this.state.sectionIndex + 1  < this.state.data.sections.length){
        this.setState({sectionIndex: this.state.sectionIndex + 1}, () => { body.scrollTop = 0 });
      }
    }

    prevSection(){
      if(this.state.sectionIndex  > 0){
        this.setState({sectionIndex: this.state.sectionIndex - 1}, () => { body.scrollTop = 0 });
      }
    }

    sendAnswers(){
  		console.log("Hey here is your answers!!! : ", this.state.answers);
  		this.setState({ sent: true })
  	}

  	render() {
		const questions = this.state.status ? this.state.data.sections[this.state.sectionIndex].questions.map((question, i) => questionSwitch(question, i)) : [];

		return (
      <div className="container">

        {this.state.status ? (
          <div className="questions-header">
            <h3>{this.state.data.introduction}</h3>
            <span>{this.state.data.concluding !== "" ? this.state.data.concluding : <br />}</span>
            <p className="sections-counter">
  		      	Раздел {this.state.sectionIndex + 1} из {this.state.status ? this.state.data.sections.length : 0}
              <br />
              {this.state.data.sections[this.state.sectionIndex].title}
  		      </p>
  		      <hr />
          </div>
        ) : null}


  	    { !this.state.sent ? (
          <div>
            <button type="button" className="btn" disabled={this.state.sectionIndex === 0} onClick={this.prevSection}>
              <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Назад
            </button>
            { this.state.status && this.state.sectionIndex + 1 === this.state.data.sections.length ? (
              <button type="button" className="btn btn-success" id="btn-forward" onClick={this.sendAnswers}>
                Отправить <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            ) : (
              <button type="button" className="btn btn-primary" id="btn-forward" onClick={this.nextSection}>
                Вперед <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
              </button>
            )}
            <hr />

            {this.state.status ? (
              <div className="main">
                <div>{questions}</div>
              </div>
            ): (
              <div className="cssload-container">
                <div className="cssload-lt"></div>
                <div className="cssload-rt"></div>
                <div className="cssload-lb"></div>
                <div className="cssload-rb"></div>
              </div>
            )}

            <hr />
            <button type="button" className="btn" disabled={this.state.sectionIndex === 0} onClick={this.prevSection}>
              <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Назад
            </button>
            { this.state.status && this.state.sectionIndex + 1 === this.state.data.sections.length ? (
              <button type="button" className="btn btn-success" id="btn-forward" onClick={this.sendAnswers}>
                Отправить <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            ) : (
              <button type="button" className="btn btn-primary" id="btn-forward" onClick={this.nextSection}>
                Вперед <i className="fa fa-chevron-circle-right" aria-hidden="true"></i>
              </button>
            )}
          </div>
        ):(
          <div>
            <div className="text-center">
              <br/><strong><h3>Ваша анкета успешно отправлена</h3></strong><br/>
              <img src={SuccessImg} className="rounded" height="200px" width="200px" />
            </div><br/>
            <div className="card">
              <div className="card-header">
                JSON
              </div>
              <div className="card-body">

                <code>
                  {JSON.stringify({
                    Id: this.state.data.Id,
                    questionnaire: this.state.data.questionnaire,
                    respondent: this.state.data.respondent,
                    answers: this.state.answers,
                    comments: this.state.comments
                  })}
                </code>
              </div>
            </div>
          </div>

        )}
		  </div>
		)

	}
}

export default TestListComponent;
