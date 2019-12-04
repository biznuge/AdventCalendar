let Fetcher = require("../../../helpers/fetcher.js")

class Computer{

    constructor(){

        //console.log('Computer constructor')

        this.byteCodeOriginal = null
        this.byteCode = null
        this.byteCodeArray = null
        this.commandPointer = 0

        this.currentCommand = null;

        this.failOver = false

        //this.loadByteCode()

    }

    getNextCommand(){
        
        this.currentCommand = this.getCommandByIndex(this.commandPointer)
        //console.log("getNextCommand -> this.currentCommand: " ,this.currentCommand)
            
        this.commandPointer++

    }

    /*getValueByIndex = function(index){
        return this.byteCodeArray[index]
    }
    setValueByIndex = function(index, value){
        this.byteCodeArray[index] = value
    }*/

    getCommandByIndex(index){

        let command = new Array();
        
        //console.log("this.commandPointer: " ,this.commandPointer)

        if (this.byteCodeArray!=null){
            
            //console.log("ByteCodeArrray: " ,this.byteCodeArray)
            //console.log("ByteCodeArrray.length: " ,this.byteCodeArray.length)
    
            // checks if we've got a full command in the last slot of the array, hopefully.
            if(this.commandPointer+3 <= this.byteCodeArray.length-1 ){
    
                command[0] = this.byteCodeArray[index*4]
                command[1] = this.byteCodeArray[index*4+1]
                command[2] = this.byteCodeArray[index*4+2]
                command[3] = this.byteCodeArray[index*4+3]
    
            }else{
                command = null
            }

        }else{
            this.failOver = true
        }

        return command

    }
    
    loadByteCode(_byteCode){
        //this.byteCodeOriginal = Fetcher.doFile(__dirname + '\\input.txt')
        //console.log("BYTECODE 2: ", _byteCode)
        this.byteCodeOriginal = _byteCode
        this.byteCode = this.byteCodeOriginal
        this.byteCodeArray = this.byteCode.split(",")
        this.commandPointer = 0
    } 


    runCommand(_pointer, _command, _byteCodeArray){

        if (_byteCodeArray!=null){

            let opcode = parseInt(_command[0])
            let value1 = parseInt(_byteCodeArray[_command[1]])       
            let value2 = parseInt(_byteCodeArray[_command[2]])
            
            let outputIndex = parseInt(_command[3])
            
            switch (opcode) {
                case 1:
                    _byteCodeArray[outputIndex] = value1 + value2
                    break
                case 2:
                    _byteCodeArray[outputIndex] = value1 * value2
                    break
                case 99:
                    this.failOver = true
                    return null
                    break
                default:
                    this.failOver = true
                    console.log('NOT AN OPCODE: ', opcode);
                    return null
              }

              //console.log(`${opcode}, ${_command[1]}(${value1}), ${_command[1]}(${value2}), (${ _byteCodeArray[outputIndex]})${outputIndex} `)

        }else{
            this.failOver = true
        }

        return _byteCodeArray

    }

    runProgramme(){

        this.getNextCommand()

        while(this.currentCommand!=null && !this.failOver){

            //console.log("WHILE")

            //console.log("this.commandPointer: " ,this.commandPointer)
            //console.log("this.currentCommand: " ,this.currentCommand)
            //console.log("this.byteCodeArray: " ,this.byteCodeArray)
            
    
            let byteCodeReturn = this.runCommand(this.commandPointer, this.currentCommand, this.byteCodeArray)

            if (byteCodeReturn!=null){
                this.byteCodeArray = byteCodeReturn
            }
            
            this.getNextCommand()

        }   
        
        let bytesNew = this.byteCodeArray.join(',')

        //console.log("Original: ", this.byteCodeOriginal);
        //console.log("     New: ", bytesNew);

        return this.byteCodeArray[0]

    }
    

}

module.exports = Computer