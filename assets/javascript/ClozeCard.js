var ClozeCard = function(text, cloze)
{
    if (!(this instanceof ClozeCard))
    {
        return new ClozeCard(text, cloze);
    }

    this.cloze = cloze;
    this.partial = text.replace(cloze, "...");
    this.fullText = text;

    this.displayClozeCard = function()
    {
        if (text.search(cloze) != -1)
        {
            console.log("Cloze: " + this.cloze + 
                "\nPartial: " + this.partial + 
                "\nFull Text: " + this.fullText);
        }
        else
        {
            console.log("'" + cloze + "' doesn't appear in '" + text + "'");
        }
    }
}
module.exports = ClozeCard;
