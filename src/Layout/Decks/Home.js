import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      const decksData = await listDecks(abortController.signal);
      setDecks(decksData);
    }

    fetchData();

    return () => abortController.abort();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(id);
      setDecks((decks) => decks.filter((deck) => deck.id !== id));
      history.push("/");
    }
  };

  return (
    <div>
      <div className="mb-3">
        <Link to="/decks/new">
          <button className="btn btn-secondary">Create Deck</button>
        </Link>
      </div>
      {decks.map((deck) => (
        <div key={deck.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {deck.cards.length} cards
            </h6>
            <p className="card-text">{deck.description}</p>
            <div>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary me-2">
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary me-2"
              >
                Study
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
