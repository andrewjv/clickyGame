import './App.css';
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Header from './components/Header';
import Card from './components/cards/Card';
import Wrapper from './components/Wrapper/Wrapper'
import characters from './characters.json'


let score = 0;
let topScore = 0;
let clickMessage = "Click an image to begin!";

class App extends Component {
  // setting this.state.characters to characters json array
  state = {
    characters,
    topScore,
    score,
    clickMessage: 'Click game to begin'
  };

  clickCard = id => {
    // copy the characters array state
    const characters = this.state.characters
    // filter this.state.characters for the clicked card
    const chosenCharacters = characters.filter(card => card.id === id);

    // if the character has been picked, the game ends
    if (chosenCharacters[0].clicked) {
      score = 0;
      clickMessage = 'Sorry, you clicked on the same image twice'

      for (let i = 0; i < characters.length; i++) {
        characters[i].clicked = false;
      }
      this.setState({ clickMessage });
      this.setState({ score });
      this.setState({ characters });
    }
    // if the card has been clicked once
    else if (score < 11) {
      // set the clicked card value to true
      chosenCharacters[0].clicked = true;
      score++;
      clickMessage = 'You guess correctly'

      // check topScore and update if score is higher
      if (score > topScore) {
        topScore = score;
        this.setState({ topScore });
      }
      // Shuffle the characters array to render in a random order
      characters.sort(() => (0.5 - Math.random()));

      this.setState({ characters });
      this.setState({ score });
      this.setState({ clickMessage });
    }
    else {
      chosenCharacters[0].clicked = true;
      // Restart the score
      score = 0;
      clickMessage = "You defeated them all. Ready for to play again?";
      topScore = 12;
      this.setState({ topScore });

      for(let i = 0; i < characters.length; i++) {
        characters[i].clicked = false;
      }

      characters.sort(() => (0.5 - Math.random()));
      this.setState({ characters });
      this.setState({ score });
      this.setState({ clickMessage });
    }
  }

  render() {
    return (
      <div>
        <Navbar score={this.state.score} topScore={this.state.topScore} clickMessage={this.state.clickMessage} />
        <Header />
        <Wrapper >
          {this.state.characters.map(card => (
            <Card
              clickCard={this.clickCard}
              id={card.id}
              key={card.id}
              image={card.image} />
          ))}
        </Wrapper>

      </div>
    )
  }
}

export default App;
