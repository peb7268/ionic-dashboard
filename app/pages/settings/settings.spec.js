"use strict";
var ionic_angular_1 = require('ionic-angular');
var settings_1 = require('./settings');
var testing_1 = require('@angular/core/testing');
var mocks_1 = require('./../../mocks');
var settingsPage;
var tcb;
//Our parent block
describe('SettingsPage', function () {
    beforeEach(function () {
        testing_1.addProviders([
            { provide: ionic_angular_1.Platform,
                useClass: mocks_1.MockClass
            },
            { provide: ionic_angular_1.NavController,
                useClass: mocks_1.NavMock
            },
        ]);
    });
    describe('Component Creation', function () {
        it('Should render the settings page', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            tcb.createAsync(settings_1.SettingsPage).then(function (fixture) {
                settingsPage = fixture.componentInstance;
                var element = fixture.nativeElement;
                var target = element.querySelectorAll('.dashboard');
                var text = target[0].innerText.toLowerCase();
                //fixture.detectChanges(); //trigger change detection
                expect(text).toBe('dash settings');
            })
                .catch(function (e) { return console.log(e.stack); });
        }));
        it('Should have default values', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
            tcb = builder;
            tcb.createAsync(settings_1.SettingsPage).then(function (fixture) {
                settingsPage = fixture.componentInstance;
                var element = fixture.nativeElement;
                expect(settingsPage.project_id).toBe(0);
            })
                .catch(function (e) { return console.log(e.stack); });
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Muc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLDhCQUFrRCxlQUFlLENBQUMsQ0FBQTtBQUtsRSx5QkFBa0QsWUFBWSxDQUFDLENBQUE7QUFLL0Qsd0JBRWtELHVCQUF1QixDQUFDLENBQUE7QUFFMUUsc0JBQWtELGVBQWUsQ0FBQyxDQUFBO0FBRWxFLElBQUksWUFBZ0IsQ0FBQztBQUNyQixJQUFJLEdBQUcsQ0FBQztBQUVSLGtCQUFrQjtBQUNsQixRQUFRLENBQUMsY0FBYyxFQUFFO0lBQ3JCLFVBQVUsQ0FBQztRQUNQLHNCQUFZLENBQUM7WUFDVCxFQUFFLE9BQU8sRUFBRSx3QkFBUTtnQkFDakIsUUFBUSxFQUFFLGlCQUFTO2FBQ3BCO1lBQ0QsRUFBRSxPQUFPLEVBQUUsNkJBQWE7Z0JBQ3RCLFFBQVEsRUFBRSxlQUFPO2FBQ2xCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDM0IsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLGdCQUFNLENBQUMsQ0FBQyw4QkFBb0IsQ0FBQyxFQUFFLFVBQUMsT0FBTztZQUMxRSxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQ2QsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztnQkFDckMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxPQUFPLEdBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFDckMsSUFBSSxNQUFNLEdBQUssT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUV0RCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUU3QyxxREFBcUQ7Z0JBRXJELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxnQkFBTSxDQUFDLENBQUMsOEJBQW9CLENBQUMsRUFBRSxVQUFDLE9BQU87WUFDckUsR0FBRyxHQUFHLE9BQU8sQ0FBQztZQUNkLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87Z0JBQ3JDLFlBQVksR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pDLElBQUksT0FBTyxHQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUM7Z0JBRXJDLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFDIn0=