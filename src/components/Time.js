// importing the javascript-time-ago module
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'  //This is because we want our display in english format


const Time = (props)=>{
    TimeAgo.addLocale(en);
    // Create a new instance
    const timeAgo = new TimeAgo("en-US");
    const inSeconds = new Date(props.time).getTime();
    const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
   
    return(
      minutesAgo
    )
}

export default Time;