const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// سرو فایل‌های استاتیک وب (پنل‌ها و لوگو)
app.use(express.static(path.join(__dirname, 'public')));

// API: دریافت صورت‌حساب مالی دانش‌آموز
app.get('/api/student/summary', (req, res) => {
  res.json({
    schoolName: "مجتمع آموزشی دخترانه معرفت",
    studentName: "علی محمدی",
    baseFee: 30000000,
    discounts: 6000000, // اولیه + ثانویه انتهای سال
    totalPaid: 15000000,
    remainingBalance: 9000000
  });
});

// API: ثبت دریافت حضوری (نقدی/پوز/چک)
app.post('/api/transactions/manual', (req, res) => {
  const { studentName, amount, method } = req.body;
  res.status(201).json({
    success: true,
    message: "پرداخت با موفقیت ثبت و رسید صادر شد.",
    receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`سامانه شهریه مجتمع معرفت روی پورت ${PORT} فعال شد.`);
});