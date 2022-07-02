const gameSummary = {
	numbers: 0,
	wins: 0,
	losses: 0,
	draws: 0,
};

const game = {
	playerHand: "",
	aiHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

function handSelection() {
	game.playerHand = this.dataset.option;
	hands.forEach((hand) => (hand.style.boxShadow = ""));
	this.style.boxShadow = "0 0 0 4px red";
}

const aiChoice = () => {
	return hands[Math.floor(Math.random() * 3)].dataset.option;
};

const checkResult = (player, ai) => {
	if (player === ai) {
		return "draw";
	} else if (
		(player === "papier" && ai === "kamień") ||
		(player === "kamień" && ai === "nożyczki") ||
		(player === "nożyczki" && ai === "papier")
	) {
		return "win";
	} else {
		return "loss";
	}
};

const publishResult = (player, ai, result) => {
	document.querySelector('[data-summary="your-choice"]').textContent = player;
	document.querySelector('[data-summary="ai-choice"]').textContent = ai;
	document.querySelector('[data-summary="who-win"]').textContent = result;
	document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;
	const span = document.querySelector('[data-summary="who-win"]');

	if (result === "win") {
		document.querySelector("p.wins span").textContent = ++gameSummary.wins;
		span.textContent = "Wygrałeś";
		span.style.color = "green";
	} else if (result === "loss") {
		document.querySelector("p.losses span").textContent = ++gameSummary.losses;
		span.textContent = "Przegrałeś";
		span.style.color = "red";
	} else {
		document.querySelector("p.draws span").textContent = ++gameSummary.draws;
		span.textContent = "Remis";
		span.style.color = "orange";
	}
	return {};
};

const resetGame = () => {
	document.querySelector(
		`[data-option =  "${game.playerHand}"] `
	).style.boxShadow = "";
	game.playerHand = "";
};

const startGame = () => {
	if (!game.playerHand) {
		return alert("wybierz dłoń");
	}

	game.aiHand = aiChoice();
	const gameResult = checkResult(game.playerHand, game.aiHand);
	publishResult(game.playerHand, game.aiHand, gameResult);
	resetGame();
};

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
