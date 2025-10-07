// Use a direct import to get the class
import Gameboard from './src/scripts/Gameboard.js';
import Ship from './src/scripts/Ship.js';

test('Can place a ship on a valid, empty spot', () => {
  const board = new Gameboard();

  expect(board.canPlace(3, 1, 1)).toBe(true);
});

test('Should NOT be able to place a ship off the board', () => {
  const board = new Gameboard();

  // This ship would go past the bottom edge (y=8, 9, 10) - which is out of bounds
  expect(board.canPlace(3, 1, 8, true)).toBe(false);
});

test('Should NOT be able to place a ship over another ship', () => {
  const board = new Gameboard();
  const ship = new Ship(4);

  board.placeShips(ship, 1, 1, true);

  expect(board.canPlace(3, 1, 1, true)).toBe(false);
});

test('Should be able to put a ship horizontally', () => {
  const board = new Gameboard();

  expect(board.canPlace(3, 1, 1, false)).toBe(true);
});

test('Should not be able to put a ship over another ship horizontally', () => {
  const board = new Gameboard();
  const ship = new Ship(4);

  board.placeShips(ship, 0, 0, true);

  expect(board.canPlace(3, 0, 3, false)).toBe(false);
});

test('Should be able to attack a ship and say that a ship was hit', () => {
  const board = new Gameboard();
  const ship = new Ship(4);
  board.placeShips(ship, 0, 0, true);

  expect(board.attack(0, 0)).toBe(true);
});

test('Should be tell if a ship is dead after the final blow', () => {
  const board = new Gameboard();
  const ship = new Ship(1);
  board.placeShips(ship, 0, 0, true);
  board.attack(0, 0);
});
