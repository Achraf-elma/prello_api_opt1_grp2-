class RequestError{
    constructor(_status, _message){
        this.status = _status;
        this.message = _message;
    }
}

module.exports = RequestError;