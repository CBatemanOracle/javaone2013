 function Hello()
 {
	 var inputUrl = "/Rest1/rest/hello/"+ $('#inputText').val();
	 $.ajax({
		 url: inputUrl,
		 success: function( data ) {
		 $( "#response" ).html( "<strong>" + data + "</strong>" );
		 }
		 });
 }