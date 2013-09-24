RestPath = "/CrudApp1/jaxrs";
MessageEntityRESTUrl = RestPath+ "/service.MessageEntityREST";
TwitterEntityRESTUrl = RestPath+"/TwitterService";

function readMessages(callback)
{
	$.ajax({
		type: "GET",
		url: MessageEntityRESTUrl,
		success : function(data){callback(data);}
		}
	);
}


function addMessage(message, callback)
{
	var payload = message.toXMLPayload();

	$.ajax({
		contentType: "application/xml",
		type: "POST",
		url: MessageEntityRESTUrl,
		data:payload,
		success:function(data){callback(data);}
		}
	);
}

function editMessage(message, callback)
{
	var payload = message.toXMLPayload(message);
	
	$.ajax({
		contentType: "application/xml",
		type: "PUT",
		url: MessageEntityRESTUrl,
		data:payload,
		success:function(data){callback(data);}
		}
	);
}


function removeMessage(id, callback)
{
	$.ajax({
		contentType: "application/xml",
		type: "DELETE",
		url: MessageEntityRESTUrl+"/"+id,
		success:function(data){callback(data);}
		}
	);
}
function tweetMessage(message, callback)
{
	var payload = message.toXMLPayload();
	$.ajax({
		contentType: "application/xml",
		type: "PUT",
		url: TwitterEntityRESTUrl,
		data: payload,
		success:function(data){callback(data);}
	}
	);
}
