/// <reference types="fhir" />



export = fhirClient;

declare function fhirClient(cfg: any, adapter: any): fhirClient.FhirClient;

declare namespace fhirClient {
    type ClientFn = (...args:any[]) => Promise<any>
    type ResourceName = ('DomainResource'|'Organization'|'Location'|'HealthcareService'|'Practitioner'|'Patient'|'RelatedPerson'|'Device'|'Account'|'AllergyIntolerance'|'Schedule'|'Slot'|'Appointment'|'AppointmentResponse'|'AuditEvent'|'Basic'|'BodySite'|'Substance'|'Medication'|'Group'|'Specimen'|'DeviceComponent'|'DeviceMetric'|'ValueSet'|'Questionnaire'|'QuestionnaireResponse'|'Observation'|'FamilyMemberHistory'|'DocumentReference'|'DiagnosticOrder'|'ProcedureRequest'|'ReferralRequest'|'Procedure'|'ImagingStudy'|'ImagingObjectSelection'|'Media'|'DiagnosticReport'|'CommunicationRequest'|'DeviceUseRequest'|'MedicationOrder'|'NutritionOrder'|'Order'|'ProcessRequest'|'SupplyRequest'|'VisionPrescription'|'ClinicalImpression'|'Condition'|'EpisodeOfCare'|'Encounter'|'MedicationStatement'|'RiskAssessment'|'Goal'|'CarePlan'|'Composition'|'Contract'|'Coverage'|'ClaimResponse'|'Claim'|'Communication'|'StructureDefinition'|'ConceptMap'|'OperationDefinition'|'Conformance'|'DataElement'|'DetectedIssue'|'DeviceUseStatement'|'DocumentManifest'|'EligibilityRequest'|'EligibilityResponse'|'EnrollmentRequest'|'EnrollmentResponse'|'ExplanationOfBenefit'|'Flag'|'Immunization'|'ImmunizationRecommendation'|'ImplementationGuide'|'List'|'MedicationAdministration'|'MedicationDispense'|'OperationOutcome'|'MessageHeader'|'NamingSystem'|'OrderResponse'|'PaymentNotice'|'PaymentReconciliation'|'Person'|'ProcessResponse'|'Provenance'|'SearchParameter'|'Subscription'|'SupplyDelivery'|'TestScript'|'Binary'|'Bundle'|'Parameters');
    
    function Create(content: { resource: fhir.CommunicationRequest }): Promise<fhir.CommunicationRequest>
    function Create(content: { type: 'Binary', data: Buffer }): Promise<fhir.Binary>
    function Create(content: { type: ResourceName, data: any }): Promise<any>
    
    function Patch(content: { type: ResourceName, id: string, data: Array<{ op: 'replace' | 'add' | 'remove', path: string, value: string | object}> }): Promise<fhir.OperationOutcome>
    
    export interface FhirClient {
      conformance: ClientFn
      document: ClientFn
      profile: ClientFn
      transaction: ClientFn
      history: ClientFn
      typeHistory: ClientFn
      resourceHistory: ClientFn
      read: ClientFn
      vread: ClientFn
      delete: ClientFn
      create: typeof Create
      validate: ClientFn
      search: ClientFn
      update: ClientFn
      nextPage: ClientFn
      prevPage: ClientFn
      resolve: ClientFn
      patch: typeof Patch
    }
}
