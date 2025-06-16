import React from 'react';
import PullToRefresh from 'rmc-pull-to-refresh';
import LoadingIcon from './LoadingIcon';

const RsmaxPullToRefresh: React.FC<any> = props => {
  return (
    <PullToRefresh
      {...props}
      getScrollContainer={() => {
        document.body;
      }}
      indicator={{
        activate: <LoadingIcon />,
        deactivate: <LoadingIcon />,
        release: <LoadingIcon animate={true} />,
        finish: <LoadingIcon />,
      }}
    />
  );
};

export default RsmaxPullToRefresh;
