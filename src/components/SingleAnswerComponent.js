
import React from 'react';

export default class SingleAnswerComponent extends React.Component{
    render(){
      let variants=this.props.answers.filter(answer=>answer.elementaryQuestionGuid===this.props.question.elementaryQuestionGuid)
        variants = variants.map((variant, i) => {
          return (
            <div key={i}>
              <label className="custom-control custom-radio" id="radio1" name="radio" type="radio">
                <input
                  id="radio1"
                  name="radio"
                  type="radio"
                  className="custom-control-input"
                  value={variant.answer.guid}
                  checked={this.props.value === variant.answer.guid}
                  onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}
                />
                <span
                  className="custom-control-indicator"
                  name="exampleRadios"
                  id="exampleRadios1"
                >
                </span>
                <span className="custom-control-description">{variant.answer.title}</span>
              </label>

            </div>
          )
        });
        return(
          <div>
            <form>
                <div className="form-check">
                  <label>
                    {this.props.question.code}&nbsp;
                    {this.props.question.title}
                  </label>
                    {variants}
                </div>
            </form>

            { this.props.question.requestComment ==true ? (
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
