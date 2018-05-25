function Validation()
{
    this.TestEmpty = function (value)
    {
        if(value.trim() === "")
        {
            return true;
        }
        return false;
    }
    this.TestEmail = function validateEmail(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }
    
    this.TestNumber = function validateNumber(value){
        var re = /^\d+$/;
        if (re.test(value) && value.length >= 10)
        {
            return true;
        }
        return false;
    }


}