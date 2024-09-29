export interface BaseUserType {
  id: string;
  name: string;
  email: string;
  password?: string;
  gender: string;
  phoneNumber: string;
  role?: string;
  photoURL?: string;
}

export interface ParentType extends BaseUserType {
  photofile: any;
  address: string;
  children?: StudentType[];
  religion: string;
}

export interface TeacherType extends BaseUserType {
  subjects: SubjectType[];
  age: string;
  subject: string;
  levels: { id: string; name: string }[];
  description: string;
}

export interface StudentType extends BaseUserType {
  photofile: any;
  class: string;
  age: number;
  address: string;
  parent: string;
  religion: string;
}

export type SubjectType = {
  subject_id(subject_id: string): unknown;
  teacher_id: string;
  id: string;
  name: string;
  level_id: string;
  teacher: string;
};

// schedule type

interface Subject {
  teacher_name: string;
  subject_name: string;
  id: string;
  order: string;
  subject_id: string;
  teacher_id: string;
}

interface Day {
  dayName: string;
  subjects: Subject[];
}

export interface Schedule {
  level_id: string;
  level_name: string;
  days: Day[];
}
