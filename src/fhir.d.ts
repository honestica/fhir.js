/// <reference types="fhir" />

export = fhirClient;

declare function fhirClient(cfg: any, adapter: any): fhirClient.FhirClient;

declare namespace fhirClient {
  export type ClientFn = (...args: any[]) => Promise<{ data: any }>
  export type ResourceName = 'DomainResource' | 'Organization' | 'Location' | 'HealthcareService' | 'Practitioner' | 'PractitionerRole' | 'Patient' | 'RelatedPerson' | 'Device' | 'Account' | 'AllergyIntolerance' | 'Schedule' | 'Slot' | 'Appointment' | 'AppointmentResponse' | 'AuditEvent' | 'Basic' | 'BodySite' | 'Substance' | 'Medication' | 'Group' | 'Specimen' | 'DeviceComponent' | 'DeviceMetric' | 'ValueSet' | 'Questionnaire' | 'QuestionnaireResponse' | 'Observation' | 'FamilyMemberHistory' | 'DocumentReference' | 'DiagnosticOrder' | 'ProcedureRequest' | 'ReferralRequest' | 'Procedure' | 'ImagingStudy' | 'ImagingObjectSelection' | 'Media' | 'DiagnosticReport' | 'CommunicationRequest' | 'DeviceUseRequest' | 'MedicationOrder' | 'NutritionOrder' | 'Order' | 'ProcessRequest' | 'SupplyRequest' | 'VisionPrescription' | 'ClinicalImpression' | 'Condition' | 'EpisodeOfCare' | 'Encounter' | 'MedicationStatement' | 'RiskAssessment' | 'Goal' | 'CarePlan' | 'Composition' | 'Contract' | 'Coverage' | 'ClaimResponse' | 'Claim' | 'Communication' | 'StructureDefinition' | 'ConceptMap' | 'OperationDefinition' | 'Conformance' | 'DataElement' | 'DetectedIssue' | 'DeviceUseStatement' | 'DocumentManifest' | 'EligibilityRequest' | 'EligibilityResponse' | 'EnrollmentRequest' | 'EnrollmentResponse' | 'ExplanationOfBenefit' | 'Flag' | 'Immunization' | 'ImmunizationRecommendation' | 'ImplementationGuide' | 'List' | 'MedicationAdministration' | 'MedicationDispense' | 'OperationOutcome' | 'MessageHeader' | 'NamingSystem' | 'OrderResponse' | 'PaymentNotice' | 'PaymentReconciliation' | 'Person' | 'ProcessResponse' | 'Provenance' | 'SearchParameter' | 'Subscription' | 'SupplyDelivery' | 'TestScript' | 'Binary' | 'Bundle' | 'Parameters';
  export interface QueryOptions {
    $include?: { [key: string]: string | string[] },
    [key: string]: any
  }

  function Create<T extends fhir.DomainResource>(content: { resource: T }): Promise<{ data: T }>
  function Create(content: { type: 'Binary', data: Buffer }): Promise<{ data: fhir.Binary }>
  function Create<T extends fhir.DomainResource>(content: { type: ResourceName, data: T }): Promise<{ data: T }>

  function Read<T extends fhir.DomainResource>(content: { type: ResourceName, id: string }): Promise<{ data: T }>

  type Operation = { op: 'replace' | 'add' , path: string, value: string | object } | { op : 'remove', path: string }

  function Patch(content: { type: ResourceName, id: string, data: Array<Operation> }): Promise<{ data: fhir.OperationOutcome }>

  function Update<T extends fhir.DomainResource>(content: { resource: T }): Promise<{ data: T }>

  function ConditionalUpdate<T extends fhir.DomainResource>(content: { type: ResourceName, count?: number, query?: QueryOptions, data: T }): Promise<{ data: T }>

  function ConditionalCreate<T extends fhir.DomainResource>(content: { type: ResourceName, query: QueryOptions, resource: T }): Promise<{ data: T, status: number }>

  function Search(content: { type: ResourceName, count?: number, query?: QueryOptions }): Promise<{ data: fhir.Bundle }>

  function NextPage(content: { type: ResourceName, bundle: fhir.Bundle }): Promise<{ data: fhir.Bundle }>;

  export interface FhirClient {
    conformance: ClientFn
    document: ClientFn
    profile: ClientFn
    transaction: ClientFn
    history: ClientFn
    typeHistory: ClientFn
    resourceHistory: ClientFn
    read: typeof Read
    vread: ClientFn
    delete: ClientFn
    expunge: ClientFn
    serverExpunge: ClientFn
    create: typeof Create
    validate: ClientFn
    search: typeof Search
    update: typeof Update
    nextPage: typeof NextPage
    prevPage: ClientFn
    resolve: ClientFn
    patch: typeof Patch
    conditionalUpdate: typeof ConditionalUpdate
    conditionalCreate: typeof ConditionalCreate
  }
}
