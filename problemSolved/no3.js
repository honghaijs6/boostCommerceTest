/*
PROBLEM 3
Please use node.js to develop a function calculateParkingFee() to calculate the parking fee with the following requirements:
    - Parking price for all vehicles is $5/day
    - Total parking fee is = parking price * total days (Total days = Time Out - Time In. If it is < 1 day, it is considered 1 day, > 1 day round up to the nearest higher)
    - Time Out is based on the current time
Please write the function in a manner that it can be tested with unit tests. Write the function and a sample unit test for testing the function.
*/

// IMPORT CLASS PACKING FOR EXTEDING MEDTHOD calculateParkingFee()
const PackingLot = require('./no2');

/**
 * METHOD : CALCULATE PACKING FEE
 * @param {String} plate 
 * @returns {Object}
 */
PackingLot.prototype.calculateParkingFee = function(plate){
    
    let retObject = {
      msg:'',
      total:0
    }
    // BY DEFAULT TIMEOUT IS CURRENT DATETIME 
    const timeOut = this.getCurDate();

    // SUPPOSED PRICE FOR ALL VIHECLE IS 5$
    const PRICE = 5; // DEFAULT PRICE 

    if(plate){

        // MERGED 2 TYPE OF VEHICLE TO FIND THE CORRECT ONE BY PLATE
        const tempData = [...this.data.car.loc,...this.data.bike.loc];
        let info ;
        tempData.map((item)=>{
          if(item.plate === plate){
            info = item
          }
        });
        
        if(info){
            // CALCULTE DAYS SPEND 
            let totalDay = this.calculateDay(info.timeIn, timeOut);
            totalDay = totalDay < 1 ? 1 : totalDay ;
    
            // THE RESULT OF FEE
            retObject.msg = 'success';
            retObject.total = (PRICE * totalDay).toFixed(2) ;
            
        }else{
          retObject.msg = 'can not find the plate to calculate packing fee';
        }

        
        
    }else{
      retObject.msg = 'can not find the plate to calculate packing fee';
    }

    return retObject;
}

module.exports = PackingLot ; 