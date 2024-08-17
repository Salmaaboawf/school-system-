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
  children?: string[];
}

export interface TeacherType extends BaseUserType {
  age: number;
  subject: string;
}

export interface StudentType extends BaseUserType {
  id?: string;
  class: string;
  age: number;
  address: string;
  parent: string;
}
