import classes from './story.module.css';
import StoryItem from './storyItem';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const StoryArea = () => {
    return(
        <div className={classes.story_area + ' border border-1'}>
            <OwlCarousel className='owl-theme' autoWidth margin={1}  dots={false}>
                <div className='item'>
                    <StoryItem />
                </div>
                <div className='item'>
                    <StoryItem />
                </div>
                <div className='item'>
                    <StoryItem />
                </div>
                <div className='item'>
                    <StoryItem />
                </div>
                <div className='item'>
                    <StoryItem />
                </div>
                <div className='item'>
                    <StoryItem />
                </div>
                <div className='item'>
                    <StoryItem />
                </div>
            </OwlCarousel>
            
        </div>
    )
}

export default StoryArea;