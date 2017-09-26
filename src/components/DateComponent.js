import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';


export default class DateComponent extends React.Component{

    handleChange(date) {
        this.props.onChange(date, this.props.question.guid);
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
                    <DatePicker
                        className="form-control"
                        selected={this.props.value}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
            </form>
            { this.props.question.requestComment ? (
              <div className="form-group">
                <label>Обязательный комментарий</label>
                <textarea value={this.props.comment} onChange={e => this.props.onChangeComment(e.target.value, this.props.question.guid)} placeholder={this.props.question.commentExplanation} className="form-control"></textarea>
              </div>

            ) : (
              <strong></strong>
            )}
          </div>

        )
    }
}
