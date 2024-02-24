import { allImage, totalCards } from './constants';
import { gameBoardElement, resultsBoardElement } from './dom';
let clickedCard;
let firstClickedCard = null;
let secondClickedCard = null;

const getRandomNumber = (max = 7) => Math.floor(Math.random() * max + 1);

const startGameShowCards = allCards => {
	allCards.forEach(card => card.classList.remove('hide'));
	const timeoutId = setTimeout(() => {
		allCards.forEach(card => card.classList.add('flip', 'flipped'));
		setTimeout(() => {
			allCards.forEach(card => card.children[0].classList.add('hide'));
		}, 100);

		clearInterval(timeoutId);
	}, 2000);
};

const flipCards = event => {
	const target = event.target;
	clickedCard = event.target.closest('.card');
	const image = clickedCard.querySelector('img');
	clickedCard.classList.add('flip');
	clickedCard.classList.add('flipped');

	setTimeout(() => {
		image.classList.remove('hide');
	}, 200);
	if (!firstClickedCard && !secondClickedCard) {
		firstClickedCard = clickedCard;
		console.log(target);
		console.log(clickedCard);
	}
	if (firstClickedCard && clickedCard !== firstClickedCard) {
		secondClickedCard = clickedCard;
		isMatch(firstClickedCard, secondClickedCard);
	}
};

const createCard = imageNumber => {
	//   console.log(imageNumber);
	const newCard = document.createElement('div');
	newCard.classList.add('card');

	newCard.dataset.id = imageNumber;

	const newImage = document.createElement('img');
	newImage.src = `../assets/images/${imageNumber}.jpg`;

	newCard.append(newImage);

	return newCard;
};

const paintCards = allCards => {
	const fragment = document.createDocumentFragment();
	allCards.forEach(cardNumber => {
		const newCard = createCard(cardNumber);

		fragment.append(newCard);
	});

	gameBoardElement.append(fragment);

	const allCardsElements = document.querySelectorAll('.card');

	const timeoutId = setTimeout(() => {
		startGameShowCards(allCardsElements);
		clearTimeout(timeoutId);
	}, 1000);
};

const generateCards = () => {
	const originalCards = [];
	for (let index = 1; index < totalCards / 2 + 1; index++) {
		originalCards.push(getRandomNumber());
	}

	const cardsFiltered = [...new Set(originalCards)];

	if (cardsFiltered.length !== originalCards.length) {
		generateCards();
		return;
	}
	const allCards = [...cardsFiltered, ...cardsFiltered];
	for (let i = allCards.length - 1; i > 0; i--) {
		const randomNumber = Math.floor(Math.random() * (i + 1));
		[allCards[i], allCards[randomNumber]] = [
			allCards[randomNumber],
			allCards[i]
		];
	}
	paintCards(allCards);
};

const isMatch = (firstElementSelected, secondElementSelected) => {
	console.dir(firstClickedCard);
	const firstImage = firstClickedCard.children[0];
	const secondImage = secondClickedCard.children[0];
	if (firstElementSelected.dataset.id === secondElementSelected.dataset.id) {
		firstImage.classList.add('correct');
		secondImage.classList.add('correct');
		allImage.push(firstImage);
		console.log(allImage);
	} else {
		firstImage.classList.add('incorrect');
		secondImage.classList.add('incorrect');
		setTimeout(() => {
			firstImage.classList.add('hide');
			secondImage.classList.add('hide');
			firstImage.classList.remove('incorrect');
			secondImage.classList.remove('incorrect');
		}, 1500);
	}

	firstClickedCard = null;
	secondClickedCard = null;
	allCorrect();
};

const allCorrect = () => {
	if (allImage.length === totalCards / 2) {
		console.log('has ganado');
		resultsBoardElement.classList.remove('hide');
		gameBoardElement.classList.add('hide');
	}
};
const playAgain = () => {
	resultsBoardElement.classList.add('hide');
	gameBoardElement.classList.remove('hide');
	gameBoardElement.textContent = '';

	generateCards();
};

generateCards();

export {
	firstClickedCard,
	secondClickedCard,
	getRandomNumber,
	startGameShowCards,
	flipCards,
	createCard,
	paintCards,
	generateCards,
	isMatch,
	allCorrect,
	playAgain
};
