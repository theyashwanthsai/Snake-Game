const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let score = 0;
let direction = "right";
let food = getRandomFood();

function getRandomFood() {
  let x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  let y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
  return { x: x, y: y };
}

function drawSnake() {
  snake.forEach((part) => {
    context.fillStyle = "#008000";
    context.fillRect(part.x, part.y, 10, 10);
  });
}

function updateSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "right":
      head.x += 10;
      break;
    case "left":
      head.x -= 10;
      break;
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = getRandomFood();
  } else {
    snake.pop();
  }
}

function checkCollisions() {
  if (
    snake[0].x < 0 ||
    snake[0].x > canvas.width - 10 ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height - 10
  ) {
    clearInterval(gameLoop);
    alert(`Game Over! Your Score: ${score}`);
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
    clearInterval(gameLoop);
    alert(`Game Over! Your Score: ${score}`);
    }
    }
    }
    
    function drawFood() {
    context.fillStyle = "#ff0000";
    context.fillRect(food.x, food.y, 10, 10);
    }
    
    function drawScore() {
    document.getElementById("scoreboard").innerHTML = `Score: ${score}`;
    }
    
    function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    updateSnake();
    checkCollisions();
    }
    
    let gameLoop;
    
    document.getElementById("start-button").addEventListener("click", () => {
    gameLoop = setInterval(drawGame, 100);
    });
    
    document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
    case 37:
    direction = "left";
    break;
    case 38:
    direction = "up";
    break;
    case 39:
    direction = "right";
    break;
    case 40:
    direction = "down";
    break;
    }
    });
    
    
