// Quand la fenetre se charge
window.addEventListener('load', () => {
	const timer = document.getElementById('timer');
	const score1 = document.getElementById('score1');
	const score2 = document.getElementById('score2');
	const btn = document.getElementById('btn');

	// On preset la vitesse de clic de l'ordi
	const computerSpeed = 3;

	// On prepare le lancement du jeu
	function startGame() {
		console.log("Game started !");

		// On prepare le Handler qui augmente le score du joueur
		const playerIncrease = () => {
			const newScore = parseInt(score2.innerText) + 1;
			score2.innerText = `${ newScore }`;
		};

		// On change le texte du bouton
		btn.innerText = "Click here ! Bro";

		// On démarre l'intervale de 1s pour le jeu (timer, etc)
		const intervalId = setInterval(() => {
			// On diminue le timer de 1s toutes les 1s
			const newTime = parseInt(timer.innerText) - 1;
			timer.innerText = `${ newTime }`;

			// on recup les score des deux joueurs
			const score1Value = parseInt(score1.innerText);
			const score2Value = parseInt(score2.innerText);

			// On compare (toutes les secondes) et on met en couleur
			score1.style.color = `${ score1Value >= score2Value ? 'green' : 'red' }`;
			score2.style.color = `${ score1Value < score2Value ? 'green' : 'red' }`;

			// Quand le timer arrive à 0
			if (newTime <= 0) {
				// On arrete les intervals en cours
				clearInterval(computerInterval);
				clearInterval(intervalId);
				// On déréférence le Handler du joueur
				btn.removeEventListener('click', playerIncrease);

				// Time out !
				console.log('Time out !!');

				// On désactive le bouton
				btn.disabled = true;
				// On change le texte
				btn.innerText = 'Ended !';

				// On ajoute le clic de reset
				btn.addEventListener('click', () => {
					score1.innerText = '0'; // On reset les score à 0
					score2.innerText = '0'; // On reset les score à 0
					timer.innerText = '30'; // On reset le timer à 30

					startGame(); // On relance le jeu
				}, { once: true }); // UNE SEUL FOIS

				// On attend 2 sec avant de permettre de relancer le jeu.
				setTimeout(() => {
					btn.disabled = false;
					btn.innerText = 'Retry it babe !';
				}, 2000);
			}

		}, 1000);

		// Chaque X secondes, le PC lance un 'clic'
		const computerInterval = setInterval(() => {
			// On recup le score en cours, +1
			const newScore = parseInt(score1.innerText) + 1;
			// On stocke le score
			score1.innerText = `${ newScore }`;
		}, 100 * computerSpeed); // Vitesse variable

		// On attache le handler du joueur, lorsqu'il clic, on l'execute
		btn.addEventListener('click', playerIncrease);

	}

	// Quand le clic initial est lancé :
	btn.addEventListener('click', () => {
		// On appel la fn StartGame();
		startGame();
	}, { once: true });

});
