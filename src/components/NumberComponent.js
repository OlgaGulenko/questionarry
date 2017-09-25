import React from 'react';

export default class NumberComponent extends React.Component{
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
                            onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                </div>
            </form>
        )
    }
}
