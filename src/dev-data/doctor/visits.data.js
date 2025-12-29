const visitsData = [
  {
    id: "01",
    date: new Date(),
    patient: "John Smith",
    time: "10:00 AM",
    status: "Completed",
    treatments: [
      { name: "General Checkup", value: "100" },
      { name: "Blood Test", value: "100" },
    ],
    medicalNotes:
      "Patient is in good health overall, recommended regular exercise and a balanced diet and follow-up in 6 months.",
    total: "200",
  },
  {
    id: "02",
    date: new Date(),
    patient: "Emily Johnson",
    time: "2:00 PM",
    status: "Scheduled",
    total: "",
  },
  {
    id: "03",
    date: new Date(),
    patient: "Michael Brown",
    time: "4:30 PM",
    status: "Cancelled",
    total: "$0",
  },
];

export { visitsData };
