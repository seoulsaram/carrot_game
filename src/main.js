"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishBanner = new PopUp();

//field.addEventListener('click', (event) => onFieldClick(event));
//field.addEventListener("click", onFieldClick);

const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(9)
  .withBugCount(9)
  .build();
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay?";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WON";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
