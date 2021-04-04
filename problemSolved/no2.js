/**
 * CLASS VIHECLE
 * NEEDA TO BE EXTEND
 */
class Vehicle {
  constructor() {
    this.width = 0;
    this.timeIn = null;
    this.timeOut = null;
    this.plate = null;
  }

  setTimeIn(dateTime) {
    this.timeIn = dateTime;
  }
  setTimeOut(dateTime) {
    this.timeOut = dateTime;
  }
}

/**
 * CLASS CAR
 * EXTEND FROM VIHECLE CLASS
 */
class Car extends Vehicle {
  constructor(plate = null) {
    super();
    this.width = 2; // DEFAULT PRICE
    this.type = "car";
    this.plate = plate;
  }
}

/**
 * CLASS BIKE
 * EXTENDTED FROM VEHICLE CLASS
 */
class Bike extends Vehicle {
  constructor(plate = null) {
    super();
    this.width = 0.8; //  DEFAULT PRICE
    this.type = "bike";
    this.plate = plate;
  }
}

/**
 * CLASS PACKING LOT
 *    properties :
 *    - logData :  used for storing record vehicle in-out
 *    - data :  storeing the current state of class
 *
 *    methods:
 *    - in(width, plate) // require the size width of vehicle to indicate Car or Bike, and Plate use it as unique ID
 *    - out(plate) // require plate to get the correct info when vehicle out
 *    - calculateFee(info) //  info is vehicle info be passed from out() method
 *    - calculateDay(timeIn, timeOut)
 */
class PackingLot {
  constructor() {
    this.logData = [];

    this.data = {
      car: {
        loc: [],
        area: "A",
        price: 10,
      },
      bike: {
        loc: [],
        area: "B",
        price: 2,
      },
    };
    this.totalPacked = 0;
  }

  /**
   *
   * @returns {String} // dateTime format : YYYY-MM-DD hh:mm:ss
   */
  getCurDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    return (
      date.getFullYear() +
      "-" +
      month +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }

  /**
   *
   * @param {Interget} width
   * @param {String} plate
   * @returns { String } //  indicated vehicle accepted or rejected and print out message
   */
  in(width = 0, plate = "") {
    let ret = "";
    let mVehicle;

    // CHECKING TYPE OF VEHICLE CAR OR BIKE
    if (width >= 2) {
      mVehicle = new Car(plate);
    } else if (width > 0.8 && width < 2) {
      mVehicle = new Bike(plate);
    }

    // CHECK IS PACKING LOT FULL OR NOT ;
    if (mVehicle !== undefined) {
      const isFullLoc = this.totalPacked < 80 ? false : true;

      if (isFullLoc) {
        ret = "At the moment, the parking lot has no space left";
      } else {
        mVehicle.setTimeIn(this.getCurDate());
        this.data[mVehicle.type]["loc"].push(mVehicle);
        ret = "Please go into area " + this.data[mVehicle.type]["area"];

        this.totalPacked++;
      }
    }

    return ret;
  }

  /**
   *
   * @param {String} plate
   * @returns {String} 
   */
  out(plate) {
    // MERGED 2 TYPE OF ARRAY
    let retStr = '';
    const tempData = [...this.data.car.loc, ...this.data.bike.loc];

    let info;
    tempData.map((item) => {
      if (item.plate === plate) {
        info = item;
      }
    });

    if (info) {
      // calculate fee
      const fee = this.calculateFee(info);
      // remove Vihicle data out of array

      // write log for complete record
      info.timeOut = this.getCurDate();
      info.totalFee = fee;
      
      // STORE DATA LOG KEEP TRACK 
      this.logData.push(info);
      // DECREASE NUMBER OF PACKED LOC
      this.totalPacked--;

      retStr = 'Vehicle out, and Packing lot loc now available for '+ this.totalPacked;

      
    }else{
      retStr = 'Sorry but something wrong with plate you put In, please try again!';
    }

    return retStr ; 
  }

  /**
   * 
   * @param {String} timeIn // full dateTime  
   * @param {String} timeOut // full datetime
   * @returns {Float} // number of days
   */
  calculateDay(timeIn, timeOut) {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const date1 = new Date(timeIn);
    const date2 = new Date(timeOut);
    const timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;

    return (timediff / day).toFixed(1);
  }
  /**
   * 
   * @param {Object} info 
   * @returns {Float} // total fee
   */
  calculateFee(info) {

    // CALCULATE DAY SPENDING 
    let totalDay = this.calculateDay(info.timeIn, this.getCurDate());
    totalDay = totalDay < 1 ? 1 : totalDay;

    // FORMULA FOR PRINT OUT TOTAL FEE 
    return (this.data[info.type]["price"] * totalDay).toFixed(2);
  }
}

module.exports = PackingLot;
