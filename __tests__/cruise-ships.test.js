
/*globals describe it expect*/
const Ship= require('../src/cruise-ships')
const Itinerary = require('../src/itinerary')
const Port = require ('../src/port')


describe("ship",()=>{
    describe('with ports and an itinerary',()=>{
        let iceland;
        let singapore;
        let tripItinerary;
        let myShip;
    
        beforeEach(()=>{ 
            //iceland=new Port(Iceland);
             iceland = {
                name:'Iceland',
                ships:[],
                addShip: jest.fn(),
                removeShip: jest.fn(),
             };
            //singpapore=new Port('Singapore);
             singapore = {
                name:'Singapre',
                ships:[],
                addShip: jest.fn(),
                removeShip: jest.fn(),
             };

             //tripItinerary = new Itinerary([iceland,singapore]);
             tripItinerary={
                port:[iceland,singapore]
             };
             myShip = new Ship (tripItinerary);
        })

    test("can be instatiated",()=>{
           expect(myShip).toBeInstanceOf(Object);

    })

    test("the ship has a start point",()=>{
           expect(myShip.currentPort).toBe(iceland)
    })

    test(" the ship can set sail",()=>{
        myShip.currentPort=iceland;
        myShip.previousPort=null;
        myShip.toSetSail()
      
        
        expect(myShip.currentPort).toBeFalsy();
        expect(iceland.removeShip).toHaveBeenCalledWith(myShip);
    })

    test('it can\'t set sail further than the last item on itinerary',()=>{
        myShip.toSetSail();
        myShip.docks();

        expect(()=>myShip.toSetSail()).toThrowError('End of Itinerary reached!');
    })

    
    test('it docks at another port',()=>{ 
        myShip.toSetSail()
        myShip.docks()
      
        //expect(singapore.ships).toContain(myShip);
        expect(singapore.addShip).toHaveBeenCalledWith(myShip);
        expect(myShip.previousPort).toBe(iceland);
        expect(myShip.currentPort).toBe(singapore);
        
    })
    
    test('new ship gets added to port on instatiation',()=>{
        expect(iceland.addShip).toHaveBeenCalledWith(myShip);
    })
})
})




