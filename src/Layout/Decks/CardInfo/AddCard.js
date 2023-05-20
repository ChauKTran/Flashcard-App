import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../../utils/api";
import Form from "./Form";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = { front, back };
    await createCard(deckId, newCard);
    setFront("");
    setBack("");
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <Form
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        handleSubmit={handleSubmit}
        handleCancel={handleDone}
      />
    </div>
  );
}

export default AddCard;
