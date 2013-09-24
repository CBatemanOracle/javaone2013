g_lastSaved = -1;

function ListItem(message)
{
	this.message = message;

	this.createContents = function(parentId)
	{
		this.elementId = this.message.createId("li");
		elementById(parentId).append(createElement("li", {id : this.elementId, tweetid : this.message.tweetId}));
	};
}
function EditableLabel(message)
{
	this.message = message;
	
	this.createContents = function(parentId)
	{
		this.elementId = this.message.createId("span");
		elementById(parentId).append(createElement("span", {id:this.elementId}, this.message.text));
		
		this.inputId = this.message.createId("input");
		elementById(parentId).append(createElement("input", {id:this.inputId, style:"display: none;"}));
		var outer = this;

		elementById(this.elementId).click(
			function() {
				elementById(outer.elementId).css('display', 'none');
				elementById(outer.inputId).val(elementById(outer.elementId).text()).css('display',
						'').focus();
			});
		elementById(this.inputId).blur(function(){outer.handleEdit(message);});
        elementById(this.inputId).keydown(function(event){
            if (event.which == 13)
            {
                outer.handleEdit(message);
            }
        });
	};
	
	this.handleEdit = function(message) {
		elementById(this.inputId).css('display', 'none');
		var newText = elementById(this.inputId).val();
		var spanId = message.createId("span");
		elementById(spanId).text(newText).css('display', '');
		message.text = newText;
		editMessage(message, function() {
			g_lastSaved = message.id;
			readMessages(onRefreshSuccess);
		});
	};
}

function SuccessIcon(message)
{
	this.message = message;
	
	this.createContents = function(parentId)
	{
        var successIconId = this.message.createId("successIconSpan");
        var successIconDisplayId = this.message.id == g_lastSaved ? "display: '';" : "display: none;";

        elementById(parentId).append(createElement("span", {id:successIconId, style:successIconDisplayId}));
        elementById(successIconId).append(createElement("img", {alt:"Saved", src:"icons/success.png"}));
	};
	
}

function MessagePanel(message)
{
	this.message = message;
	this.createContents = function(parentId)
	{
		var listItem = new ListItem(this.message);
		listItem.createContents(parentId);

		var editableLabel = new EditableLabel(message);
		editableLabel.createContents(listItem.elementId);

		var successIcon = new SuccessIcon(message);
		successIcon.createContents(listItem.elementId);
		
        
		if (this.message.tweetId == -1) {
		    var removeId = this.message.createId("removeIcon");
			elementById(listItem.elementId).append(createElement("span", {
				id : removeId,
				onclick : "onDelete(" + this.message.id + ")"
			}));
			elementById(removeId).append(createElement("img", {
			    alt : "Delete",
			    src : "icons/remove.png"}));
			
			var tweetId = this.message.createId("tweetIcon");
			var outer = this;
			elementById(listItem.elementId).append(createElement("span",{
			   id : tweetId}));
			elementById(tweetId).click(function(){
			   onTweet(outer.message);
			});
			elementById(tweetId).append(createElement("img", {
			   alt : "Tweet", src:"https://twitter.com/images/b2_btn_icon.gif"}));
		}

		elementById(listItem.elementId).append(createElement("div", {
					style : "font-size: 50%;"
				}, "Last modified: " + formatDate(this.message.lastsave)));
	};
	
}

function elementById(id)
{
	return $("#"+id);
}