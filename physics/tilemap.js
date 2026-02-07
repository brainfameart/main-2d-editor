// physics/tilemap.js

export class Tilemap {
  constructor(tileSize, grid) {
    this.tileSize = tileSize;
    this.grid = grid; // 2D array (1 = solid)
  }

  isSolid(x, y) {
    const tx = Math.floor(x / this.tileSize);
    const ty = Math.floor(y / this.tileSize);
    return this.grid[ty]?.[tx] === 1;
  }
}

