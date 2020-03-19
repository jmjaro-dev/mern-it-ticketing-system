import React from 'react';

const AddBtn = () => {
  return (
    <div className='fixed-action-btn'>
      <a href="#!" className="btn-floating btn-large blue darken-3 modal-trigger">
        <i className="fas fa-plus"></i>
      </a>
      <ul>
        <li>
          <a href="#!" className="btn-floating green modal-trigger"><i className="fas fa-file-invoice"></i> Create Ticket
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AddBtn;