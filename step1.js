const fs = require('fs');
const process = require('process');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		} else {
			console.log(data);
		}
	});
}

// call function using process.argv, remembering that the first 2 elements are the path to the script and the path to node
cat(process.argv[2]);
