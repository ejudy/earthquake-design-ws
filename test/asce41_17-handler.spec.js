/* global afterEach, beforeEach, describe, it */
'use strict';


const ASCE41_17Handler = require('../src/lib/asce41_17-handler'),
    expect = require('chai').expect,
    sinon = require('sinon');

const _RESULT = {
  data: [],
  metadata: {}
};

const _FACTORY = {
  destroy: () => {
    // Nothing to do here
  },
  get: () => {
    return Promise.resolve({data:[],metadata:{}});
  }
};


describe('asce41_17-handler', () => {
  describe('constructor', () => {
    it('is defined', () => {
      expect(typeof ASCE41_17Handler).to.equal('function');
    });

    it('can be instantiated', () => {
      expect(ASCE41_17Handler).to.not.throw(Error);
    });

    it('can be destroyed', () => {
      let handler;

      handler = ASCE41_17Handler();
      expect(handler.destroy).to.not.throw(Error);
    });
  });

  describe('checkParams', () => {
    let handler;

    afterEach(() => {
      handler.destroy();
    });

    beforeEach(() => {
      handler = ASCE41_17Handler({factory: _FACTORY});
    });

    it('returns error if parameters are missing', (done) => {
      handler.checkParams({}).then(() => {
        return new Error('checkParams passed erroneously');
      }).catch((err) => {
        expect(err).to.be.an.instanceof(Error);
        expect(err.status).to.equal(400);
      }).then(done);
    });
  });

  describe('get', () => {
    let handler;

    afterEach(() => {
      handler.destroy();
    });

    beforeEach(() => {
      handler = ASCE41_17Handler({factory: _FACTORY});
    });

    it('returns an object with data', (done) => {
      sinon.stub(handler, 'checkParams').callsFake(() => {
        return Promise.resolve({});
      });

      handler.get({}).then((params) => {
        expect(params).to.deep.equal(_RESULT);
      }).catch((err) => {
        return err;
      }).then(done);

      handler.checkParams.restore();
    });
  });
});