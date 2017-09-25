import React from 'react';

export default class CommentComponent extends React.Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label>
                        {this.props.question.code}
                        {this.props.question.title}
                    </label>
                    <textarea className="form-control" rows="2" required></textarea>
                </div>
            </form>
        )
    }
}
