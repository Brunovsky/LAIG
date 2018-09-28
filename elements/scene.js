class XMLScene extends XMLElement {
	constructor(node) {
		super(node, {root:"ss", axis_length:"ff"});

		this.type = "scene";
		
		if(!this.isValid)
		throw new XMLException(node, "error");
	}

	isValid(){
	
		if(this.data.axis_length > 0 && this.data.root != null)
		return true;
		return false;
	}

}

// Done, needs testing
