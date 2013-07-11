var tester = {
	testText: $("#testArea"),
	pattText: $("#patternArea"),

	clear: function() {
		this.testText.val("");
	}
}

var textareaHighlight = {
	highlightWrap: $("#highlightContainer"),
	highlightDiv: $("#highlight"),
	patternWrap: $("#textContainer"),
	pattern: $("#textArea"),

	clear: function() {
		$(this).highlightDiv.html("");
		$(this).pattern.val("");
	},

	highlight: function(word) {
		curString = $(this.pattern).val();
		for(var i in words) {
			curString = curString.replace(new RegExp("("+words[i]+")", "g"), "<span style='background-color: yellow !important;'>" + words[i] + "</span>");
		}
		$(this.highlightDiv).html(curString);
	},

	highlightOne: function(patt) {
		curString = $(this.pattern).val();
		try {
			curString = curString.replace(new RegExp(patt, "g"), "<span style='background-color: yellow !important;'>" + "$&" + "</span>");
		} catch(err) {
			console.log("Error while replacing - "+err.message);
		}
		
		$(this.highlightDiv).html(curString);
	},

	highlightIndex: function(i, len) {
		curString = $(this.highlightDiv).val();
		subString = curString.substr(i, len);
		curString = curString.replace(subString, "<span style='background-color: yellow;'>" + subString + "</span>");
		$(this.highlightDiv).html(curString);
	},

	highlightIndices: function(indiceList) {
		curString = $(this.pattern).val();
		var subStrings = [];

		for(var i in indiceList) {
			subStrings.push(curString.substr(indiceList[i].index, indiceList[i].len));
		}
		console.log(subStrings);
		for(var s in subStrings) {
			curString = curString.replace(subStrings[s], "<span style='background-color: yellow;'>" + subStrings[s] + "</span>")
		}
		console.log(curString);
		$(this.highlightDiv).html(curString);
	}


}




var highlightContainer = $("#highlightContainer");
var highlight = $("#highlight");
var testTextContainer = $("#textContainer");
var testText = $("#textArea");


$("#wrapper").css({'position': 'relative'})

highlightContainer.css({
                                    'position':         'absolute',
                                    'left':             '0',
                                    'top':              '0',
                                    'border':           '1px solid #000000',
                                    'width':            '500',
                                    'height':           '250',
                                    'cursor':           'text'
                                });

testTextContainer.css({
                                    'position':         'absolute',
                                    'left':             '0',
                                    'top':              '0',
                                    'border':           '1px solid #000000'
                                });

highlight.css({

                                    'padding':          '5px',
                                    'color':            '#eeeeee',
                                    'background-color': '#eeeeee',
                                    'height': 			'250', 
                                    'margin':           '0px',
                                    'font-size':        '11px',
                                    'font-family':      '"lucida grande",tahoma,verdana,arial,sans-serif'
                                });

testText.css({
                                    'background-color': 'transparent',
                                    'padding':          '5px',
                                    'margin':           '0px',
                                    'font-size':        '11px',
                                    'width':            '500',
                                    'height':           '250',
                                    'font-family':      '"lucida grande",tahoma,verdana,arial,sans-serif'
                                });

highlightContainer.on('click', function() {
                                    testText.focus();

                                });

var theString = "this is a test ok ok ";
highlight.html(theString);
testText.html(theString)
var words = [ "this is", "test", "ok" ];
var findTest = /test/g;
textareaHighlight.highlight(words);
var list = [];
for(var w in words) {
	var reg = new RegExp(words[w], "g");
	while((result = reg.exec(testText.html())) !== null) {
    	list.push({'index': result.index, 'len': result[0].length});
	}
}
console.log(list)
//textareaHighlight.highlightIndices(list);
var result = findTest.exec(testText.html())
testText.focus();

var input = $("#patternArea");
input.on("keyup", function() {
	//hilite.html(input.val());
	//patt.val(input.val());
	textareaHighlight.highlightOne(input.val());
});

testText.on("keyup", function() {
	highlight.html(testText.val());

	textareaHighlight.highlightOne(input.val());
});