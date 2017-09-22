import React from 'react';

export default class BooleanComponent extends React.Component{
    render(){
        return(
            <form>
                <div className="form-check">
                    <label>Тип ответа булево</label>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio"
                                   name="exampleRadios" id="exampleRadios1"
                                   value='true' checked={this.props.value === "true"} onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                            Да
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio"
                                   name="exampleRadios" id="exampleRadios1"
                                   value='false' checked={this.props.value === "false"} onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}/>
                            Нет
                        </label>
                    </div>
                </div>
            </form>

        )
    }
}