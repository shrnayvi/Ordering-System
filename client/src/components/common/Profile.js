import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Button from '../Button';
import LabelInput from '../LabelInput';

import { commonValidation } from '../../helpers/validation';
import { getProfile, updateProfile, handleProfileInput } from '../../actions/profile';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      profile: {
        email: '',
        name: '',
        phone: '',
      },
      error: {
        name: '',
        phone: '',
      }
    }
  }

  componentDidMount() {
    this.props.getProfile(this.props.user._id);
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.profile.hasFetched && this.props.profile.hasFetched) {
      this.setState({ profile: this.props.profile.info });
    }
  }

  handleBlur = e => {
    if(e.target.value) {
      this.setState({ error: { ...this.state.error, [e.target.name]: '' } });
    }
  }

  checkValidation = () => {
    console.log(this.state.profile, 'state')
    const { name, phone } = this.state.profile;
    const valObj = commonValidation({ inputs: { name, phone } });
    this.setState({ error: { ...this.state.error, ...valObj.errors} });
    return valObj.isFormValid;
  }


  handleChange(e) {
    let { name, value } = e.target;
    this.setState({ profile: { ...this.state.profile, [name]: value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    let _id = this.props.user._id;
    if(this.checkValidation()) {
      this.props.updateProfile(_id, this.state.profile);
    }
  }

  render() {
    const { isEditingProfile } = this.props.profile;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <LabelInput 
            name="email"
            type="email"
            handleChange={this.handleChange}
            defaultValue={this.state.profile.email}
            label="enter_email"
            readOnly
          />

          <LabelInput 
            name="name"
            type="text"
            handleChange={this.handleChange}
            defaultValue={this.state.profile.name}
            label="name"
            needValidation={true}
            errorMessage={this.state.error.name}
            onBlur={this.handleBlur}
          />

          <LabelInput 
            name="phone"
            type="text"
            handleChange={this.handleChange}
            defaultValue={this.state.profile.phone}
            label="phone"
            needValidation={true}
            errorMessage={this.state.error.phone}
            onBlur={this.handleBlur}
          />

          <Button label="submit" type="submit" className="btn btn-primary" isLoading={isEditingProfile} />

          <ToastContainer autoClose={2000} />

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