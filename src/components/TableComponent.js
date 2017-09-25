import React from 'react';

import questionSwitch from '../questionSwitch';

export default class TableComponent extends React.Component{
    constructor(){
      super();

      this.state = {
        rows: []
      };
    }

    addRow(){
      let rows = Array.from(this.state.rows);

      rows.push(0);
      this.setState({ rows });
    }

    removeRow(index){
      let rows = Array.from(this.state.rows);
      console.log(index)
      rows.splice(index, 1);
      this.setState({ rows });
    }

    render(){
      let rows = this.state.rows.map((row, index) => {
        return (
          <tr key={index}>
            <td>{ index + 1 }</td>
            { this.props.question.tabularQuestionList.map((column, index) => {
              return (
                <td key={index}>{questionSwitch(column)}</td>
              )
            }) }
            <td><i onClick={this.removeRow.bind(this, index)} className="fa fa-times" aria-hidden="true"></i></td>

          </tr>

        )
      })

      return(
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
            <button type="button" className="btn" onClick={this.addRow.bind(this)}>
              Добавить
            </button>

        </div>
      )
    }
}
