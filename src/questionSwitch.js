import React from 'react';

import StringComponent from './components/StringComponent';
import TextComponent from './components/TextComponent';
import BooleanComponent from './components/BooleanComponent';
import CommentComponent from './components/CommentComponent';
import DateComponent from './components/DateComponent';
import MultipleAnswerComponent from './components/MultipleAnswerComponent';
import NumberComponent from './components/NumberComponent';
import SingleAnswerComponent from './components/SingleAnswerComponent';
import TableComponent from './components/TableComponent';

let context = null;
export function setContext(ctx){
  context = ctx;
}


function onChange(value, guid){
  console.log(guid);
  let answers = Object.assign(context.state.answers);
  answers[guid] = value;
  context.setState({answers}, () => {console.log(context.state.answers);});
}

function someOf(value, guid){
  let answers = Object.assign(context.state.answers);
  console.log("value: ",value, 'guid',guid);

  let index = answers[guid] ? answers[guid].indexOf(value) : -1;
  if(index > -1 ){
    answers[guid].splice(index,1);
  }else{
    answers[guid] = answers[guid] ? [...answers[guid], value] : [value];
  }
  context.setState({answers}, () => {console.log(context.state.answers);});
}

export default function questionSwitch(question, i = 0){
  switch(question.answerType){
    case 'Строка': {
      return (
        <StringComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null }
          key={i}
        />
      )
    }
    case 'text': {
      return(
        <TextComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
        />
      )
    }
    case 'number': {
      return (
        <NumberComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
        />
      )
    }
    case 'Дата': {
      return (
        <DateComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
        />
      )
    }
    case 'Булево': {
      return (
        <BooleanComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
        />
      )
    }
    case 'Выбор одного варианта ответа из предложенных': {
      return (
        <SingleAnswerComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
          answers={context.state.data.sections[context.state.sectionIndex].answers}
        />
      )
    }
    case '': {
      return (
        <TableComponent
          onChange={onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
        />
      )
    }
    case 'Выбор нескольких вариантов ответа из предложенных': {
      return (
        <MultipleAnswerComponent
          onChange={someOf}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] : null}
          key={i}
          answers={context.state.data.sections[context.state.sectionIndex].answers}
        />
      )
    }
   default:
      return <div key={i} className="alert alert-danger" role="alert"><i className="fa fa-bolt" aria-hidden="true"></i> Неизвестный тип вопроса</div>
  }
}
