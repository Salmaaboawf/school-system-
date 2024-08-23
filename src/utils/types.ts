export interface BaseUserType {
  name: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
  role?: string;
}

export interface ParentType extends BaseUserType {
  address: string;
  children?: StudentType[];
  id?: string;
}

export interface TeacherType extends BaseUserType {
  age: string;
  subject: string;
  levels: { id: string; name: string }[];
}

export interface StudentType extends BaseUserType {
  id?: string;
  class: string;
  age: number;
  address: string;
  parent: string;
}

export type SubjectType = {
  id: string;
  name: string;
  level_id: string;
  teacher: string;
};
