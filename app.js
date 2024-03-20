const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/calculate", (req, res) => {
  // Parsing input ke float
  const hoursWorked = parseFloat(req.body.hoursWorked);
  const hourlyRate = parseFloat(req.body.hourlyRate);

  // Cek apakah input valid
  if (isNaN(hoursWorked) || isNaN(hourlyRate)) {
    res.send("Masukkan harus berupa angka.");
    return;
  }

  // Dapatkan data dari form
  const name = req.body.name;
  const phone = req.body.phone;

  let normalHours = Math.min(hoursWorked, 40);
  let overtimeHours = Math.max(hoursWorked - 40, 0);
  let normalPay = normalHours * hourlyRate;
  let overtimePay = overtimeHours * hourlyRate * 1.5;
  let totalPay = normalPay + overtimePay;

  // Format gaji dengan pemisah ribuan dan simbol "Rp"
  const formattedSalary = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalPay);

  // Kirim pesan dengan nama dan nomor rekening
  res.send(
    `Gaji karyawan ${name} akan dikirimkan ke rekening ${phone}. Total gaji yang akan dikirimkan adalah: ${formattedSalary}`
  );
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
