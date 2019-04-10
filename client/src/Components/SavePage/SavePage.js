import React from "react";
import "./SavePage.css";

const API_URL = process.env.REACT_APP_API_URL;

const SavePage = props => {
  async function handleSubmit(event) {
    event.preventDefault();

    const handle = event.target.handle.value.toLowerCase();
    const token = localStorage.getItem("token");

    if (token && handle) {
      const options = {
        method: "post",
        body: JSON.stringify({ handle }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      await fetch(`${API_URL}/api/user/save-page`, options);

      // TODO: Add error handling
      props.getUser();

      // clear form element after hitting submit
      document.getElementById("Form__input").value = "";
    } else {
      console.error("Missing an id and/or handle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="SavePage">
      <h2 style={{ color: "#368F8B", paddingBottom: "5px" }}>
        Save a new page:
      </h2>
      <p>Enter the @handle of the Instagram account</p>
      <div id="SavePage__Form">
        <input id="Form__input" type="text" name="handle" />
        <input type="submit" value="SAVE" /> <br />
      </div>
    </form>
  );
};

export default SavePage;
