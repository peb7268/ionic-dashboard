
export class ChartService {
	constructor(){ console.log('chart service constructed'); }

	fetchData(localData){
		var _data;
		var cache = window.localStorage.getItem('cache_settings');
			cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;

		if(typeof localData == 'string' && cache == true) {
			console.log('fetching data cache');
			_data 	= JSON.parse(localData);
			return _data;
		} else {
			console.log('fetching data');
			//fetch data
		}
	}
}