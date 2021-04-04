
'use strict';
/*
PROBLEM 1
    Please use Node.js and write a function to sort an array that mixes numbers and character so that the number will be sorted from small to big, then the string from A to z, then the special characters
Input:
    let arr = ["ax", "mof", "4", "63", "42", "3", "10", "[", "23", "adidas", "ba", ")", "ABC"];
Output:
    ["3", "4", "10", "23", "42", "63", "ABC", "adidas", "ax", "ba", "mof", ")", "["]
*/

// BUBBLE SORT
/**
* @param {Array}  inputArr  
* @return {Array} 
*/
let bubbleSort = (inputArr) => {
  let len = inputArr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (inputArr[j] > inputArr[j + 1]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j + 1];
        inputArr[j + 1] = tmp;
      }
    }
  }
  return inputArr;
};

/** 
SORT ARRAY
* @param {Array}  arr  // default by the requirement 
* @return {Array} 
*/
function sortArray(arr=["ax", "mof", "4", "63", "42", "3", "10", "[", "23", "adidas", "ba", ")", "ABC"]) {
  
  // ky tu dac biet temp
  const specialChars = [")", "["];
  // TÁCH SÔ
  const number = arr
    .filter((item) => !isNaN(item))
    .sort((a, b) => {
      return a - b;
    });
  // TACH CHUOI
  const str = arr.filter(
    (item) => isNaN(item) && !specialChars.some((item2) => item2 === item)
  );

  // TACH KY TU DAC BIET
  const specialStr = arr.filter((item) =>
    specialChars.some((item2) => item2 === item)
  );

  // KÊT QUA
  console.log(`
    PROBLEM 1
    Please use Node.js and write a function to sort an array that mixes numbers and character so that the number will be sorted from small to big, then the string from A to z, then the special characters
    Input:
    let arr = ["ax", "mof", "4", "63", "42", "3", "10", "[", "23", "adidas", "ba", ")", "ABC"];
    Output:
    ["3", "4", "10", "23", "42", "63", "ABC", "adidas", "ax", "ba", "mof", ")", "["]
    `);

  console.log("== HERE IS RETURN ==");
  return [...number, ...bubbleSort(str), ...bubbleSort(specialStr)];
}

module.exports = sortArray;
