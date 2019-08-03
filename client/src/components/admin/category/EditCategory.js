import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import AdminSidebar from '../sidebar/Sidebar';
import ErrorMessage from '../../validations/ErrorMessage';
import { resetStatus, updateCategory, getBySlug, handleInputChange } from '../../../actions/categoryActions';

const nameRequired = '',
  descriptionRequired = '';

class EditCategory extends Component {
  constructor(props) {
    super(props)
    this.props.resetStatus();
    this.state = {
      validated: false,
      formData: {
        name: '',
        description: '',
      }
    }
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.getBySlug(slug)
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.props.handleInputChange({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      const {
        _id, 
        name, 
        description,
      } = this.props.category.editData;

      this.props.updateCategory(_id, { name, description });
    } else {
      e.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;

    const { 
      editData: {
        name,
        description
      }, 
      isUpdating,
      status,
      message,
    } = this.props.category;
    return (
      <div>
        <AdminSidebar />
        <div className="main">
          <h3><FormattedMessage id="edit_category" /></h3>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label><FormattedMessage id="name" /></Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                name="name"
                onChange={this.handleChange}
                defaultValue={name}
                required
              />
              <ErrorMessage message={nameRequired} />
            </Form.Group>

            {
              typeof description !== 'undefined' &&
                <Form.Group controlId="description">
                  <Form.Label><FormattedMessage id="description" /></Form.Label>
                  <Form.Control
                    as="textarea"
                    // placeholder="Description"
                    name="description"
                    onChange={this.handleChange}
                    defaultValue={description}
                    required
                  />
                  <ErrorMessage message={descriptionRequired} />
                </Form.Group>
            }

            {
              message ?
                <Alert variant={status === 200 ? 'success' : 'danger'}>
                  <FormattedMessage id={message} />
                </Alert>
                : null
            }

            <Button variant="primary" type="submit">
              {
                isUpdating ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <FormattedMessage id="edit_category" />
              }
            </Button>
          </Form>

        </div>
      </div>
    )
  }

}

const mapStateToProps = ({ category }) => ({ category })

const mapDispatchToProps = {
  resetStatus,
  updateCategory,
  getBySlug,
  handleInputChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);