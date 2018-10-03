/*
if (!Array.prototype.empty) {
	Object.defineProperty(Array.prototype, 'empty', function() {
		return this.length === 0;
	});
}

Object.defineProperty(Array.prototype, 'duplicates', function() {
	return this.reduce(function(dups, el, i, arr) {
		if (arr.indexOf(el) !== i && dups.indexOf(el) === -1) {
			dups.push(el);
		}
		return dups;
	}, []);
});
*/
