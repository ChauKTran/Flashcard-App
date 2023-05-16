import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../../utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeckAndCard() {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      setDeck(loadedDeck);

      const loadedCard = await readCard(cardId, abortController.signal);
      setCard(loadedCard);
    }

    loadDeckAndCard();

    return () => abortController.abort();
  }, [deckId, cardId]);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    setFront(card.front || "");
    setBack(card.back || "");
  }, [card]);

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    const newCard = {
      ...card,
      front,
      back,
    };

    updateCard(newCard, abortController.signal)
      .then(() => history.push(`/decks/${deckId}`))
      .catch((error) => {
        console.log(error);
        abortController.abort();
      });
  }

  function handleCancel() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>

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

export default EditCard;
