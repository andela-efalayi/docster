import React from 'react';
import PropTypes from 'prop-types';
import getDate from '../../utils/GetDate';
import EditRole from '../common/EditRole.jsx';

/* 
  Roles Table
 */
const RolesTable = ({ roles }) => {
  return(
    <table className="u-full-width">
      <thead>
        <tr>
          <th>ID</th>
          <th>Role Type</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          roles.map(role => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.roleType}</td>
              <td><EditRole role={role} /></td>
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