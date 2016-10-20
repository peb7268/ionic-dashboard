
import { Injectable, Inject }			from '@angular/core';
import { Http } 						from '@angular/http';

import { HttpMock }						from './../mocks';

import { Loading, 
		 Alert, 
		 App 
	   }								from 'ionic-angular';

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
	public SettingsPage;
	public nav;
	public loading;
	public endpoint;

	constructor(public  http: Http, private app: App){
		console.log('DataService:constructor');

		this.nav 			= app.getActiveNav();
		window['App'].instances.dataService  = this;

		this.dataSubject 	= new BehaviorSubject(this.data);

		this.loading 		= this.createLoader();

		var endpoint 		= window.localStorage.getItem('endpoint');
		this.endpoint 		= (endpoint !== null && typeof endpoint !== 'undefined') ? JSON.parse(endpoint) : 'http://intengodev.com';
	}

	fetchData(localData, project_id = null){
		var useCachedData = this.useCachedData(localData);
		
		if(this.dataFetchInProgress()){
			console.log('dataService:fetchData fetch in progress');
			this.dismissLoader(500);
			return this.dataSubject.asObservable();
		}

		if(useCachedData) {
			console.log('dataService:fetchData using cached data')
			var data  = JSON.parse(localData);
			this.dataSubject.next(data);

			window.localStorage.setItem('loaded', 'true');
			return this.dataSubject.asObservable();
		} else {
			console.log('dataService:fetchData getting data from source');
			window['App'].activeRequests++;
			window.localStorage.setItem('loaded', 'true');
			
			return this.http.get(this.endpoint + '/dash/projects/' + project_id)
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
							console.log('fix this');
						})
					}
				}
			]
		});

		window['App'].instances.dashboard.dataService.dismissLoader(250);
		window['App'].instances.dashboard.nav.present(window['App'].confirm);				

		return Observable.throw(errMsg);
	}

	dataFetchInProgress(){
		return window['App'].activeRequests > 0;
	}

	createLoader(){
		return Loading.create({
	      content: "Loading...",
	      duration: 0,
	      dismissOnPageChange: false
		});
	}

	presentLoader(App){
		console.log('presenting loader');
		var nav = (typeof this.nav.present !== 'undefined') ? this.nav : this.nav.parent;

		if(this.loading.state !== '') {
			this.loading = this.createLoader();
		} 

	  	var promise = nav.present(this.loading);
	  	return promise;
	}

	dismissLoader(timer){
	    console.log('dataService:dismissLoader');
	    var promise = this.loading.dismiss();
	    promise.then(() => {
	    	window.setTimeout(function(){
	    	  let loader = document.querySelectorAll('.loading-cmp')[0];
	    	  if(typeof loader !== 'undefined' && loader !== null) loader.remove();

		      window.dispatchEvent(new Event('resize'));
		      this.loading = null;	

		      if(window['App'].activeRequests > 0) window['App'].activeRequests--;
		    }, timer);
	    });
 	}

	//Change this to just store. Obviously its storing data
	//Adapt it to store / stringify all types of data
	storeData(data, persist?){
        if(typeof persist == 'undefined' || persist == true) window.localStorage.setItem('project_data', JSON.stringify(data));
        
        this.data = data;
        return data;
	}

	resetData(){
		console.log('resetting data');
		
		delete this.data;
		this.data = null;

		window.localStorage.clear();
	}

	delegateData(project_id, data){        
        var _shouldStoreData = this.shouldStoreData(data, project_id);
	    console.log('Should Store Data?: ' + _shouldStoreData);

	    data = this.storeData(data);
		
		console.log('DataService:delegateData');	    
		
		this.data = data;

    	return data;
	}

	//TODO: Combine isCurrentProject and studiesDidChange. Seem redundant
	/* Cached project matches project being fetched */
	isCurrentProject(projectId, newProjectId){
		return (projectId === newProjectId);
	}

	studiesDidChange(project_id, data?){
		// && window['App'].activeRequests == 0
		
		var previouslyLoaded = window.localStorage.getItem('loaded');
		if(previouslyLoaded == null) return false;
		
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
		var cache   = (typeof cache == 'undefined') ? window.localStorage.getItem('cache_data') : cache;
		cache 		= (typeof cache !== 'undefined' && cache == 'true') ? true : false;

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
		console.log('removing the charts', this.charts);
		for(var chartName in this.charts){
			var chart = this.charts[chartName];
			chart.detach();
			chart.container.remove();
		}
		this.charts = {};
	}

	reloadCharts(){
		console.log('reloading the charts');
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