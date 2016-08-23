
import { Injectable } 					from '@angular/core';
import { Http } 						from '@angular/http';

//import { Observable } 					from 'rxjs/Observable';
//import { Subject } 						from 'rxjs/Subject';
//import 'rxjs/rx';


//import { App } 					    from './../globals';


@Injectable()
export class DataService {
	public data;
	public charts 		 = {};
	public instances:any = {}; 

	constructor(public http: Http){}

	fetchData(localData, project_id = null, callback?){
		var cache = window.localStorage.getItem('cache_settings');
			cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;

		if(localData !== null && typeof localData == 'string' && cache == true) {
			console.log('fetching cached data:');
			this.data = JSON.parse(localData);

		} else {
			var observable = this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id).map( (data) => {
		        return data.json();
		      }).subscribe(data => {
		        console.log('Observable setting data: Project specific data came back with: ', data);

		        window.localStorage.setItem('project_data', JSON.stringify(data));
		        window['App'].loading.dismiss();

		        this.data = data;
		        if(typeof callback !== 'undefined') callback();
		    });
		}

		return this.data;
	}

	/* Cached project matches project being fetched */
	isCurrentProject(projectId, newProjectId){
		return (projectId === newProjectId);
	}

	studiesDidChange(project_id, data = null){
		var _data 	= this.fetchData(window.localStorage.getItem('project_data'), project_id); 
		var data 	= (data !== null) ? data : _data;

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
		this.instances.Dashboard.initializeDashboard();
	}
}