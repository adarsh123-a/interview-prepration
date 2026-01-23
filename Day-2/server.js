const employees = [
  {
    id: 1,
    name: "Alice",
    department: "Engineering",
    salary: 120000,
    experience: 5,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Bob",
    department: "Engineering",
    salary: 95000,
    experience: 2,
    rating: 3.9,
  },
  {
    id: 3,
    name: "Charlie",
    department: "Sales",
    salary: 80000,
    experience: 4,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Diana",
    department: "HR",
    salary: 70000,
    experience: 1,
    rating: 3.2,
  },
  {
    id: 5,
    name: "Evan",
    department: "Engineering",
    salary: 135000,
    experience: 7,
    rating: 4.9,
  },
  {
    id: 6,
    name: "Fiona",
    department: "Marketing",
    salary: 90000,
    experience: 3,
    rating: 4.1,
  },
  {
    id: 7,
    name: "George",
    department: "Sales",
    salary: 65000,
    experience: 1,
    rating: 3.5,
  },
  {
    id: 8,
    name: "Hannah",
    department: "Engineering",
    salary: 110000,
    experience: 4,
    rating: 4.6,
  },
  {
    id: 9,
    name: "Ian",
    department: "Marketing",
    salary: 105000,
    experience: 6,
    rating: 4.7,
  },
  {
    id: 10,
    name: "Jenny",
    department: "HR",
    salary: 72000,
    experience: 3,
    rating: 3.8,
  },
  {
    id: 11,
    name: "Kevin",
    department: "Sales",
    salary: 125000,
    experience: 8,
    rating: 4.2,
  },
  {
    id: 12,
    name: "Liam",
    department: "Engineering",
    salary: 98000,
    experience: 3,
    rating: 4.0,
  },
  {
    id: 13,
    name: "Mia",
    department: "Design",
    salary: 85000,
    experience: 2,
    rating: 4.3,
  },
  {
    id: 14,
    name: "Noah",
    department: "Design",
    salary: 115000,
    experience: 9,
    rating: 4.8,
  },
  {
    id: 15,
    name: "Olivia",
    department: "Marketing",
    salary: 78000,
    experience: 2,
    rating: 3.9,
  },
];

// The "VIP List" (Chaining: Filter + Map)
function getHighPerformers(employees) {
  return employees.filter((e) => e.rating === 4.5).map((e) => e.name);
}
const highPerformers = getHighPerformers(employees);
// console.log(highPerformers);

// Budget Planning (Chaining: Filter + Reduce)

function totalAnuualSalary(employees) {
  return employees
    .filter((e) => e.department === "Engineering")
    .reduce((total, e) => e.salary + total, 0);
}
const totalSalary = totalAnuualSalary(employees);
// console.log(totalSalary);

// 3. Experience Ranking (Sort)

function experienceRanking(employees) {
  return employees.sort((a, b) => {
    if (b.experience !== a.experience) {
      return b.experience - a.experience;
    }
    return b.salary - a.salary;
  });
}

const Experience = experienceRanking(employees);
// console.log(Experience);

// 4. Department Census (Aggregation: Reduce)

function countEachEmployee(employees) {
  return employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {});
}
// console.log(countEachEmployee(employees));

//5 The "Boss Level" (Complex Aggregation)

let departmentData = {};
function averagSalary(employees) {
  employees.forEach((e) => {
    if (!departmentData[e.department]) {
      departmentData[e.department] = { total: 0, count: 0 };
    }
    departmentData[e.department].total += e.salary;
    departmentData[e.department].count += 1;
  });
  let avgSalary = {};
  Object.keys(departmentData).forEach((d) => {
    avgSalary[d] = departmentData[d].total / departmentData[d].count;
  });
  return avgSalary;
}

console.log(averagSalary(employees));
