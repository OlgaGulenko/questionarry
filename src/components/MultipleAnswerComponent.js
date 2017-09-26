import React from 'react';

export default class MultipleAnswerComponent extends React.Component{
    render(){
        let variants=this.props.answers.filter(answer=>answer.elementaryQuestionGuid===this.props.question.elementaryQuestionGuid)
            variants = variants.map((variant, i) => {
          return (
            <div className="form-check" key={i}>

                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                    value={variant.answer.guid}
                    checked={this.props.value !== null ? this.props.value.indexOf(variant.answer.guid) > -1: false}
                    onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}
                  />
                  <span className="custom-control-indicator" type="checkbox" />
                  <span className="custom-control-description">{variant.answer.title}</span>
                </label>
            </div>
          )
        })
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
            { this.props.question.requestComment  ? (
              <div className="form-group">
                <label>Обязательный комментарий</label>
                <textarea className="form-control"></textarea>
              </div>

            ) : (
              <strong></strong>
            )}
          </div>
        )
    }
}
