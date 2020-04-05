import React, { Fragment } from 'react';
import Search from './Search';
import Filter from './Filter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Filters = ({ userType }) => {
  const filters = ["All Tickets", userType, "Unassigned", "Open", "Pending", "Closed"];

  return (
    <Fragment>
      <nav id="sub-menu"  className="transparent">
        <div className="col s7 nav-wrapper">
          <ul className="ticket-details nav-wrapper">
            {filters.map(filter => (
              <Filter key={filter} filter={filter}/>
            ))}         
          </ul>
        </div>
        <Search />
      </nav>
    </Fragment>
  )
}

Filters.propTypes = {
  userType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  userType: state.auth.user.userType
});

export default connect(mapStateToProps, null)(Filters);
