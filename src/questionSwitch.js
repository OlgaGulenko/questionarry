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
  //console.log(guid);
  let answers = Object.assign(context.state.answers);
  answers[guid] = value;
  context.setState({answers}, () => {
    console.log(answers);
  });
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

function onChangeTable(table, value, guid){
  let answers = Object.assign(context.state.answers);

  /*
    table
      .guid
      .elementaryQuestionGuid
      .index

    value

    guid
  */

  answers[table.guid] = answers[table.guid] ? answers[table.guid] : {};
  answers[table.guid][table.elementaryQuestionGuid] = answers[table.guid][table.elementaryQuestionGuid] ? answers[table.guid][table.elementaryQuestionGuid] : [];
  answers[table.guid][table.elementaryQuestionGuid][table.index] = value;

  context.setState({answers}, () => {
    console.log('answers', answers);
  });
}

export default function questionSwitch(question, i = 0, table = null){
  switch(question.answerType){
    case 'Строка': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return (
        <StringComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={value}
          key={i}
        />
      )
    }
    case 'text': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return(
        <TextComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={value}
          key={i}
        />
      )
    }
    case 'Число': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return (
        <NumberComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={value}
          key={i}
        />
      )
    }
    case 'Дата': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return (
        <DateComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={table}
          key={i}
        />
      )
    }
    case 'Булево': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return (
        <BooleanComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={value}
          key={i}
        />
      )
    }
    case 'Выбор одного варианта ответа из предложенных': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return (
        <SingleAnswerComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={value}
          key={i}
          answers={context.state.data.sections[context.state.sectionIndex].answers}
        />
      )
    }
    case '': {
      return (
        <TableComponent
          onChange={table ? onChangeTable.bind(null, table) : onChange}
          question={question}
          value={context.state.answers[question.guid] !== undefined ? context.state.answers[question.guid] :null}
          key={i}
        />
      )
    }
    case 'Выбор нескольких вариантов ответа из предложенных': {
      let value = null;
      if(!table && context.state.answers[question.guid] !== undefined){
        value = context.state.answers[question.guid];
      }
      if(table &&
        context.state.answers[table.guid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid] &&
        context.state.answers[table.guid][table.elementaryQuestionGuid][table.index]){
        value = context.state.answers[table.guid][table.elementaryQuestionGuid][table.index];
      }

      return (
        <MultipleAnswerComponent
          onChange={table ? onChangeTable.bind(null, table) : someOf}
          question={question}
          value={value}
          key={i}
          answers={context.state.data.sections[context.state.sectionIndex].answers}
        />
      )
    }
   default:
      return <div key={i} className="alert alert-danger" role="alert"><i className="fa fa-bolt" aria-hidden="true"></i> Неизвестный тип вопроса</div>
  }
}
