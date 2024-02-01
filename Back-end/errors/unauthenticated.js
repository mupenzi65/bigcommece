const CustomAPIError=require('./custom-api')
const {StatusCodes}=require('http-status-codes')


class UnauthanticatedError extends  CustomAPIError{
    constructor(message){
        super(message)
        this.StatusCode=StatusCodes.UNAUTHORIZED
    }
}

module.exports=UnauthanticatedError