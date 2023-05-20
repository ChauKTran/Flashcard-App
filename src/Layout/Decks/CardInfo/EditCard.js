import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../../utils/api";
import Form from "./Form";

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
      <Form
        front={front}
        back={back}
        setFront={setFront}
        setBack={setBack}
        submitHandler={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default EditCard;
