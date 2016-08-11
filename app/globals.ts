export interface Window { App: any; }
export interface AppInterface {
	loading: any;
}

export class App implements AppInterface {
	public loading: any;

	constructor(){
		this.loading = 'nothing';
	}
}