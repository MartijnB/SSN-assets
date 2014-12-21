<?php

$fileIterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator("data", FilesystemIterator::SKIP_DOTS));

foreach($fileIterator as $path => $fi) {
	run_testcase($path);
}

function run_testcase($testcasePath) {
	$headers = array();
	$content = '';

	$handle = fopen($testcasePath, "r");
	if ($handle) {
		while (($line = fgets($handle, 1024*1024)) !== false) {
			$line = trim($line);

			if (strlen($line) == 0)
				break;

			if (strpos($line, "=") !== false) {
				list($header, $value) = explode("=", $line, 2);

				$headers[$header] = $value;
			}
			else {
				$headers[$line] = "";
			}
		}

		$content = fread($handle, 10 * 1024 * 1024);

		fclose($handle);

		$requestUrl = "/Shibboleth.sso";
		if (isset($headers["REQUEST_URI"])) {
			$requestUrl = $headers["REQUEST_URI"];

			if ($requestUrl[0] == "/") {
				$requestUrl = substr($requestUrl, 1);
			}

			unset($headers["REQUEST_URI"]);
		}

		if (isset($headers["CONTENT_TYPE"])) {
			$headers["Content-type"] = $headers["CONTENT_TYPE"];

			unset($headers["CONTENT_TYPE"]);
		}
		else {
			$headers["Content-type"] = "text/xml";
		}

		$curlHeaders = array(
            "POST ".$requestUrl." HTTP/1.0",
            "Cache-Control: no-cache",
            "Pragma: no-cache",
            "Content-length: ".strlen($content),
        ); 

        foreach ($headers as $key => $value) {
        	$curlHeaders[] =  $key . ': ' . $value;
        }


		$ch = curl_init(); 

		curl_setopt($ch, CURLOPT_URL, "http://127.0.0.1/" . $requestUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 6);
        
		curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content); 
        curl_setopt($ch, CURLOPT_HTTPHEADER, $curlHeaders);

        //	var_dump($curlHeaders);

		$data = curl_exec($ch);

        if (curl_errno($ch)) {
            print "Error: " . curl_error($ch) . PHP_EOL;
        } else {
            //var_dump($data);
            curl_close($ch);
        } 
	}

	//echo $requestUrl . PHP_EOL;

	//var_dump($headers, $content);
}