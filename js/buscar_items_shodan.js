$(document).ready(() => {

	$("#btn-filtrar").click(() => {

		var input = $("#filtro").val();

		fetch('https://api.shodan.io/shodan/host/search?key=API_KEY&query={'+input+'}')
	    .then(data => data.json())
	    .then(data => {

	        var matches = data.matches;
	        //console.log(matches);

	        for (var i = 0; i < matches.length; i++) {
	        	console.log(i, "IP: "+ matches[i].ip_str + "  Pais: " + matches[i].location.country_name 
	        		+ "  Producto: " + matches[i].product);
	        }

	        colocarElementosEnTablaHTML(matches);

	    });
	});
	
    

});


// https://api.shodan.io/shodan/host/search?key={YOUR_API_KEY}&query={query}&facets={facets}

function colocarElementosEnTablaHTML (elementos) {
	var tabla = $("#tabla");

	for (var i = 0; i < elementos.length; i++) {
		
		var tr = document.createElement("tr");
		var ip = document.createElement("td");
		var pais = document.createElement("td");
		var producto = document.createElement("td");

		ip.innerHTML = elementos[i].ip_str;
		pais.innerHTML = elementos[i].location.country_name;
		producto.innerHTML = elementos[i].product;

		tr.append(ip);
		tr.append(pais);
		tr.append(producto);

		if((i%2) == 0)
		{
			tr.style.background = 'grey';
		}

		tabla.append(tr);
	}
}