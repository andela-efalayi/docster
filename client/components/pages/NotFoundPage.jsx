import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container center">
    <div className="not-found">
      <h1 >404</h1>
      <h5>Page Not Found.</h5>
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

export default NotFoundPage;
