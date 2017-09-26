import React from 'react';

export default class StringComponent extends React.Component{
    render(){
        return(
          <div>
            <div className="form-group">
                <label>
                  {this.props.question.code}&nbsp;
                  {this.props.question.title}
                </label>
                <input maxLength={this.props.question.length} type="text" className="form-control" value={this.props.value || ''} onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>

            </div>
            { this.props.question.requestComment == true ? (
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
