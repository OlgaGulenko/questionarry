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

function onChange(value, guid, elementaryQuestionGuid){
  //console.log(guid);
  let answers = Object.assign(context.state.answers);
  if(answers[guid]){
    answers[guid] = {
      ...answers[guid],
      answer: value
    };
  } else {
    answers[guid] = {
      guid,
      elementaryQuestionGuid,
      answer: value
    };
  }
  context.setState({answers}, () => {
    console.log(answers);
  });
}

function onChangeComment(value, guid){
  let answers = Object.assign(context.state.answers);
  if(answers[guid]){
    answers[guid] = {
      ...answers[guid],
      comment: value
    };
  } else {
    answers[guid] = {
      guid,
      answer: null,
      comment: value
    };
  }

  context.setState({answers}, () => {
    console.log('answers', answers);
  });
}

function someOf(value, guid, elementaryQuestionGuid){
  let answers = Object.assign(context.state.answers);
  console.log("value: ",value, 'guid',guid);

  let index = answers[guid] ? answers[guid].answer.indexOf(value) : -1;

  console.log(index, answers[guid] ? answers[guid].answer : false)

  if(index > -1 ){
    answers[guid].answer.splice(index,1);
  }else{
    answers[guid] = answers[guid] ? {
      guid,
      elementaryQuestionGuid,
      answer: [...answers[guid].answer, value]
    } : {
      guid,
      elementaryQuestionGuid,
      answer: [value]
    };
  }
  context.setState({answers}, () => {console.log(context.state.answers);});
}

function onChangeTable(table, value, guid){
  let answers = Object.assign(context.state.answers);

  answers[table.guid] = answers[table.guid] ? answers[table.guid] : {};
  answers[table.guid][table.elementaryQuestionGuid] = answers[table.guid][table.elementaryQuestionGuid] ? answers[table.guid][table.elementaryQuestionGuid] : [];
  answers[table.guid][table.elementaryQuestionGuid][table.index] = answers[table.guid][table.elementaryQuestionGuid][table.index] ? {
    ...answers[table.guid][table.elementaryQuestionGuid][table.index],
    answer: value
  } : {
    guid: table.guid,
    elementaryQuestionGuid: table.elementaryQuestionGuid,
    answer: value
  };

  context.setState({answers}, () => {
    console.log('answers', answers);
  });
}

function onChangeTableComment(table, value, guid){
  let answers = Object.assign(context.state.answers);

  console.log('onChangeTableComment', table, value, guid)

  answers[table.guid] = answers[table.guid] ? answers[table.guid] : {};
  answers[table.guid][table.elementaryQuestionGuid] = answers[table.guid][table.elementaryQuestionGuid] ? answers[table.guid][table.elementaryQuestionGuid] : [];
  answers[table.guid][table.elementaryQuestionGuid][table.index] = answers[table.guid][table.elementaryQuestionGuid][table.index] ? {
    ...answers[table.guid][table.elementaryQuestionGuid][table.index],
    comment: value
  } : {
    guid: table.guid,
    elementaryQuestionGuid: table.elementaryQuestionGuid,
    answer: null,
    comment: value
  };

  context.setState({answers}, () => {
    console.log('answers', answers);
  });
}

export default function questionSwitch(question, i = 0, table = null){
  switch(question.answerType){
    case 'Строка': {
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
          key={i}
        />
      )
    }
    case 'text': {
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
          key={i}
        />
      )
    }
    case 'Число': {
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
          key={i}
        />
      )
    }
    case 'Дата': {
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
          key={i}
        />
      )
    }
    case 'Булево': {
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
          key={i}
        />
      )
    }
    case 'Выбор одного варианта ответа из предложенных': {
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
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
      let value = { answer: null };
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
          onChangeComment={table ? onChangeTableComment.bind(null, table) : onChangeComment}
          comment={value.comment}
          question={question}
          value={value.answer}
          key={i}
          answers={context.state.data.sections[context.state.sectionIndex].answers}
        />
      )
    }
   default:
      return <div key={i} className="alert alert-danger" role="alert"><i className="fa fa-bolt" aria-hidden="true"></i> Неизвестный тип вопроса</div>
  }
}
