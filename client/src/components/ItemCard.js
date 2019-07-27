import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import routes from '../constants/routes';

export default ({ title, description, price, slug }) => {
  return (
    <Card className="order-item-cards" >
      <Card.Img variant="top" src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <FormattedMessage id="price" />: {price}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Link to={`${routes.ITEM}/${slug}`}>
          <FormattedMessage id="view_details" />
        </Link>
      </Card.Body>
    </Card>
  );
}