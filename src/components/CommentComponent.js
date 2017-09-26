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
                    <textarea  placeholder={this.props.question.commentExplanation} className="form-control" rows="2" required></textarea>
                </div>
            </form>
        )
    }
}
