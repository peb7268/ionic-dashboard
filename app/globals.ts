export interface Window { App: any; }
export interface AppInterface {
	loading: any;
}

export class App implements AppInterface {
	public loading: any;

	constructor(){
		console.log('making an App');
		this.loading = 'nothing';
	}
}