import React from 'react';
import './Error.css';

const ErrorAlert = ({ error }) => (
  error
  ? (
    <div className="ErrorAlert alert alert-danger" role="alert">
      Ooops!!! {error.message}
    </div>
    )
  : null
);

export default ErrorAlert;