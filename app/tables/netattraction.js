"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var data_service_1 = require('../dashboard/data.service');
var mocks_1 = require('../mocks');
//TODO: Figure out how to pass the data better using an observable and an event emitter
var Netattraction = (function () {
    function Netattraction(dataService) {
        this.dataService = dataService;
        this.data = {
            concepts: []
        };
        this.netattraction = {};
        this.data = this.dataService.getData(true);
    }
    //Fires on init
    Netattraction.prototype.ngOnInit = function () { };
    Netattraction.prototype.ngOnChanges = function (changes) {
        if (typeof this.data == 'undefined')
            return;
        if (this.data !== null && typeof this.data == 'object') {
            this.data = this.data;
        }
    };
    Netattraction.prototype.getConceptId = function (idx, concept) {
        return concept.id;
    };
    Netattraction = __decorate([
        core_1.Component({
            selector: 'netattraction',
            templateUrl: "build/tables/netattraction.html",
            providers: [
                mocks_1.MockDataService,
                data_service_1.DataService,
                mocks_1.HttpMock
            ],
            inputs: ['data']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], Netattraction);
    return Netattraction;
}());
exports.Netattraction = Netattraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0YXR0cmFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldGF0dHJhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHFCQUErQyxlQUFlLENBQUMsQ0FBQTtBQUcvRCw2QkFBeUQsMkJBQ3pELENBQUMsQ0FEbUY7QUFDcEYsc0JBQXlELFVBQVUsQ0FBQyxDQUFBO0FBRXBFLHVGQUF1RjtBQVl2RjtJQU1FLHVCQUFtQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxwQyxTQUFJLEdBQU87WUFDakIsUUFBUSxFQUFFLEVBQUU7U0FDWixDQUFDO1FBQ0ssa0JBQWEsR0FBTyxFQUFFLENBQUM7UUFHN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZUFBZTtJQUNmLGdDQUFRLEdBQVIsY0FBVyxDQUFDO0lBQ1osbUNBQVcsR0FBWCxVQUFZLE9BQVc7UUFDdEIsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUUzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUEsQ0FBQztZQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQztJQUNGLENBQUM7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsR0FBRyxFQUFFLE9BQU87UUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQWpDSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRTtnQkFDVCx1QkFBZTtnQkFDZiwwQkFBVztnQkFDWCxnQkFBUTthQUNUO1lBQ0QsTUFBTSxFQUFJLENBQUMsTUFBTSxDQUFDO1NBQ25CLENBQUM7O3FCQUFBO0lBeUJGLG9CQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxxQkFBYSxnQkF1QnpCLENBQUEifQ==