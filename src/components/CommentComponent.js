import React from 'react';

export default class CommentComponent extends React.Component{
    render(){
        return(
            <form>
                <div className="form-group">
                    <label>Обязательный комментарий</label>
                    <textarea className="form-control" rows="2" required></textarea>
                </div>
            </form>
        )
    }
}