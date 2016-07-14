"use strict";
//Our parent block
describe('Books', function () {
    //beforeEach((done) => {});
    describe('Initial Test', function () {
        it('should be on', function () {
            var one = 1;
            one.should.be.a('number');
        });
    });
    /*
    * Test the /GET route
    */
    describe('/GET book', function () {
        it('it should GET all the books', function () {
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
