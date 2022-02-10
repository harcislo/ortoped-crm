export enum ROUTE_NAME {
  LOGIN = '/login',
  REGISTER = '/register',

  HOME = '/',
  SETTINGS = '/settings',

  USERS = '/users',
  USER = '/users/:id',

  CRM_DASHBOARD = '/crm_dashboard',

  PATIENTS = '/patients',
  PATIENT = '/patients/:id',
  PARTNERS = '/partners',
  PARTNER = '/partners/:id',
  AGENTS = '/agents',
  AGENT = '/agents/:id',
  VISITS = '/visits',
  VISIT = '/visits/:id',
  TASK = '/tasks/:id',
  TASKS = '/tasks',

  //payment
  PAYMENT = '/payments/:id',
  PAYMENTS = '/payments',
  PAYMENT_NEW = '/payments/new',
  PAYMENT_UPDATE = '/payments/update/:id',

  DIRECTORIES = '/directories',
  CITIES = '/directories/cities',
  MKB10 = '/directories/mkb10',
  VISIT_TYPES = '/directories/visit-types',
  VISIT_STATUSES = '/directories/visit-statuses',
  TASK_STATUSES = '/directories/task-statuses',
  COMMON_PRIORITIES = '/directories/common-priorities',
  RELATION_DEGREES = '/directories/relation-degrees',
  VISIT_PLACES = '/directories/visit-plases',
  CLINICS = '/directories/clinics',
  PATIENTS_SOURSES = '/directories/patients-sources',
  OPERATION_TYPES = '/directories/operation-types',
  BODY_LOCATIONS = '/directories/body-locations',
  DIAGNOSES = '/directories/diagnoses',
  PATIENT_TAGS = '/directories/patient-tags',

  EVENTS = '/events',

  CALENDAR = '/calendar',

  INCAPACITYSHETS = '/sheets',
  ANALITICS = '/analitics',

  ADD_PATIENT = '/patients/add',
  ADD_TASK = '/tasks/add',
  DIR_CITY = '/directories/city',

  ERROR404 = '/404',
}
