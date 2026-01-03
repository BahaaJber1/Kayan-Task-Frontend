const visitsData = [
  {
    id: "01",
    date: new Date(),
    doctor: "Dr. John Smith",
    doctor_id: "fa313b03-6dcc-46f8-89f3-d693066094aa",
    time: "10:00 AM",
    treatments: [
      { name: "Physical Therapy", value: 150 },
      { name: "Medication", value: 75 },
    ],
    medicalNotes:
      "Patient is recovering well from the surgery. Continue with prescribed medications and attend follow-up sessions.",
    status: "completed",
  },
  {
    id: "02",
    date: new Date(),
    doctor: "Dr. Emily Johnson",
    doctor_id: "doc-67890",
    time: "2:00 PM",
    medicalNotes: "",
    status: "scheduled",
  },
  {
    id: "03",
    date: new Date(),
    doctor: "Dr. Michael Brown",
    doctor_id: "doc-11223",
    time: "11:30 AM",
    status: "cancelled",
  },
];

export { visitsData };
