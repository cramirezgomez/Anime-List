import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
  let timePipe: TimePipe
  beforeEach(() => {
     timePipe= new TimePipe();
  })

  describe('transform',() => {
    it('should create an instance', () => {
      expect(timePipe).toBeTruthy();
    });
  
    it('should return with < 10 mins', () => {
      //Arrange
      let minutes = 5
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('0:05')
    })
  
    it('should return with 10 mins', () => {
      //Arrange
      let minutes = 10
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('0:10')
    })
  
    it('should return with > 10 mins', () => {
      //Arrange
      let minutes = 133
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('2:13')
    })
    it('should return with 60 mins', () => {
      //Arrange
      let minutes = 60
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('1:00')
    })

    it('should return with > -10 mins', () => {
      //Arrange
      let minutes = -5
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('-0:05')
    })
  
    it('should return with -10 mins', () => {
      //Arrange
      let minutes = -10
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('-0:10')
    })
  
    it('should return with < -10 mins', () => {
      //Arrange
      let minutes = -133
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('-2:13')
    })
    it('should return with -60 mins', () => {
      //Arrange
      let minutes = -60
  
      //Act
      let output = timePipe.transform(minutes);
  
      //Assert
      expect(output).toBe('-1:00')
    })
  })
  


});
