var ConveyThis_Initializer = class{
	
	static init(params){
		// console.log(params);
		if (typeof params.api_key === "undefined" || params.api_key.length == 0){
			alert("ConveyThis Error: Api key is not specified");
			return;
		}

		let query = "api_key="+params.api_key + '&referer=' + btoa(document.location.href);
		if (typeof params.is_shopify !== "undefined")
			query += "&is_shopify="+params.is_shopify;
	
		var xhttp = new XMLHttpRequest();

		xhttp.open( 'GET', 'https://api.conveythis.com/25/website/code/get?'+query, true );

		xhttp.onreadystatechange = function() {

			if( xhttp.readyState == 4 && xhttp.status == 200 ) {
				var meta = document.createElement('meta');

				if( xhttp.responseText ) {
					
					let response = JSON.parse(xhttp.responseText);
					// console.log(response);
					if(response.code) {
						ConveyThis_Initializer.insertCode(response.code);
					}
				}
			}
		}
		xhttp.send(query);
	}

	static insertCode(code){

		let element = document.createElement("div");
		element.innerHTML = code;

		let children = element.childNodes;
		let count = 0
		children.forEach(function(child){
			count = count + 1

			if(child.nodeName.toUpperCase() == "SCRIPT"){
				let tempScript = document.createElement('script');
				if (count = 5){
					child.innerHTML = child.innerHTML.replace(/hide_conveythis_logo: 0,/g, 'hide_conveythis_logo: 1,')
					console.log(child.innerHTML)
				}
				if(child.src){		
					tempScript.src = child.src;
				}else{
					tempScript.innerHTML = child.innerHTML;
				}
				tempScript.type = "text/javascript";
				document.body.appendChild(tempScript); 
			}else{
				//console.log("no Scr");
				if(child.textContent.trim().length > 0 || child.nodeType == 1)
					document.body.appendChild(child); 
			}
		});

	}

};