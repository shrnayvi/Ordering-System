import { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import routes from '../constants/routes';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.logoutUser();
    this.props.history.push(routes.LOGIN);
  }

  render() {
    return '';
  }
}

const mapDispatchToProps = { logoutUser };
export default connect(null, mapDispatchToProps)(Logout);