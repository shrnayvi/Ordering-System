import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import AdminSidebar from '../sidebar/Sidebar';
import ErrorMessage from '../../validations/ErrorMessage';
import { resetStatus, updateItem, fetchBySlug, handleInputChange } from '../../../actions/itemActions';
import { fetchAllCategory } from '../../../actions/categoryActions';

const nameRequired = '',
  descriptionRequired = '';

class EditCategory extends Component {
  constructor(props) {
    super(props)
    this.props.resetStatus();
    this.state = {
      validated: false,
    }
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.fetchBySlug(slug)
    this.props.fetchAllCategory();
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
        price,
        category,
      } = this.props.items.editData;

      this.props.updateItem(_id, { name, description, price, category });
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
        description,
        price,
        category,
      }, 
      updatingItem,
      status,
      message,
    } = this.props.items;

    return (
      <div>
        <AdminSidebar />
        <div className="main">
          <h3><FormattedMessage id="edit_item" /></h3>
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

            <Form.Group controlId="price">
              <Form.Label><FormattedMessage id="price" /></Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                onChange={this.handleChange}
                defaultValue={price}
                required
              />
              <ErrorMessage message={nameRequired} />
            </Form.Group>

            {
              this.props.categories.length &&
                <Form.Group controlId="category">
                  <Form.Label><FormattedMessage id="category" /></Form.Label>
                  <Form.Control name="category" as="select" onChange={this.handleChange} defaultValue={category}>
                    {
                      this.props.categories.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))
                    }
                  </Form.Control>
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
                updatingItem ?
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <FormattedMessage id="edit_item" />
              }
            </Button>
          </Form>

        </div>
      </div>
    )
  }

}

const mapStateToProps = ({ items, category: { categories } }) => ({ items, categories})

const mapDispatchToProps = {
  resetStatus,
  updateItem,
  fetchBySlug,
  handleInputChange,
  fetchAllCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);