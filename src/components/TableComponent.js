import React from 'react';

import questionSwitch from '../questionSwitch';

export default class TableComponent extends React.Component{
    constructor(props){
      super(props);

      if(this.props.value){
        console.log('value', this.props.value);

        // let keys = Object.keys(this.props.value);
        // let count = 0;
        // for(let key of keys){
        //   count = this.props.value[key].length > count ? this.props.value[key].length : count;
        // }
        //
        // let rows = [];
        // for(let i = 0; i < count; i++){
        //   rows.push({});
        // }
        //
        // this.state = { rows };

        let rows = [];
        for(let i = 0; i < this.props.value.length; i++){
          rows.push({});
        }

        this.state = { rows };
      } else {
        this.state = {
          rows: []
        }
      }
    }

    addRow(){
      let rows = Array.from(this.state.rows);

      rows.push({});

      let columns = this.props.question.tabularQuestionList.map((column, index) => {
        return {
          guid: this.props.question.guid,
          elementaryQuestionGuid: column.elementaryQuestionGuid,
          answer: null,
          comment: null
        }
      })

      console.log(columns);

      this.setState({ rows });

      this.props.onAddTableRows(columns);
    }

    removeRow(index){
      let rows = Array.from(this.state.rows);

      rows.splice(index, 1);
      this.setState({ rows });

      this.props.onRemoveTableRows(index, this.props.question.guid);
    }

    render(){
      let rows = this.state.rows.map((row, idx) => {
        return (
          <tr key={idx}>
            <td>{ idx + 1 }</td>
            { this.props.question.tabularQuestionList.map((column, index) => {
              return (
                <td key={index}>{questionSwitch(column, 0, {
                  guid: this.props.question.guid,
                  elementaryQuestionGuid: column.elementaryQuestionGuid,
                  index: idx,
                  column: index
                })}</td>
              )
            }) }
            <td><i onClick={this.removeRow.bind(this, idx)} className="fa fa-times" aria-hidden="true"></i></td>

          </tr>

        )
      });

      return(
        <div>
          <div className="form-group">
              <label>
                {this.props.question.code}&nbsp;
                {this.props.question.title}
              </label>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    { this.props.question.tabularQuestionList.map((column, index) => {
                      return (
                        <th key={index}>{column.title}</th>
                      )
                    }) }
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { rows }
                </tbody>
              </table>
              <button type="button" className="btn btn-secondary" onClick={this.addRow.bind(this)}>
                <i className="fa fa-plus-circle" aria-hidden="true"></i> Добавить
              </button>

          </div>
          { this.props.question.requestComment ==true ? (
            <div className="form-group">
              <label>Обязательный комментарий</label>
              <textarea placeholder={this.props.question.commentExplanation} className="form-control"></textarea>
            </div>

          ) : (
            <strong></strong>
          )}
        </div>
      )
    }
}
