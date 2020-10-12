import React from 'react';
import { ErrorMessage } from '../models';
import '../styles/ErrorMessageBanner.scss';

interface ErrorMessageBannerProps {
  errorMessage: ErrorMessage;
  clearErrors: () => void;
}

const ErrorMessageBanner: React.FC<ErrorMessageBannerProps> = ({
  errorMessage,
  clearErrors,
}) => {
  return (
    <div className="error-message-banner">
      <p className="error-message-banner__text">{errorMessage.error}</p>
      <button onClick={clearErrors} className="error-message-banner__close">
        X
      </button>
    </div>
  );
};

export default ErrorMessageBanner;
