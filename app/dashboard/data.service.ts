
import { Injectable, Inject }			from '@angular/core';
import { Http } 						from '@angular/http';

import { HttpMock }						from './../mocks';

import { Alert }						from 'ionic-angular';

import { Observable } 					from 'rxjs/Observable';
import { BehaviorSubject } 				from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { SettingsPage }					from '../pages/settings/settings';

//import { App } 					    from './../globals';


@Injectable()
export class DataService {
	public data:any;
	public dataSubject:any;
	public charts 		 = {};
	public instances:any = {};
	public SettingsPage; 

	constructor(public  http: Http){
		window['App'].instances.dataService  = this;
		this.SettingsPage 	= SettingsPage;
		this.dataSubject 	= new BehaviorSubject(this.data);
	}

	fetchData(localData, project_id = null){
		var useCachedData = this.useCachedData(localData);

		if(this.dataFetchInProgress()){
			window['App'].instances.dashboard.dismissLoader(500);
			return this.dataSubject.asObservable();
		}

		if(useCachedData) {
			var data  = JSON.parse(localData);
			this.dataSubject.next(data);

			return this.dataSubject.asObservable();
		} else {
			window['App'].activeRequests++;

			return this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id)
		   .map(resp => resp.json())
		   .catch(this.catchError);
		}
	}

	catchError(error){
		console.log('DataService Error Caught: ');
		var errMsg = 'Error ' + error.status + ' ' + error.statusText;
		console.error(errMsg);

		window['App'].confirm = Alert.create({
			'title' : 'Oops!',
			'message': 'Looks like there was an error loading your project.',
			'buttons': [
				{
					text: 'Retry',
					handler: () => {
						console.log('Try the request again');
					}
				},
				{
					text: 'Select Another',
					handler: () => {
						console.log('Returning to the settings screen.');
						window['App'].confirm.dismiss().then( () => {
							var SettingsPage = window['App'].instances.dataService.SettingsPage;
							window['App'].instances.dashboard.nav.push(SettingsPage);
						})
					}
				}
			]
		});

		window['App'].instances.dashboard.dismissLoader(250);
		window['App'].instances.dashboard.nav.present(window['App'].confirm);				

		return Observable.throw(errMsg);
	}

	dataFetchInProgress(){
		return window['App'].activeRequests > 0;
	}

	//Change this to just store. Obviously its storing data
	//Adapt it to store / stringify all types of data
	storeData(data, persist?){
        if(typeof persist == 'undefined' || persist == true) window.localStorage.setItem('project_data', JSON.stringify(data));
        
        this.data = data;
        return data;
	}

	delegateData(project_id, data){        
        var _shouldStoreData = this.shouldStoreData(data, project_id);
	    //console.log('Should Store Data?: ' + _shouldStoreData);

	    data = this.storeData(data);
		
		//console.log('DataService:delegateData');	    

    	return data;
	}

	//TODO: Combine isCurrentProject and studiesDidChange. Seem redundant
	/* Cached project matches project being fetched */
	isCurrentProject(projectId, newProjectId){
		return (projectId === newProjectId);
	}

	studiesDidChange(project_id, data?){
		// && window['App'].activeRequests == 0
		if(data === null) return true;

		return (project_id !== data.survey.id);
	}

	shouldStoreData(data, project_id){
		return (this.dataIsValid(data) && this.isCurrentProject(project_id, data.survey.id));
	}

	//TODO: make a retrieval mechanism where data is returned and validity is checked.
	/* Confirms data from local storage is an acutal response object */
	dataIsValid(data){
		return (typeof data == 'object' && data !== null);
	}

	useCachedData(data, cache?){
		var cache = (typeof cache == 'undefined') ? window.localStorage.getItem('cache_settings') : cache;
		cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;

		var use_cached = (data !== null && typeof data == 'string' && cache == true);

		return use_cached;
	}

	getData(returnCached?){
		if(returnCached !== 'undefined' && returnCached == true){
			var _data = window.localStorage.getItem('project_data');
			_data = (typeof _data == 'string') ? JSON.parse(_data) : null;
		
			return _data;
		}
		
		return this.data;
	}

	getProjectId(data = null){
		return (this.dataIsValid(data)) ? data.id : window.localStorage.getItem('project_id');
	}

	pushChart(chartType, data, chart){
		var chart_id = chartType + '-' + data.survey.id;
		this.charts[chart_id] = chart;
	}

	removeCharts(){
		for(var chartName in this.charts){
			var chart = this.charts[chartName];
			chart.detach();
			chart.container.remove();
		}
		this.charts = {};
	}

	reloadCharts(){
		window['App'].instances.dashboard.init();
	}

	getChartCount(charts){
	    var chartCount = 0;
	    for(var name in charts){
	        if(name.indexOf('netattraction') > -1) chartCount++;
	    }

	    return chartCount;
	}
}