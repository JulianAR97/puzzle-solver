class Cell {
  #i
  #j

  constructor(i = 0, j = 0, possibleValues = [], pdx = 0) {
    this.#i = i;
    this.#j = j;
    this.possibleValues = possibleValues;
    this.pdx = pdx;
  }

  get i() {
    return this.#i;
  }

  get j() {
    return this.#j
  }
}



