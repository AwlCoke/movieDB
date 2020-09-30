import React from 'react';
import { ServiceContextConsumer } from '../context';

const withService = (mapMethodsToProps) => (Wrapped) => {
  return (props) => {
    return (
      <ServiceContextConsumer>
        {(service) => {
          const serviceProps = mapMethodsToProps(service);

          return <Wrapped {...props} {...serviceProps} />;
        }}
      </ServiceContextConsumer>
    );
  };
};

export default withService;
