import { LocalStorageService } from './localStorage.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Model, Site } from "./model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private appId: string;
    private appCode: string;
	public location: string;
	public localWeather: any;
    public weather: any;
    public model = new Model();

    public getSites() {
        return this.model.items;
    }

    public addItem(newItem) {
        if (newItem != "") {
			this.getWeather(newItem);
		}
    }
	
	public removeItem(item) {
		let items = this.model.items,
			idx = items.indexOf(item);
		items.splice(idx, 1);
		this.localStorageService.removeFromLocalStorage(idx)
	}

    public constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        this.appId = "ndqMEEaoNdK6JSqw3xrc";
        this.appCode = "U0c9noMIejj2fEgdmV9qXA";
        this.weather = [];
		this.localWeather = [];
    }

    public ngOnInit() {
		
		this.localStorageService.getAll().forEach(e => this.model.add(e.city, e.forecast));
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				this.getMyWeather(position.coords);
			});
		} else
			console.error("The browser does not support geolocation...");
	}

    public getWeather(site: any) {
		let req = "https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&name=" +
			site + "&app_id=" + this.appId + "&app_code=" + this.appCode;
		//console.log(req)
		this.http.jsonp(req, "jsonpCallback")
			.pipe(map(result => (<any>result).observations.location))
			.subscribe(result => {
				this.weather = result[0].observation[0];
				let city = this.weather.city,
					forecast = this.weather.description + ' ' +
						this.weather.lowTemperature.slice(0, -3) + ' - ' +
						this.weather.highTemperature.slice(0, -3) + '℃.' +
						' Humidity: ' + this.weather.humidity + '%';
				this.model.items.push(new Site(city, forecast));
				this.localStorageService.storeOnLocalStorage(city, forecast);
				
			}, error => {
				console.error(error);
			});
	}

    public getMyWeather(coordinates: any) {
		this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" +
			coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
			.pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
			.subscribe(result => {
				this.localWeather = result.forecast;
				this.location = result.country + ", " + result.state + ", " + result.city;
			}, error => {
				console.error(error);
			});
	}

}