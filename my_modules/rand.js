//This module contains a function to get a random element from an array.
module.exports = (arr) => {
    return arr[Math.floor(Math.random()*arr.length)];
}