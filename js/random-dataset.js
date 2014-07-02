function getRandomDataset() {
	var dataset = [];
	var range = 10 + Math.random() * 90;
	
	for (var i = 0, len=10+Math.round(Math.random()*10); i < len; i++) {
	  dataset.push(Math.round(Math.random() * range));
	}
	
	return dataset;
}