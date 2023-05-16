import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <h4>
        <Link to="/">Return Home</Link>
      </h4>
    </div>
  );
}

export default NotFound;
