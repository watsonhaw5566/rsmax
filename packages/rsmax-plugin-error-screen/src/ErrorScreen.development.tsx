import RedBox from '@rsmax/redbox-react';
import React from 'react';

interface Props {
  error: Error;
}

const ErrorScreen: React.FC<Props> = ({ error }) => <RedBox error={error} />;

export default ErrorScreen;
