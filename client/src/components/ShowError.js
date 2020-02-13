import React from 'react';

import ErrorMessage from './ErrorMessage';

export default ({ message }) => (message ? <ErrorMessage message={message} /> : '') 