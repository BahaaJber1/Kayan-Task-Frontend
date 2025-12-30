const visitsData = [
  {
    id: "01",
    patient: "Jane Doe",
    doctor: "Dr. John Smith",
    date: new Date(),
    treatments: [
      { name: "Physical Therapy", value: 150 },
      { name: "Medication", value: 75 },
    ],
    amount: 225,
    time: "10:00 AM",
    medicalNotes:
      "Patient is recovering well from the surgery. Continue with prescribed medications and attend follow-up sessions.",
    status: "Completed",
  },
  {
    id: "02",
    patient: "Mark Wilson",
    doctor: "Dr. Emily Johnson",
    date: new Date(),
    treatments: [
      { name: "Dental Cleaning", value: 100 },
      { name: "X-Ray", value: 50 },
      { name: "Filling", value: 200 },
    ],
    amount: 350,
    time: "2:00 PM",
    medicalNotes:
      "Patient requires a follow-up in two weeks for further evaluation.",
    status: "Scheduled",
  },
  {
    id: "03",
    patient: "Lucy Smith",
    doctor: "Dr. Michael Brown",
    date: new Date(),
    treatments: [
      { name: "Eye Examination", value: 120 },
      { name: "Glasses", value: 180 },
      { name: "Contact Lenses", value: 100 },
    ],
    amount: 400,
    time: "11:30 AM",
    medicalNotes:
      "Patient has been advised to wear glasses full-time and return for a check-up in six months.",
    status: "Cancelled",
  },
  {
    id: "04",
    patient: "Tom Harris",
    doctor: "Dr. Michael Brown",
    date: new Date(),
    treatments: [
      { name: "Eye Examination", value: 120 },
      { name: "Potato", value: 180 },
    ],
    amount: 300,
    time: "12:30 AM",
    medicalNotes: "Everything is fine.",
    status: "Completed",
  },
  {
    id: "05",
    patient: "Mary Johnson",
    doctor: "Dr. Polly White",
    date: new Date(),
    treatments: [
      { name: "Skin Check", value: 200 },
      { name: "Allergy Test", value: 150 },
    ],
    amount: 350,
    time: "2:00 PM",
    medicalNotes:
      "Patient shows signs of improvement. Continue with current treatment plan.",
    status: "Completed",
  },
  {
    id: "06",
    patient: "Eric Lee",
    doctor: "Dr. Polly White",
    date: new Date(),
    treatments: [
      { name: "Skin Check", value: 200 },
      { name: "Allergy Test", value: 150 },
      { name: "Contact Lenses", value: 100 },
    ],
    amount: 450,
    time: "11:30 AM",
    medicalNotes:
      "Patient needs to avoid known allergens and follow up in one month.",
    status: "Scheduled",
  },
];

export { visitsData };
