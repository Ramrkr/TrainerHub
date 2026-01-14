{
  "users": [
    {
      "userId": 1,
      "email": "john.doe@example.com",
      "password": "password123",
      "username": "john_doe",
      "mobileNumber": "9876543210",
      "userRole": "Manager"
    },
    {
      "userId": 2,
      "email": "jane.smith@example.com",
      "password": "securePass456",
      "username": "jane_smith",
      "mobileNumber": "9123456789",
      "userRole": "Co-ordinator"
    }
  ],
  "trainers": [
    {
      "trainerId": 1,
      "name": "Priya Sharma",
      "email": "priya.sharma@example.com",
      "phone": "9988776655",
      "expertise": "Java & Spring Boot",
      "experience": "5 years",
      "certification": "Oracle Certified",
      "resume": "priya_resume.pdf",
      "joiningDate": "2023-06-15",
      "status": "Active"
    },
    {
      "trainerId": 2,
      "name": "Rahul Verma",
      "email": "rahul.verma@example.com",
      "phone": "9876543211",
      "expertise": "Angular & TypeScript",
      "experience": "4 years",
      "certification": "Google Certified",
      "resume": "rahul_resume.pdf",
      "joiningDate": "2023-07-01",
      "status": "Active"
    }
  ],
  "feedback": [
    {
      "feedbackId": 1,
      "userId": 1,
      "trainerId": 1,
      "category": "Technical",
      "feedbackText": "Excellent session on Spring Boot.",
      "date": "2023-07-20"
    },
    {
      "feedbackId": 2,
      "userId": 2,
      "trainerId": 2,
      "category": "Communication",
      "feedbackText": "Trainer explained concepts clearly.",
      "date": "2023-07-21"
    }
  ],
  "requirements": [
    {
      "title": "Spring Boot Training",
      "description": "Need a trainer for Spring Boot basics.",
      "department": "Java",
      "duration": "2 weeks",
      "mode": "Online",
      "location": "Remote",
      "skillLevel": "Intermediate",
      "budget": 20000,
      "priority": "High",
      "status": "Open",
      "trainerId": 1,
      "postedDate": "2023-07-10",
      "id": 1
    },
    {
      "id": 2,
      "title": "Angular Workshop",
      "description": "Conduct a workshop on Angular fundamentals.",
      "department": "Development",
      "postedDate": "2023-07-12",
      "status": "Open",
      "duration": "1 week",
      "mode": "Offline",
      "location": "Bangalore",
      "skillLevel": "Beginner",
      "budget": 1000,
      "priority": "Medium",
      "trainerId": 2
    }
  ]
}