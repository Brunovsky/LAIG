if (!Array.prototype.empty) {
	Array.prototype.empty = function() {
		return this.length === 0;
	}
}

Array.prototype.duplicates = function() {
	return this.reduce(function(dups, el, i, arr) {
		if (arr.indexOf(el) !== i && dups.indexOf(el) === -1) {
			dups.push(el);
		}
		return dups;
	}, []);
}