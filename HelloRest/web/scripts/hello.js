function SayHello() {
	$.ajax({
		url : "/HelloRest/rest/hello/"+$('#inputText').val(),
		// data: {
		// zipcode: 97201
		// },
		success : function(data) {
			$("#response").html("<strong>" + data + "</strong>");
		}
	});
}