export interface BaseUserType {
  name: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
  type?: string;
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
  class: string;
  age: number;
  address: string;
}
