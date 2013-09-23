BookmarkEntityRESTUrl = "/HRRestWeb/jaxrs/service.BookmarkEntityREST";

function createPayload(bookmark)
{
	var payload = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><bookmark>";
	if (bookmark.id)
	{
		payload += ("<id>"+bookmark.id+"</id>");
	}
	payload += "<tweetid>"+(bookmark.tweetId ? bookmark.tweetId : "-1") +"</tweetid>";
	if (bookmark.message)
	{
		payload += ("<message>"+bookmark.message+"</message>");
	}
		
	//payload += ("<lastsave>0</lastsave>");
	payload += "</bookmark>";
	return payload;
}

function unmarshall(bookmarkElem)
{
	var bookmark = new Object();
	bookmark.id = bookmarkElem.find("id").first().text();
	bookmark.tweetId = bookmarkElem.find("tweetid").first().text();
	bookmark.message = bookmarkElem.find("message").first().text();
	bookmark.lastsave = new Date(bookmarkElem.find("lastsave").first().text());
	
	bookmark.createId = function(prefix)
	{
		return prefix + this.id;
	};
	
	return bookmark;
}

function readBookmarks(callback)
{
	$.ajax({
		type: "GET",
		url: BookmarkEntityRESTUrl,
		success : function(data){callback(data);}
		}
	);
}


function addBookmark(bookmark, callback)
{
	var payload = createPayload(bookmark);

	$.ajax({
		contentType: "application/xml",
		type: "POST",
		url: BookmarkEntityRESTUrl,
		data:payload,
		success:function(data){callback(data);}
		}
	);
}

function editBookmark(bookmark, callback)
{
	var payload = createPayload(bookmark);
	
	$.ajax({
		contentType: "application/xml",
		type: "PUT",
		url: BookmarkEntityRESTUrl,
		data:payload,
		success:function(data){callback(data);}
		}
	);
}

function removeBookmark(id, callback)
{
	$.ajax({
		contentType: "application/xml",
		type: "DELETE",
		url: BookmarkEntityRESTUrl+"/"+id,
		success:function(data){callback(data);}
		}
	);
}
function tweetBookmark(bookmark, callback)
{
	var payload = createPayload(bookmark);
	$.ajax({
		contentType: "application/xml",
		type: "PUT",
		url: "/HRRestWeb/jaxrs/TwitterService",
		data: payload,
		success:function(data){callback(data);}
	}
	);
}
