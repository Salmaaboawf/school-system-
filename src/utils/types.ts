export interface BaseUserType {
  name: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
}

export interface ParentType extends BaseUserType {
  address: string;
  children?: string[];
}

export interface TeacherType extends BaseUserType {
  age: string;
  subject: string;
}

export interface StudentType extends BaseUserType {
  class: string;
  age: string;
  address: string;
}
