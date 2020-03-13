import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Tickets from '../tickets/Tickets';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
      <Tickets />
    </div>
  )
}

export default connect(null, { loadUser })(Home);