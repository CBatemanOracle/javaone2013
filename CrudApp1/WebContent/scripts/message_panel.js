g_lastSaved = -1;



function MessagePanel(message)
{
	this.message = message;
	this.createContents = function(parentId)
	{
		var messageId = this.message.createId("li");

		elementById(parentId).append(createElement("li", {id :messageId, tweetid : this.message.tweetId}));
		elementById(messageId).append(createElement("span", {id:this.message.createId("span")}, this.message.text));
		var spanId = this.message.createId("span");
		elementById(spanId).click(
			function() {
				elementById(spanId).css('display', 'none');
				elementById(inputId).val(elementById(spanId).text()).css('display',
						'').focus();
			});
		var inputId = this.message.createId("input");
		elementById(messageId).append(createElement("input", {id:inputId, style:"display: none;"}));
		var outer = this;
		elementById(inputId).blur(function(){outer.handleEdit(message);});
        elementById(inputId).keydown(function(event){
            if (event.which == 13)
            {
                outer.handleEdit(message);
            }
        });
        var successIconId = this.message.createId("successIconSpan");
        var successIconDisplayId = this.message.id == g_lastSaved ? "display: '';" : "display: none;";

        elementById(messageId).append(createElement("span", {id:successIconId, style:successIconDisplayId}));
        elementById(successIconId).append(createElement("img", {alt:"Saved", src:"icons/success.png"}));
        
		if (this.message.tweetId == -1) {
		    var removeId = this.message.createId("removeIcon");
			elementById(messageId).append(createElement("span", {
				id : removeId,
				onclick : "onDelete(" + this.message.id + ")"
			}));
			elementById(removeId).append(createElement("img", {
			    alt : "Delete",
			    src : "icons/remove.png"}));
			
			var tweetId = this.message.createId("tweetIcon");
			elementById(messageId).append(createElement("span",{
			   id : tweetId}));
			elementById(tweetId).click(function(){
			   onTweet(this.message);
			});
			elementById(tweetId).append(createElement("img", {
			   alt : "Tweet", src:"https://twitter.com/images/b2_btn_icon.gif"}));
		}

		elementById(messageId).append(createElement("div", {
					style : "font-size: 50%;"
				}, "Last modified: " + formatDate(this.message.lastsave)));
	};
	


	this.handleEdit = function(message) {
		var inputId = message.createId("input");
		elementById(inputId).css('display', 'none');
		var newText = elementById(inputId).val();
		var spanId = message.createId("span");
		elementById(spanId).text(newText).css('display', '');
		message.text = newText;
		editMessage(message, function() {
			g_lastSaved = message.id;
			readMessages(onRefreshSuccess);
		});
	};
}

function elementById(id)
{
	return $("#"+id);
}