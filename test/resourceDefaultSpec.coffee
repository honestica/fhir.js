resourceDefault = require('../src/middlewares/resourceDefault')
assert = require('assert')


exampleResourceDefault = {
  CommunicationRequest: {
    recipient: [ ],
    medium: [ ],
  }
}

describe "resourceDefault", ->
  it "resourceDefault", ->
    assert.deepEqual(resourceDefault.applyDefaultResourceToResponse(exampleResourceDefault)({ data: { id: '123', resourceType: 'CommunicationRequest', recipient: [ { reference: 'Practitioner/124'} ]}}), { data: { id: '123', resourceType: 'CommunicationRequest', recipient: [ { reference: 'Practitioner/124'} ], medium: [ ]} })
