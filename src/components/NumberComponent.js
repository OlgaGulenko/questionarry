import React from 'react';

export default class NumberComponent extends React.Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label>Тип ответа число (может иметь максимальное/минимальное знaчение, точность)</label>
                    <input type="number" className="form-control" id="numberInput" 
                            value={this.props.value || ''}
                            onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                </div>
            </form>
        )
    }
}