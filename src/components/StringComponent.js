import React from 'react';

export default class StringComponent extends React.Component{
    render(){
        return(
            <li>
                <div className="form-group">
                    <label>Тип ответа строка</label>
                    <input type="text" className="form-control" value={this.props.value || ''} onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                </div>
            </li>
        )
    }
}
