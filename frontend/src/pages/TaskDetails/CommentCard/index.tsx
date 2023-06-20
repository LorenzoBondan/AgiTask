
import { Comment } from 'types';
import './styles.css';
import { convertDateTime } from 'helpers';

type Props = {
    comment: Comment;
}

const CommentCard = ({comment} : Props) => {
    return(
        <div className='comment-card-container'>
            <div className='comment-card-top-container'>
                <div className='comment-card-image'>
                    <img src={comment.author.imgUrl} alt="" /> 
                </div>
                <div className='comment-card-author'>
                    <div className='comment-card-author-content'>
                        <h6>{comment.author.name}</h6>
                        <div className='comment-card-author-bottom'>
                            <p>{convertDateTime(comment.dateTime)}</p>
                        </div>
                    </div>
                    <div className='comment-card-buttons'>

                    </div>
                </div>
            </div>
            <div className='comment-card-content'>
                <p>{comment.text}</p>
            </div>
        </div>
    );
}

export default CommentCard;