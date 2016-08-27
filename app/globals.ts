export interface Window { App: any; }
export interface AppInterface {
	loading: any;
	instances: any;
}

export class App implements AppInterface {
	public loading: any;
	public instances: any;

	constructor(){
		this.loading 	= 'nothing';
		this.instances 	= {};
	}
}