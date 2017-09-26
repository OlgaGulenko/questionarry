import React from 'react';

export default class TextComponent extends React.Component{
    render(){
        return(
          <div>
            <form>
                <div className="form-group">
                    <label>
                    {this.props.question.code}
                    {this.props.question.title}</label>
                    <textarea className="form-control" rows="3"  value={this.props.value || ''}
                            onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}
                    />
                </div>
            </form>
            { this.props.question.requestComment ? (
              <div className="form-group">
                <label>Обязательный комментарий</label>
                <textarea value={this.props.comment} onChange={e => this.props.onChangeComment(e.target.value, this.props.question.guid)} placeholder={this.props.question.commentExplanation} className="form-control"></textarea>
              </div>
            ) : (
              <strong></strong>
            )}
          </div>
        )
    }
}
/*maxLength={this.props.question.length} */
