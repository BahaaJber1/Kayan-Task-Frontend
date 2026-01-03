const visitsData = [
  {
    id: "01",
    date: new Date(),
    patient: "John Smith",
    time: "10:00 AM",
    status: "completed",
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
    status: "scheduled",
    total: "",
  },
  {
    id: "03",
    date: new Date(),
    patient: "Michael Brown",
    time: "4:30 PM",
    status: "cancelled",
    total: "$0",
  },
  {
    id: "04",
    date: new Date(),
    patient: "Sarah Davis",
    time: "11:15 AM",
    status: "pending",
    total: "",
    patientNotes: "My head has been hurting for two days.",
  },
];

export { visitsData };
