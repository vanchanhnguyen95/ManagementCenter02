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
    



}