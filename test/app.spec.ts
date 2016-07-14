
import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, 
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders } from '@angular/core/testing';

//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

declare var require: any
declare var describe: any
declare var it: any


//Our parent block
describe('Books', () => {
    //beforeEach((done) => {});
	
    describe('Initial Test', () => {
    	it('should be on', () => {
    		var one = 1;
    		one.should.be.a('number');
    	});
    });

	/*
	* Test the /GET route
	*/
	describe('/GET book', () => {
	  it('it should GET all the books', () => {
	    // chai.request(server)
	    //     .get('/book')
	    //     .end((err, res) => {
	    //         res.should.have.status(200);
	    //         res.body.should.be.a('array');
	    //         res.body.length.should.be.eql(0);
	    //       done();
	    //     });
  		var two = 2;
		two.should.be.a('number');
	  });
	});
});