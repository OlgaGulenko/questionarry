
import React from 'react';

export default class SingleAnswerComponent extends React.Component{
    render(){
        let variants = this.props.question.answerVariants.map((variant, i) => {
          return (
            <div key={i}>
              <label className="form-check-label">
                <input className="form-check-input" type="radio"
                       name="exampleRadios" id="exampleRadios1"
                       value={variant.guid} checked={this.props.value === variant.guid} onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                {variant.title}
              </label>
            </div>
          )
        });
        return(
            <form>
                <div className="form-check">
                    <label>Тип ответа выбор 1 варианта из предложенных</label>
                    {variants}
                </div>
            </form>

        )
    }
}