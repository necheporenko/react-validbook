import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './index.scss';

class PeopleMenu extends Component {
  render() {
    const { first_name, last_name } = this.props.userInfo;
    const link = `/${first_name.toLowerCase()}.${last_name.toLowerCase()}`;

    return (
      <div className="sidebar people-nav">
        <ul>
          <Link onlyActiveOnIndex={true} to={link + '/people'} activeClassName="active">
            <li>Following</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={link + '/people/followers'} activeClassName="active">
            <li>Followers</li>
          </Link>
          <Link onlyActiveOnIndex={true} to={link + '/people/suggested'} activeClassName="active">
            <li>Suggested</li>
          </Link>
        </ul>
      </div>
    );
  }
}

PeopleMenu.propTypes = {
  userInfo: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
  };
}

export default connect(mapStateToProps, null)(PeopleMenu);