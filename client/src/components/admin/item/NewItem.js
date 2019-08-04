import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import AdminSidebar from '../sidebar/Sidebar';
import ErrorMessage from '../../validations/ErrorMessage';
import { resetStatus, addItem } from '../../../actions/itemActions';
import { fetchAllCategory } from '../../../actions/categoryActions';

const nameRequired = 'Name required',
  descriptionRequired = 'Description required',
  categoryRequired = 'Category required';

class NewCategory extends Component {
  constructor(props) {
    super(props)
    this.props.resetStatus();
    this.state = {
      validated: false,
      formData: {
        name: '',
        description: '',
        category: '',
        price: '',
      }
    }
  }

  componentDidMount() {
    this.props.fetchAllCategory();
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
      this.props.addItem(data);
    } else {
      e.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    const { 
      addingItem,
      message,
      status,
    } = this.props.items;

    return (
      <div>
        <AdminSidebar />
        <div className="main">
          <h3><FormattedMessage id="add_new_category" /></h3>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="name"
                name="name"
                onChange={this.handleChange}
                required
              />
              <ErrorMessage message={nameRequired} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Description"
                name="description"
                onChange={this.handleChange}
                required
              />
              <ErrorMessage message={descriptionRequired} />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label><FormattedMessage id="price" /></Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                onChange={this.handleChange}
                required
              />
              <ErrorMessage message={nameRequired} />
            </Form.Group>

            {
              this.props.categories && 
                <Form.Group controlId="category">
                  <Form.Label><FormattedMessage id="category" /></Form.Label>
                  <Form.Control 
                    name="category" 
                    as="select" 
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {
                      this.props.categories.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))
                    }
                  </Form.Control>
                  <ErrorMessage message={categoryRequired} />
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
                addingItem ?
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

const mapStateToProps = ({ items, category: { categories } }) => ({ items, categories })

const mapDispatchToProps = {
  resetStatus,
  addItem,
  fetchAllCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);

