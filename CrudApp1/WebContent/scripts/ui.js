function elementById(id)
{
	return $("#"+id);
}

function createElement(elementName, attributes, text)
{
	var retValue = "<"+elementName;
	for (propName in attributes)
	{
		retValue += " "+propName + "=\"" + attributes[propName] + "\"";
	}
	retValue += ">";
	
	if (text)
	{
		retValue += text;
	}
	
	retValue += "</"+elementName+">";
	return retValue;
}

function formatDate(date)
{
	var day = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")[date.getDay()];
	var month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")[date.getMonth()];
	var dayOfMonth = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	return day+", "+month+" "+dayOfMonth + " at "+ 
		((hours < 10 ? "0" : "")+ hours) +":"+
		((minutes < 10 ? "0" : "") + minutes)+":"+
		((seconds < 10 ? "0" : "") + seconds);
}	