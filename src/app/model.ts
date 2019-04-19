export class Model {
    items = [];	
    constructor() {}
	public add(city:string, forecast:string) {
		this.items.push(new Site(city, forecast))
	}
}

export class Site {
    constructor(public city:string, public forecast:string) {
    }
}