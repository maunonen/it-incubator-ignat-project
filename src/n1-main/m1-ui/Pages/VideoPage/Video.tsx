import React from 'react';

import VideoRoutes from './VideoRoutes';
import VideoHeader from "./VideoHeader";


function App() {

      return (
          <div >
              <h3 style={{display: "flex", justifyContent: "flex-end", width: 500}}>video collection</h3>
              <VideoHeader/>
              <VideoRoutes/>
          </div>
      );
}

export default App;
