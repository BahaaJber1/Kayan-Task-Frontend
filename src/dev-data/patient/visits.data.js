const visitsData = [
  {
    id: "01",
    date: new Date(),
    doctor: "Dr. John Smith",
    time: "10:00 AM",
    treatments: [
      { name: "Physical Therapy", value: 150 },
      { name: "Medication", value: 75 },
    ],
    medicalNotes:
      "Patient is recovering well from the surgery. Continue with prescribed medications and attend follow-up sessions.",
    status: "Completed",
  },
  {
    id: "02",
    date: new Date(),
    doctor: "Dr. Emily Johnson",
    time: "2:00 PM",
    medicalNotes: "",
    status: "Scheduled",
  },
  {
    id: "03",
    date: new Date(),
    doctor: "Dr. Michael Brown",
    time: "11:30 AM",
    status: "Cancelled",
  },
];

export { visitsData };
