var BasicCard = function(front, back)
{
    if (!(this instanceof BasicCard))
    {
        return new BasicCard(front, back);
    }
    
    this.front = front;
    this.back = back;

    this.displayBasicCard = function()
    {
        console.log("Front: " + this.front + "\nBack: " + this.back);
    }
}
module.exports = BasicCard;
