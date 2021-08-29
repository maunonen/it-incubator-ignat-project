import React from 'react'
import {Switch, Route} from 'react-router-dom'
import YoutubeVideo from '../VideoPage/YoutubeVideo'
import MyVideo from "./MyVideo";


export const PATH = {
    MY_VIDEO: '/video/myVideo',
    YOUTUBE_VIDEO: '/video/youtubeVideo',
}

const  FilesRoutes : React.FC = ()  => {


    return (
        <div>
            <Switch>
                <Route path={PATH.MY_VIDEO} exact render={() => <MyVideo/>}/>
                <Route path={PATH.YOUTUBE_VIDEO} exact render={() => <YoutubeVideo/>}/>

            </Switch>
        </div>
    )
}

export default FilesRoutes
