import React from 'react';
/** @jsxImportSource @emotion/react */
import { withRouter, Route, Switch } from 'react-router-dom';
import ContactOptionSelector from './ContactOptionSelector';
import Email from './Email';

const Contact = ({ match }) => {
  return (
    <div>
      {/*<ContactOptionSelector />*/}

      <Switch>
        <Route exact path={`${match.path}/email`} component={Email} />

        <Route component={() => <ContactOptionSelector />} />
      </Switch>
    </div>
  );
};

export default withRouter(Contact);
