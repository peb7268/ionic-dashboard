
import { Injectable } 					from '@angular/core';
import { Http } 						from '@angular/http';

import { Observable } 					from 'rxjs/Observable';
import { BehaviorSubject } 				from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';


//import { App } 					    from './../globals';


@Injectable()
export class DataService {
	public data:any;
	public dataSubject:any;
	public charts 		 = {};
	public instances:any = {}; 

	constructor(public http: Http){
		console.log('DataService:constructor');
		window['App'].self  = this;
		this.dataSubject 	= new BehaviorSubject(this.data);
	}

	fetchData(localData, project_id = null, callback?){
		console.log('DataService:fetchData');

		var cache = window.localStorage.getItem('cache_settings');
			cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;

		if(localData !== null && typeof localData == 'string' && cache == true) {
			console.log('DataService:fetchData fetching cached data:');
			var data  = JSON.parse(localData);
			this.dataSubject.next(data);

			return this.dataSubject.asObservable();
		} else {
			console.log('DataService:fetchData fetching data from source');
			return this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id).map(resp => resp.json());
		}
	}

	storeData(data){
		console.log('Observable setting data: Project specific data came back with: ', data);
        window.localStorage.setItem('project_data', JSON.stringify(data));
        
        this.data = data;
        return data;
	}

	delegateData(project_id, data){        
        var _shouldStoreData = this.shouldStoreData(data, project_id);
	    console.log('Should Store Data?: ' + _shouldStoreData);

	    data = this.storeData(data);
		
		console.log('DataService:delegateData');	    

    	return data;
	}

	/* Cached project matches project being fetched */
	isCurrentProject(projectId, newProjectId){
		return (projectId === newProjectId);
	}

	studiesDidChange(project_id, data?){
		if(data === null) return true;

		return (project_id !== data.survey.id);
	}

	shouldStoreData(data, project_id){
		return (this.dataIsValid(data) && this.isCurrentProject(project_id, data.survey.id));
	}

	/* Confirms data from local storage is an acutal response object */
	dataIsValid(data){
		return (typeof data == 'object' && data !== null);
	}

	getData(){
		return this.data;
	}

	getDataCache(){
		var _data = window.localStorage.getItem('project_data');
			_data = (typeof _data == 'string') ? JSON.parse(_data) : null;
		
		return _data;
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
	}

	reloadCharts(){
		window['App'].self.instances.Dashboard.initializeDashboard();
	}
}