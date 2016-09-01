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
var dashboard_1 = require('../../dashboard/dashboard');
var HomePage = (function () {
    function HomePage() {
        this.data = {};
        console.log('HomePage:constructor');
    }
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html',
            directives: [dashboard_1.Dashboard],
            inputs: ['data']
        }), 
        __metadata('design:paramtypes', [])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHFCQUFxQyxlQUFlLENBQUMsQ0FBQTtBQUtyRCwwQkFBK0IsMkJBQTJCLENBQUMsQ0FBQTtBQVEzRDtJQUdFO1FBRk8sU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUd2QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDdEMsQ0FBQztJQVhIO1FBQUMsZ0JBQVMsQ0FBQztZQUNWLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsVUFBVSxFQUFFLENBQUMscUJBQVMsQ0FBQztZQUN2QixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDaEIsQ0FBQzs7Z0JBQUE7SUFRRixlQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSxnQkFBUSxXQU1wQixDQUFBIn0=