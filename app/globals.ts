export interface Window { App: any; }
export interface AppInterface {
	loading: any;
	instances: any;
	activeRequests: Number;
}

export class App implements AppInterface {
	public loading: any;
	public instances: any;
	public activeRequests: Number;

	constructor(){
		this.loading 		= '';
		this.instances 		= {};
		this.activeRequests = 0;
	}
}