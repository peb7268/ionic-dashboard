
import { Injectable } 					from '@angular/core';
import { Http } 						from '@angular/http';
import 'rxjs/Rx';

//import { App } 					        from './../globals';

@Injectable()
export class DataService {
	public data;
	
	constructor(public http: Http){ console.log('chart service constructed'); }

	fetchData(localData, project_id = null){
		var _data;
		var cache = window.localStorage.getItem('cache_settings');
			cache = (typeof cache !== 'undefined' && cache == 'true') ? true : false;

		if(typeof localData == 'string' && cache == true) {
			console.log('fetching cached data:');
			_data 	= JSON.parse(localData);

			return _data;
		} else {
			var observable = this.http.get('http://www.intengoresearch.com/dash/projects/' + project_id).map( (resp) => {
		        return resp.json();
		      }).subscribe(resp => {
		        console.log('Observable setting data: Project specific data came back: ');

		        this.data = resp;
		        window.localStorage.setItem('project_data', JSON.stringify(resp));
		        window['App'].loading.dismiss();
		    });
		}
	}

	/* Cached project matches project being fetched */
	isCurrentProject(projectId, newProjectId){
		return (projectId === newProjectId);
	}

	studiesDidChange(project_id, data = null){
		var _data 	= this.fetchData(window.localStorage.getItem('project_data')); 
		var data 	= (data !== null) ? data : _data;

		return (project_id !== data.survey.id);
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
}