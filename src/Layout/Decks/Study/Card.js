import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

//Set characteristic of an individual card
function Card({ deck }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const { cards = [] } = deck;

  //State of the card to check if the card is flipped
  const [flip, setFlip] = useState(true);

  const [nextCard, setNextCard] = useState(0);

  //Allows to flip back and forth within a card
  const flipHandler = () => setFlip(!flip);

  const nextHandler = () => {
    setFlip(!flip);
    if (nextCard < cards.length - 1) {
      setNextCard(nextCard + 1);
    } else {
      if (
        window.confirm(
          "Restart cards? \n Click 'cancel' to return to the home page."
        )
      ) {
        setNextCard(0);
      } else {
        history.push("/");
      }
    }
  };
  //Map out each card within a deck with its own individual index
  const card = cards.map((card, index) => {
    return (
      <div key={card.index}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {index + 1} of {cards.length}
            </h5>
            <p className="card-text">{flip ? card.front : card.back}</p>
            <button
              onClick={flipHandler}
              type="button"
              className="btn btn-secondary mr-4"
            >
              Flip
            </button>
            {flip ? null : (
              <button className="btn btn-primary" onClick={nextHandler}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  });

  //If the length of deck is less than 3, reject "study" and return not enough cards message.
  if (cards.length < 3) {
    return (
      <div>
        <h2>Not Enough Cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <button
          onClick={() => history.push(`${url.replace("/study", "")}/cards/new`)}
          className="btn btn-primary mr-5"
        >
          Add Cards
        </button>
      </div>
    );
  }

  //Else return the card function
  return <div>{card[nextCard]}</div>;
}

export default Card;
