import React from 'react';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';


export default (type, message) => {

  switch(type) {
    case 'success':
      toast.success(<FormattedMessage id={message} />);
      break;
    case 'error':
      toast.error(<FormattedMessage id={message} />);
      break;
    case 'warning':
      toast.warning(<FormattedMessage id={message} />);
      break;
    case 'info':
    default:
      toast.info(<FormattedMessage id={message} />);
      break;
  }
}
