var textareaHighlight = {
	highlightWrap: $("#highlightContainer"),
	highlightDiv: $("#highlight"),
	patternWrap: $("#textContainer"),
	pattern: $("#textArea"),

	getFlags: function() {
		var flags = { 
				'g': $("#flagGlobal").is(":checked"),
				'i': $("#flagCase").is(":checked"),
				'm': $("#flagMulti").is(":checked"),
				'y': $("#flagSticky").is(":checked")
			};
		return flags
		
	},

	clear: function() {
		$(this).highlightDiv.html("");
		$(this).pattern.val("");
	},

	test: function(patt) {
		curString = $(this.pattern).val();
		try {
			var flags = "";
			var checked = this.getFlags();
			for(var i in checked) {
				if(checked[i] == true) flags = flags + i; //Construct flag string to use in replace
			}
			curString = curString.replace(new RegExp(patt, flags), "<span style='background-color: yellow !important;'>" + "$&" + "</span>");
		} catch(err) {
			console.log("Error while replacing - "+err.message);
		}
		
		$(this.highlightDiv).html(curString);
	}
}


//Catch events
highlightContainer.on('click', function() {
    testText.focus(); // Focus textarea if user clicks on highlight div

});
var input = $("#patternArea");
input.on("keyup", function() {
	textareaHighlight.test(input.val());
});

testText.on("keyup", function() {
	highlight.html(testText.val());
	textareaHighlight.test(input.val());
});

$("#flags input").each(function() {
	$(this).on("click", function() {
		textareaHighlight.test(input.val()
	)});
});