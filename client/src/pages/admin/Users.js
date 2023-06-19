import React from 'react'
import AdminMenu from '../../components/AdminMenu';

const Users = () => {
    return (
        <div className="grid grid-rows-6 gap-4">
          <div className="col-rows-1">
            <AdminMenu />
          </div>
          <div className="col-rows-5">
            <div className="p-4 ">Users</div>
          </div>
        </div>
      );
}

export default Users