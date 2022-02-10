export interface User {
  authKey: string;
  enabled: number;
  id: number;
  name: string;
  type: number;
  profile: {
    birthday: string | null;
    createTime: string;
    deleted: number;
    email: string;
    enabled: number;
    id: number;
    name: string;
    patronymic: string;
    phone: string;
    sex: string | null;
    surname: string;
    type: number;
    updateTime: string;
    username: string;
  };
}

export type FieldError = { [key: string]: string };

export interface Task {
  assigneeId: number | string | null;
  assignee?: any;
  authorId: number | string | null;
  author?: any;
  priorityId: number | string | null;
  priority?: any;
  comment: string;
  created?: string;
  updated?: string;
  id: number;
  personId: number | string | null;
  person?: any;
  startTime: string | null;
  endTime: string | null;
  statusId: number | null;
  status?: any;
  title: string;
}

export interface VisitType {
  id: number;
  name: string;
}

export interface VisitStatus {
  id: number;
  name: string;
}

export interface TaskStatus {
  closeStatus: number;
  deleted: number;
  id: number;
  newStatus: number;
  order: number;
  projectId: number | null;
  title: string;
}

export interface CommonPriority {
  id: number;
  name: string;
}

export interface RelationDegree {
  id: number;
  name: string;
}

export interface VisitPlace {
  address: string;
  id: number;
  name: string;
  parentId: number | string | null;
  phone: string;
}

export interface OperationType {
  id: number;
  name: string;
}

export interface Clinic {
  address: string;
  id: number;
  name: string;
  parentId: string | number | null;
  phone: string;
}

export interface PatientSource {
  id: number;
  name: string;
}

export interface PatientTag {
  id: number;
  name: string;
  frequency: number;
}

export interface Diagnosis {
  id: number;
  name: string;
}

export interface MKB {
  code: string;
  id: number;
  name: string;
  parentCode: string;
}

export interface City {
  area: string;
  countryId: number;
  country?: { id: number; name: string };
  id: number;
  name: string;
  region: string;
}

export interface Pagination {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
}

export type TFilterDropdownProps = {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
};

// TODO
export type Patient = any;

export type LoginRequestBodyOptions =
  | { status: 'ok'; user?: User }
  | { status: 'error'; errors: FieldError };

export type SortParams = {
  sortBy: string | null;
  order: 'asc' | 'desc' | null;
};

export type SearchParam = {
  searchBy: string;
  searchTerm: string | null;
};

export type SearchParams = {
  [searchBy: string]: string | null;
};
