<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		if (navigator.userAgent.match(/msie/i)) {
			$('#iebrowsers').show();
			$('#allbrowsers').hide();
		} else {
			$('#iebrowsers').hide();
			$('#allbrowsers').show();
		}
	});
</script>