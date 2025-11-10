export interface Student {
  id: number;
  name: string;
  age: number;
  grade: number; // 0-100
  subjects: string[];
  isActive: boolean;
  email: string;
  avatar: string;
}

export const students: Student[] = [
  {
    id: 1,
    name: "Emma Wilson",
    age: 20,
    grade: 92,
    subjects: ["Mathematics", "Physics", "Computer Science"],
    isActive: true,
    email: "emma.wilson@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: 2,
    name: "Liam Chen",
    age: 19,
    grade: 78,
    subjects: ["Biology", "Chemistry", "Mathematics"],
    isActive: true,
    email: "liam.chen@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    age: 21,
    grade: 88,
    subjects: ["English Literature", "History", "Philosophy", "Mathematics"],
    isActive: false,
    email: "sophia.rodriguez@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
  },
  {
    id: 4,
    name: "Noah Johnson",
    age: 20,
    grade: 95,
    subjects: ["Computer Science", "Mathematics", "Statistics"],
    isActive: true,
    email: "noah.johnson@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    age: 19,
    grade: 65,
    subjects: ["Art", "Music", "Theater"],
    isActive: true,
    email: "olivia.martinez@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
  {
    id: 6,
    name: "Ethan Brown",
    age: 22,
    grade: 71,
    subjects: ["Economics", "Business", "Accounting"],
    isActive: false,
    email: "ethan.brown@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
  },
  {
    id: 7,
    name: "Ava Taylor",
    age: 20,
    grade: 89,
    subjects: ["Psychology", "Sociology", "Anthropology"],
    isActive: true,
    email: "ava.taylor@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
  },
  {
    id: 8,
    name: "Mason Lee",
    age: 19,
    grade: 82,
    subjects: ["Engineering", "Mathematics", "Physics"],
    isActive: true,
    email: "mason.lee@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mason",
  },
];
