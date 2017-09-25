import React from 'react';

export default class NumberComponent extends React.Component{
validator(value){
console.log(value)

	if(this.props.question.min !== 0){
    if(Number(value) < this.props.question.min) value = this.props.question.min;
  }
  if(this.props.question.max !== 0){
    if(Number(value) > this.props.question.max) value = this.props.question.max;
  }
  if(this.props.question.accuracy !== 0){
    value = (value.toString()).replace(',', '.');
    if(value.indexOf('.') > -1){
      let values = value.split('.');
      if(values.length > 1 && values[1].length > this.props.question.accuracy){
        value = values[0] + (values[1]).toFixed(this.props.question.accuracy);
      }
    }
  }

    this.props.onChange(value, this.props.question.guid);
  }
    render(){
        return(
            <form>
                <div className="form-group">
                    <label>
                      {this.props.question.code}&nbsp;
                      {this.props.question.title}
                    </label>
                    <input type="number" className="form-control" id="numberInput"
                            value={this.props.value || ''}
                            onChange={(e)=>this.validator(e.target.value)}/>
                </div>
            </form>
        )
    }
}
