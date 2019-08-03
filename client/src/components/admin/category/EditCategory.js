import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import AdminSidebar from '../sidebar/Sidebar';
import ErrorMessage from '../../validations/ErrorMessage';
import { updateCategory, getBySlug } from '../../../actions/categoryActions';

const nameRequired = '',
  descriptionRequired = '';

class EditCategory extends Component {
  constructor(props) {
    super(props)
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
    this.setState({ 
      formData: { 
        ...this.state.formData,
        [name]: value 
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      let data =  this.state.formData;
      this.props.addCategory(data);
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
      isUpdating 
    } = this.props.category;
    console.log(description)
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

            <Button variant="primary" type="submit">
              {
                isUpdating ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <FormattedMessage id="add_category" />
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
  updateCategory,
  getBySlug,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);