var showPong = function() {
	// var birthYear = prompt('Please enter your year of birth.');
	// var age = 2014 - birthYear;
	// if (age >= 6) {
	// 	playerIsOldEnough = true;
	// } else {
	// 	playerIsOldEnough = false;
	// }
	// var text = "Your age is " + age;
	// if (playerIsOldEnough) alert(text + ". You are old enough to play!");
	// else alert(text + ". You are not old enough to play. Sorry!");
	var canvas = document.getElementById('game');
	canvas.style.background = 'black';
	canvas.height = 500;
	canvas.width = 900;
	var height = canvas.height;
	var width = canvas.width;
	var ctx = canvas.getContext('2d');
	ctx.font = '25px Sans';
	var scores = [0];
	var score = 0;
	var animLoop;
	var ball = {
		x: 1,
		y: 1,
		width: 10,
		height: 10,
		radius: 10,
		vx: 5,
		vy: 5,
		update: function() {
			this.x += this.vx;
			this.y += this.vy;
		},
		draw: function() {
			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fill();
		}
	};
	var paddle = {
		x: width / 2 - (width / 5)/2,
		y: height - 10,
		vx: 0,
		height: 10,
		width: width / 5,
		update: function() {
			this.x += this.vx;
		},
		draw: function() {
			ctx.fillStyle = 'red';
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fill();
		}
	};
	var getHighScore = function() {
		var highScore = 0;
		for (var i = 0; i < scores.length; i += 1) {
			if (i > 0 && scores[i] > scores[i - 1]) {
				highScore = scores[i];
			}
		}
		return highScore;
	}
	var beginScreen = function() {
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = 'white';
		ctx.fillText("Click to Play", canvas.width / 2.5, canvas.height / 2);
	};
	var endScreen = function() {
		clearInterval(animLoop);
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = 'white';
		scores.push(score);
		ctx.fillText("Game Over! Current high score: " + getHighScore(), canvas.width / 4, canvas.height / 2);
	};
	var startPlaying = function() {
		ball.x = 1;
		ball.y = 1;
		paddle.y = height - 10;
		paddle.x = width / 2 - (width / 5)/2;
		score = 0;
		animLoop = setInterval(updateAndDraw, 1000 / 60);
	};
	var handleCollisions = function() {
		var collides = function(a, b) {
			return a.x < b.x + b.width &&
				a.x + a.width > b.x &&
				a.y < b.y + b.height &&
				a.y + a.height > b.y;
		}
		if (collides(ball, paddle)) {
			score += 1;
		}
		if (collides(ball, paddle) || ball.y <= 0) {
			ball.vy = -ball.vy;
		}
		if (ball.x <= 0 || ball.x >= width) {
			ball.vx = -ball.vx;
		}
		if (ball.y >= height) {
			endScreen();
		}
	};
	var updateAndDraw = function() {
		ball.update();
		paddle.update();
		ctx.clearRect(0, 0, width, height);
		ball.draw();
		paddle.draw();
		ctx.fillStyle = 'white';
		ctx.fillText("Score: " + score, 10, 25);
		handleCollisions();
	};
	document.addEventListener('keydown', function(e) {
		var key = e.keyCode;
		if (key === 37) paddle.vx = -5;
		else if (key === 39) paddle.vx = 5;
	});
	document.addEventListener('keyup', function(e) {
		var key = e.keyCode;
		if (key === 37 || key === 39) paddle.vx = 0;
	});
	canvas.addEventListener('click', function(e) {
		// if (playerIsOldEnough) startPlaying();
		// else alert("Sorry! You aren't old enough to play!");
		startPlaying();
	});
	beginScreen();
};
showPong();