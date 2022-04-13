import React from 'react';
import { Container} from 'semantic-ui-react';
import TopHalf from '../components/TopHalf';
import BottomHalf from '../components/BottomHalf';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='landingBG'>
        <TopHalf/>
        <BottomHalf/>
      </div>
    );
  }
}

export default Landing;
