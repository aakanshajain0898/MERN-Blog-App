import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { postData } from '../../../utility/utility';
import LinkItem from '../../LinkItem/LinkItem';
import Button from '../../Button/Button';
import M from 'materialize-css';
import './Modal.css';

const Modal = forwardRef(({ userId, background, foreground }, searchModal) => {
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = async (query) => {
    try {
      setSearch(query);
      const results = await postData(
        '/search-users',
        { query },
        { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      );
      setUserDetails(results.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      id='modal'
      className='modal'
      ref={searchModal}
      style={{ color: foreground, background }}
    >
      <div className='modal-content input-field'>
        <input
          type='text'
          placeholder='Search Users'
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
          style={{ color: foreground }}
        />
        <ul className='collection'>
          {userDetails.map((item) => (
            <LinkItem
              link={item._id !== userId ? '/profile/' + item._id : '/profile'}
              key={item._id}
              onClick={() => {
                M.Modal.getInstance(searchModal.current).close();
                setSearch('');
              }}
            >
              <li
                className='collection-item'
                style={{ background, color: foreground }}
              >
                {item.email}
              </li>
            </LinkItem>
          ))}
        </ul>
      </div>
      <div className='modal-footer' style={{ background }}>
        <Button label='close' type='modal' clk={() => setSearch('')} />
      </div>
    </div>
  );
});

Modal.prototype = {
  useId: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  foreground: PropTypes.string.isRequired,
};

export default Modal;
