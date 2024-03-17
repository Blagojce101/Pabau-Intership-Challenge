type Grid = string[][];

interface Position {
  x: number;
  y: number;
}

function findThePath(grid: Grid): { path: string; letters: string } {
  const path: string[] = [];
  const letters: string[] = [];
  let currentPosition: Position | null = findStartingPosition(grid);

  if (!currentPosition) {
    return { path: "Starting position not found", letters: "" };
  }

  let direction = "right";

  while (currentPosition) {
    const { x, y } = currentPosition;
    const currentChar = grid[x][y];

    path.push(currentChar);

    if (currentChar === "s") {
      break;
    }

    if (/[A-Z]/.test(currentChar)) {
      letters.push(currentChar);

      const nextDirection = getNextDirection(grid, currentPosition, direction);
      if (nextDirection) {
        direction = nextDirection;
      }
    } else if (currentChar === "+") {
      const nextDirection = getNextDirection(grid, currentPosition, direction);
      if (nextDirection) {
        direction = nextDirection;
      }
    }

    currentPosition = movingDirection(grid, currentPosition, direction);
  }

  return { path: path.join(""), letters: letters.join("") };
}

function findStartingPosition(grid: Grid): Position | null {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === ">") {
        return { x, y };
      }
    }
  }
  return null;
}

function isTheMoveValid(grid: Grid, x: number, y: number): boolean {
  return (
    x >= 0 &&
    x < grid.length &&
    y >= 0 &&
    y < grid[0].length &&
    grid[x][y] !== " "
  );
}

function movingDirection(
  grid: Grid,
  pos: Position,
  direction: string
): Position | null {
  const { x, y } = pos;
  switch (direction) {
    case "right":
      return isTheMoveValid(grid, x, y + 1) ? { x, y: y + 1 } : null;
    case "left":
      return isTheMoveValid(grid, x, y - 1) ? { x, y: y - 1 } : null;
    case "up":
      return isTheMoveValid(grid, x - 1, y) ? { x: x - 1, y } : null;
    case "down":
      return isTheMoveValid(grid, x + 1, y) ? { x: x + 1, y } : null;
    default:
      return null;
  }
}

function getNextDirection(
  grid: Grid,
  pos: Position,
  direction: string
): string | null {
  const { x, y } = pos;
  switch (direction) {
    case "right":
    case "left":
      return isTheMoveValid(grid, x + 1, y)
        ? "down"
        : isTheMoveValid(grid, x - 1, y)
        ? "up"
        : null;
    case "up":
    case "down":
      return isTheMoveValid(grid, x, y + 1)
        ? "right"
        : isTheMoveValid(grid, x, y - 1)
        ? "left"
        : null;
    default:
      return null;
  }
}

const grid: Grid = [
  [">", "-", "-", "-", "A", "-", "@", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  ["+", "-", "U", "-", "+", " ", "C", " ", "C"],
  ["|", " ", " ", " ", "|", " ", " ", " ", "|"],
  ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];

const { path, letters } = findThePath(grid);

console.log("Path:", path);
console.log("Letters:", letters);

const pathElement = document.getElementById("pathOutput");
const lettersElement = document.getElementById("lettersOutput");

if (pathElement && lettersElement) {
  pathElement.textContent = `Path: ${path}`;
  lettersElement.textContent = `Letters: ${letters}`;
}
