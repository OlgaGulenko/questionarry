import React from 'react';
import NumberInput from 'react-number-input';
export default class NumberComponent extends React.Component{

	accuracyPlaceholder(){
		let placeholder = "0.";

		for(let i = 0; i < this.props.question.accuracy; i++) placeholder += "0";

		return placeholder;
	}

    render(){
        return(
					<div>
            <form>
                <div className="form-group">
                    <label>
                      {this.props.question.code}&nbsp;
                      {this.props.question.title}
                    </label>
                    <NumberInput
											type="tel"
											className="form-control"
											id="numberInput"
                      value={this.props.value || ''}
                      onChange={(value)=>this.props.onChange(value, this.props.question.guid)}
											min={this.props.question.min}
											max={this.props.question.max}
											format={this.accuracyPlaceholder()}
										/>


                </div>
            </form>
						{ this.props.question.requestComment ? (
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
