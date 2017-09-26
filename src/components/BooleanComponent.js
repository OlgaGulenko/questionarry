import React from 'react';

export default class BooleanComponent extends React.Component{
    render(){
        return(
          <div>
            <form>
                <div className="form-check">
                    <label>
                      {this.props.question.code}&nbsp;
                      {this.props.question.title}
                    </label>
                    <div className="form-check">
                      <label className="custom-control custom-radio" id="radio1" name="radio" type="radio">
                        <input
                          id="radio1"
                          name="radio"
                          type="radio"
                          className="custom-control-input"
                          value='true'
                          checked={this.props.value === "true"}
                          onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}
                        />
                        <span
                          className="custom-control-indicator"
                          name="exampleRadios"
                          id="exampleRadios1"
                        >
                        </span>
                        <span className="custom-control-description">Да</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="custom-control custom-radio" id="radio2" name="radio" type="radio">
                        <input
                          id="radio2"
                          name="radio"
                          type="radio"
                          className="custom-control-input"
                          value='false'
                          checked={this.props.value === "false"}
                          onChange={(e)=>this.props.onChange(e.target.value, this.props.question.guid)}
                        />
                        <span
                          className="custom-control-indicator"
                          name="radio"
                          id="radio2"
                        >
                        </span>
                        <span className="custom-control-description">Нет</span>
                      </label>
                    </div>

                </div>
            </form>
            { this.props.question.requestComment  ? (
              <div className="form-group">
                <label>Обязательный комментарий</label>
                <textarea value={this.props.comment} onChange={e => this.props.onChangeComment(e.target.value, this.props.question.guid)} maxLength={this.props.question.length} placeholder={this.props.question.commentExplanation} className="form-control"></textarea>
              </div>

            ) : (
              <strong></strong>
            )}
          </div>

        )
    }
}
