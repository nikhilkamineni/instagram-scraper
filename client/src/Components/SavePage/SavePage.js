import React from 'react';
import './SavePage.css';

const SavePage = props => {
  async function handleSubmit(event) {
    event.preventDefault();

    const id = props.id;
    const handle = event.target.handle.value;

    if (id && handle) {
      const url = `${process.env.REACT_APP_API_URL}/api/user/savePage`;
      const body = { id, handle };
      const options = {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };

      await fetch(url, options);

      // TODO: Add error handling
      props.getUserData();

      // clear form element after hitting submit
      document.getElementById('SavePageForm__Input').value = '';
    } else {
      console.error('Missing an id and/or handle');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="SavePageForm">
      <h3>Save a new page:</h3>
      <input id="SavePageForm__Input" type="text" name="handle" /><input type="submit" /> <br/>
    </form>
  );
};

export default SavePage;
