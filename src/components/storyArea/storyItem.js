import classes from './story.module.css';

const StoryItem = () => {
    return(
        <div className={classes.story_area_item + ' m-2'} >
            <div className={classes.story_dp_area + ' rounded-circle overflow-hidden'}>
                <img src='./images/profilepic.jpg' alt='ProfilePic' className='w-100'/>
            </div>
            <div className={classes.story_username_area + ' text-truncate'}>aasdf</div>
        </div>
    )
}

export default StoryItem;