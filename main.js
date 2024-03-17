function findThePath(grid) {
    var path = [];
    var letters = [];
    var currentPosition = findStartingPosition(grid);
    if (!currentPosition) {
        return { path: "Starting position not found", letters: "" };
    }
    var direction = "right";
    while (currentPosition) {
        var x = currentPosition.x, y = currentPosition.y;
        var currentChar = grid[x][y];
        path.push(currentChar);
        if (currentChar === "s") {
            break;
        }
        if (/[A-Z]/.test(currentChar)) {
            letters.push(currentChar);
            var nextDirection = getNextDirection(grid, currentPosition, direction);
            if (nextDirection) {
                direction = nextDirection;
            }
        }
        else if (currentChar === "+") {
            var nextDirection = getNextDirection(grid, currentPosition, direction);
            if (nextDirection) {
                direction = nextDirection;
            }
        }
        currentPosition = movingDirection(grid, currentPosition, direction);
    }
    return { path: path.join(""), letters: letters.join("") };
}
function findStartingPosition(grid) {
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            if (grid[x][y] === ">") {
                return { x: x, y: y };
            }
        }
    }
    return null;
}
function isTheMoveValid(grid, x, y) {
    return (x >= 0 &&
        x < grid.length &&
        y >= 0 &&
        y < grid[0].length &&
        grid[x][y] !== " ");
}
function movingDirection(grid, pos, direction) {
    var x = pos.x, y = pos.y;
    switch (direction) {
        case "right":
            return isTheMoveValid(grid, x, y + 1) ? { x: x, y: y + 1 } : null;
        case "left":
            return isTheMoveValid(grid, x, y - 1) ? { x: x, y: y - 1 } : null;
        case "up":
            return isTheMoveValid(grid, x - 1, y) ? { x: x - 1, y: y } : null;
        case "down":
            return isTheMoveValid(grid, x + 1, y) ? { x: x + 1, y: y } : null;
        default:
            return null;
    }
}
function getNextDirection(grid, pos, direction) {
    var x = pos.x, y = pos.y;
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
var grid = [
    [">", "-", "-", "-", "A", "-", "@", "-", "+"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
    ["+", "-", "U", "-", "+", " ", "C", " ", "C"],
    ["|", " ", " ", " ", "|", " ", " ", " ", "|"],
    ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];
var _a = findThePath(grid), path = _a.path, letters = _a.letters;
console.log("Path:", path);
console.log("Letters:", letters);
var pathElement = document.getElementById("pathOutput");
var lettersElement = document.getElementById("lettersOutput");
if (pathElement && lettersElement) {
    pathElement.textContent = "Path: ".concat(path);
    lettersElement.textContent = "Letters: ".concat(letters);
}
