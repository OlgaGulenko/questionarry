import React from 'react';

export default class StringComponent extends React.Component{
    render(){
        return(
            <div className="form-group">
                <label>
                  {this.props.question.code}&nbsp;
                  {this.props.question.title}
                </label>
                <input type="text" className="form-control" value={this.props.value || ''} onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
            </div>
        )
    }
}
