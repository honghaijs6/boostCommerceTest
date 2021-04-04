

// IMPORT PACKING LOT CLASS
const PackingLot = require('./no3');

// INSTANCE OBJECT 
const packingLot = new PackingLot();

// SUPPOSED ADD 2 VEHICLE IN 
packingLot.in(2,'ABC');
packingLot.in(0.8,'ACS');

// TEST IT CALCULATE PACKING FEE BY PASS VEHICLE PLATE 
test("Test Calculate Packing Fee",()=>{
    expect(
        
        packingLot.calculateParkingFee('ABC')
    ).toEqual({msg:'success',total:'5.00'});
})  



