function Message()
{
	this.toXMLPayload = function ()
	{
		var payload = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><message>";
		if (this.id)
		{
			payload += ("<id>"+this.id+"</id>");
		}
		payload += "<tweetid>"+(this.tweetId ? this.tweetId : "-1") +"</tweetid>";
		if (this.text)
		{
			payload += ("<text>"+this .text+"</text>");
		}
			
		//payload += ("<lastsave>0</lastsave>");
		payload += "</message>";
		return payload;
	};

	this.fromXMLPayload = function (messageElem)
	{
		this.id = messageElem.find("id").first().text();
		this.tweetId = messageElem.find("tweetid").first().text();
		this.text = messageElem.find("text").first().text();
		this.lastsave = new Date(messageElem.find("lastsave").first().text());
		
		this.createId = function(prefix)
		{
			return prefix + this.id;
		};
		
	};

	this.createId = function (prefix)
	{
		return prefix+this.id;
	};
	
}
