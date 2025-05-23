import React from 'react';
import RedBox from '@rsmax/redbox-react';

interface Props {
  error: Error;
}

const ErrorScreen: React.FC<Props> = ({ error }) => <RedBox error={error} />;

export default ErrorScreen;
