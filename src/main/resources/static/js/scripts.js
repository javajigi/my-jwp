$(".answer-write input[type='submit']").on("click", addAnswer);
$(".qna-comment-slipp-articles").on("click", ".delete-answer-form button[type='submit']", deleteAnswer);

function deleteAnswer(e) {
	console.log('click delete answer button!');
	e.preventDefault();
	
	var url = $(".delete-answer-form").attr("action");
	console.log("url : " + url);
	
	var $this = $(this);
	
	$.ajax({
		type: 'delete',
		url: url,
		dataType: 'json',
		error: function() {
			console.log('fail!');
		},
		success: function(data) {
			console.log('data', data);
			if (data.valid) {
				$this.closest(".article").remove();
			} else {
				alert(data.errorMessage);
			}
		}
	});
}

function addAnswer(e) {
	console.log('click answer button!');
	e.preventDefault();
	
	var url = $(".answer-write").attr("action");
	console.log("url : " + url);
	
	var queryString = $(".answer-write").serialize();
	console.log("queryString : " + queryString);
	
	$.ajax({
		type: 'post',
		url: url,
		data: queryString,
		dataType: 'json',
		error: function() {
			console.log('fail!');
		},
		success: function(data) {
			console.log('data', data);
			if (data.id == null) {
				alert("답변하려면 로그인해야 합니다.");
			} else {
				var answerTemplate = $("#answerTemplate").html();
				var template = answerTemplate.format(data.writer.userId, data.formattedCreateDate, data.contents, data.question.id, data.id);
				$(".qna-comment-slipp-articles").prepend(template);
				$("textarea[name=contents]").val("");
			}
		}
	});
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};