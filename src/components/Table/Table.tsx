// * Base
import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setFilter, resetFilters } from '../../features/usersSlice';
import { RootState, AppDispatch } from '../../store';

// * Components
import Input from '../Input/Input';
import Loading from '../Loading/Loading';
import Button from '../Button/Button';

// * Types
import { EButton, EDesign } from '../../types/button.types';

const Table: React.FC = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, filters, status, error, users } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="wrapper">
        <p className="mt-2 text-base font-base mb-4">{error}</p>
        <Button
          text="Retry"
          type={EButton.BUTTON}
          design={EDesign.RETRY}
          onClick={() => dispatch(fetchUsers())}
        />
      </div>
    );
  }

  if (!users.length) {
    return <p className="mt-2 text-base font-base">The list is empty</p>;
  }

  if (!filteredUsers.length) {
    return (
      <div className="wrapper">
        <p className="mt-2 mb-4 text-base font-base">
          No users match your search
        </p>
        <Button
          text="Back to full list"
          type={EButton.BUTTON}
          design={EDesign.RETRY}
          onClick={handleResetFilters}
        />
      </div>
    );
  }

  return (
    <div className="wrapper font-base min-h-screen">
      <h1 className="text-2xl text-center">
        <b>List of users</b>
      </h1>
      <table className="min-w-full bg-white border border-solid border-violet-400 mt-5">
        <thead>
          <tr>
            <th className="tableHeader">
              <span>Name</span>
              <Input
                type="text"
                className="input"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </th>
            <th className="tableHeader">
              <span>Username</span>
              <Input
                type="text"
                className="input"
                placeholder="Search by username"
                value={filters.username}
                onChange={(e) => handleFilterChange('username', e.target.value)}
              />
            </th>
            <th className="tableHeader">
              <span>Email</span>
              <Input
                type="text"
                className="input"
                placeholder="Search by email"
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </th>
            <th className="tableHeader">
              <span>Phone</span>
              <Input
                type="text"
                className="input"
                placeholder="Search by phone"
                value={filters.phone}
                onChange={(e) => handleFilterChange('phone', e.target.value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="tableData">{user.name}</td>
              <td className="tableData">{user.username}</td>
              <td className="tableData">{user.email}</td>
              <td className="tableData">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
