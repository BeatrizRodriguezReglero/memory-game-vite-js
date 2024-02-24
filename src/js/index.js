import { gameBoardElement, playAgainButtonElement } from './dom';
import { flipCards, playAgain } from './memory-functions';

gameBoardElement.addEventListener('click', flipCards);

playAgainButtonElement.addEventListener('click', playAgain);
