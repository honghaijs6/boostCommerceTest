/*
PROBLEM 4: 
Please use node.js and write a function to find words in any text that contain both numbers and latin characters in the word. After getting the matched words, create the variations of the words by inserting the "-" character between the latin character and the number. Please read the Input and Output requirements for clarification.

            Input:
            'Products are created with 132cxvx SKUs and MXX and CSV and 79 and mic7979 and m98opt options'

            Output:
            Matched Words: '132cxvx, mic7979, m98opt'
            Variations with '-' character: '132-cxvx, mic-7979, m-98opt, m-98-opt, m98-opt'
*/

/**
 * 
 * @param {String} input // by default maping to the requiment input string 
 *  
 */
function findWordMatched(input = "Products are created with 132cxvx SKUs and MXX and CSV and 79 and mic7979 and m98opt options") {


  // 3 regex pattern 
  const regexTextNumText = /[a-zA-Z]+[0-9]+[a-zA-Z]+$/;
  const regexNumText = /[0-9]+[a-zA-Z]+$/;
  const regexTextNum = /[a-zA-Z]+[0-9]+$/;
  
  const arr = input.split(" ");
  let matched = [];

  /**
   * using recursive if matched word at regexTextNumText 
   * then remove this element do lopp findMatch()
   * all the word which matched then will be stored in matched Array 
   * @param {Array} arr 
   */
  function findMatch(arr) {
    arr.map((item, index) => {
      // TIM CHUOI TEXT-NUM-TEXT TRUOC
      let matchTextNumText = item.match(regexTextNumText);
      if (matchTextNumText !== null) {
        //matched.push(matchTextNumText[0]);
        if (!matched.includes(matchTextNumText[0])) {
          matched.push(matchTextNumText[0]);
        }

        arr.splice(index, 1);
        findMatch(arr);

        return true;
      }

      const matchNumtext = item.match(regexNumText);
      const matchTextNum = item.match(regexTextNum);

      if (matchNumtext !== null) {
        if (!matched.includes(matchNumtext[0])) {
          matched.push(matchNumtext[0]);
        }
      }

      if (matchTextNum !== null) {
        //matched.push(matchTextNum[0]);
        if (!matched.includes(matchTextNum[0])) {
          matched.push(matchTextNum[0]);
        }
      }
    });
  }

  // START findMatch() here 
  findMatch(arr);

  //MATCHED and print the first result
  console.log("Matched Words: " + matched.join(", "));

  // tach chuoi chu so
  const regx = /(\d+)/;
  let variations = [];

  /**
   * EVERY ITEM IN ARRAY MATCHED WILL BE SPLIT WITH REGEX FOR INSERT "-" BETWEENT THEM 
   */
  matched.forEach((item) => {
    const unitMatch = item.split(regx);

    let duthua = false;
    if (unitMatch[0] === "") {
      unitMatch.splice(0, 1);
      duthua = true;
      variations.push(unitMatch.join("-"));
    }

    if (unitMatch[2] === "") {
      unitMatch.splice(2, 1);
      duthua = true;
      variations.push(unitMatch.join("-"));
    }

    // IF THE WORD GOT FORMAT TEXT-NUM-TEXT
    if (!duthua) {
      /*
        0,12
        1,1,2
        01,2
        */
      for (let i = 0; i < unitMatch.length; i++) {
        
        if (unitMatch[i + 1] && unitMatch[i + 2]) {
          // VI TRI 1
          let tempArr = [];
          tempArr.push(unitMatch[0]);
          tempArr.push(unitMatch[i + 1] + unitMatch[i + 2]);
          variations.push(tempArr.join("-"));

          //// VI TRI 2
          let tempArr2 = [];
          tempArr2.push(unitMatch[0]);
          tempArr2.push(unitMatch[i + 1]);
          tempArr2.push(unitMatch[i + 2]);

          variations.push(tempArr2.join("-"));

          // VI TRI 3
          let tempArr3 = [];
          tempArr3.push(unitMatch[0] + unitMatch[i + 1]);
          tempArr3.push(unitMatch[i + 2]);
          variations.push(tempArr3.join("-"));
        }
      }
    }
  });

  // PRINT THE RESULT 2 OUT 
  console.log("Variations with '-' character: ");
  console.log(variations.join(", "));
}
module.exports = findWordMatched;
