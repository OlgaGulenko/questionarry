import React from 'react';

export default class MultipleAnswerComponent extends React.Component{
    render(){
        let variants = this.props.question.answerVariants.map((variant, i) => {
          return (
            <div className="form-check" key={i}>
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" value={variant.guid}
                           checked={this.props.value !== null ? this.props.value.indexOf(variant.guid) > -1: false}
                           onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                    {variant.title}
                </label>
            </div>
          )
        })  
        return(
            <form>
                <div className="form-check">
                    <label>Тип ответа выбор нескольких вариантов из предложенных</label>
                    {variants}
                </div>
            </form>
        )
    }
}