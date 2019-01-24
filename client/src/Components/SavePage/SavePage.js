import React from 'react';
import './SavePage.css';

const SavePage = props => {
  async function handleSubmit(event) {
    event.preventDefault();

    const handle = event.target.handle.value;
    const token = localStorage.getItem('token');

    if (token && handle) {
      const url = `${process.env.REACT_APP_API_URL}/api/user/save-page`;
      const body = { handle };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await fetch(url, options);

      // TODO: Add error handling
      props.getUser();

      // clear form element after hitting submit
      document.getElementById('Form__input').value = '';
    } else {
      console.error('Missing an id and/or handle');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="SavePage">
      <h3 style={{ color: '#368F8B', paddingBottom: '5px' }}>
        Save a new page:
      </h3>
      <div id="SavePage__Form">
        <input id="Form__input" type="text" name="handle" />
        <input type="submit" value="SAVE" /> <br />
      </div>
    </form>
  );
};

export default SavePage;
