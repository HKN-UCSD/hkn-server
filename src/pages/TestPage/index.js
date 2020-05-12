import React from 'react';
import Links from './Links';

class TestPage extends React.Component {

  render() {
    return (
      <div>
        <Links
          rsvp="https://www.google.com/"
          sign_in="https://www.bing.com/"
          canva="https://www.canva.com/"
          facebook="https://www.facebook.com/" />
      </div>
    )
  };
};

export default TestPage;