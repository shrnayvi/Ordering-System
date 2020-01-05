import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { getProfile, updateProfile, handleProfileInput } from '../../actions/profile';
import Button from '../Button';
import LabelInput from '../LabelInput';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfile(this.props.user._id);
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.props.handleProfileInput(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    let _id = this.props.user._id;
    this.props.updateProfile(_id, this.props.profile.info );
  }

  render() {
    const { isEditingProfile } = this.props.profile;
    const { 
      email,
      name, 
      phone,
     } = this.props.profile.info;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <LabelInput 
            name="email"
            type="email"
            handleChange={this.handleChange}
            defaultValue={email}
            label="enter_email"
            readOnly
          />

          <LabelInput 
            name="name"
            type="text"
            handleChange={this.handleChange}
            defaultValue={name}
            label="name"
          />

          <LabelInput 
            name="phone"
            type="text"
            handleChange={this.handleChange}
            defaultValue={phone}
            label="phone"
          />

          <Button label="Submit" type="submit" className="btn btn-primary" isLoading={isEditingProfile} />

          <ToastContainer />

        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth, profile }) => ({ user: auth.user, profile }); 
const mapDispatchToProps = {
  getProfile, 
  updateProfile,
  handleProfileInput,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);