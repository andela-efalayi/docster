import React from 'react';
import { Link } from 'react-router-dom';

/* 
  AccessDeniedPage
  This page is shown when a regular user tries to access an admin route
*/
const AccessDeniedPage = () => (
  <div className="container center">
    <div className="not-found">
      <h1>403</h1>
      <h5>Sorry, you cannot access this page.</h5>
      <span>
        <Link to={{
            pathname: "/my-documents"
          }}
        >Okay, I understand. Help me find my way back.
        </Link>
      </span>
    </div>
  </div>
);

export default AccessDeniedPage;
