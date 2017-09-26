import React from 'react';

export default class CommentComponent extends React.Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label>
                        {this.props.question.code}&nbsp;
                        {this.props.question.title}
                    </label>
                    <textarea value={this.props.comment} onChange={e => this.props.onChangeComment(e.target.value, this.props.question.guid)} placeholder={this.props.question.commentExplanation} className="form-control" rows="2" required></textarea>
                </div>
            </form>
        )
    }
}
