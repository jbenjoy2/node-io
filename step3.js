const fs = require('fs');
const process = require('process');
const axios = require('axios');

function dispOrWrite(data, file) {
	if (file) {
		fs.writeFile(file, data, 'utf8', (err) => {
			if (err) {
				console.error(`Couldn't write ${file}: ${err}`);
				process.exit(1);
			}
		});
	} else {
		console.log(text);
	}
}

function cat(path, file) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		} else {
			dispOrWrite(data, file);
		}
	});
}

async function webCat(url, file) {
	try {
		let response = await axios.get(url);
		dispOrWrite(response.data, file);
	} catch (error) {
		console.error(`Error fetching ${url}: ${error}`);
		process.exit(1);
	}
}

// declare path and file as undefined to start, make function call based on syntax using string slicing to find http, and to determine if --out is present which will determine what path is set to

// The argument should look like this: --out output-filename.txt readfile-or-url.
//                                       2          3                     4

let path;
let file;

if (process.argv[2] === '--out') {
	file = process.argv[3];
	path = process.argv[4];
} else {
	path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
	webCat(path, file);
} else {
	cat(path, file);
}
