import React from 'react';
import PropTypes from 'prop-types';
import getDate from '../../utils/GetDate';

/**
 * Roles Table
 * @param {array} roles
 * @returns {object} react-component
*/
const RolesTable = ({ roles }) => {
  return(
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Serial No</th>
          <th>Role Type</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        {
          roles.map((role, index) => (
            <tr key={role.id}>
              <td>{index + 1}</td>
              <td>{role.roleType}</td>
              <td>{getDate(role.createdAt)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

RolesTable.propTypes = {
  roles: PropTypes.array.isRequired
}

export default RolesTable;