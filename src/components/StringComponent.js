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
                <input
                  maxLength={this.props.question.length}
                  type="text"
                  className="form-control"
                  value={this.props.value || ''}
                  onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid, this.props.question.elementaryQuestionGuid)}
                />
            </div>
            { this.props.question.requestComment == true ? (
              <div className="form-group">
                <label>Обязательный комментарий</label>
                <textarea value={this.props.comment} onChange={e => this.props.onChangeComment(e.target.value, this.props.question.guid)} placeholder={this.props.question.commentExplanation} className="form-control"></textarea>
              </div>

            ) : null}
          </div>
        )
    }
}
