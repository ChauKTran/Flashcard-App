import React from "react";
import { Link } from "react-router-dom";

function Form({ front, back, setFront, setBack, handleSubmit, handleCancel }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            placeholder="Front side of card"
            value={front}
            onChange={(event) => setFront(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            placeholder="Back side of card"
            value={back}
            onChange={(event) => setBack(event.target.value)}
            required
          />
        </div>

        <button className="btn btn-secondary mr-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
