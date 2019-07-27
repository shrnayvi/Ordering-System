import { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import routes from '../../constants/routes';

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
    this.props.history.push(routes.LOGIN);
  }

  render() {
    return '';
  }
}

const mapDispatchToProps = { logoutUser };
export default connect(null, mapDispatchToProps)(Logout);