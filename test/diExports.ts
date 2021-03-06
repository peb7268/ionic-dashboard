import { provide, Type }                              from '@angular/core';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { inject, async }                              from '@angular/core/testing';
//import { disableDeprecatedForms, provideForms, FormControl } from '@angular/forms';
import { App, Config, Form, NavController, Platform } from 'ionic-angular';
import { ConfigMock, NavMock }                        from '../app/mocks';
//import { Utils }                                      from '../app/services/utils';
export { TestUtils }                                  from './testUtils';

/*
* disableDeprecatedForms(),
* provideForms(),
* Form,
*/
export let providers: Array<any> = [
  provide(Config, {useClass: ConfigMock}),
  provide(App, {useClass: ConfigMock}),        // required by ClickerList
  provide(NavController, {useClass: NavMock}), // required by ClickerList
  provide(Platform, {useClass: ConfigMock}),   // -> IonicApp
];

export let injectAsyncWrapper: Function = ((callback) => async(inject([TestComponentBuilder], callback)));

export let asyncCallbackFactory: Function = ((component, testSpec, detectChanges, beforeEachFn) => {
  return ((tcb: TestComponentBuilder) => {
    return tcb.createAsync(component)
      .then((fixture: ComponentFixture<Type>) => {
        testSpec.fixture = fixture;
        testSpec.instance = fixture.componentInstance;
        if (detectChanges) fixture.detectChanges();
        if (beforeEachFn) beforeEachFn(testSpec);
      })
      .catch();
  });
});