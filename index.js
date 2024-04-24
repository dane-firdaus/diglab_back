const express = require("express");
const cors = require("cors");


const rolesRoutes = require("./src/routes/roles.js");
const usersRoutes = require("./src/routes/users.js");
const categoryRoutes = require("./src/routes/category.js");
const hotelsRoutes = require("./src/routes/hotels.js");
const reviewRoutes = require("./src/routes/review.js");
const peringkatRoutes = require("./src/routes/peringkat.js");
const reviewCategoryRoutes = require("./src/routes/review-category.js");
const exportReviewRoutes = require("./src/routes/export-excel.js");


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/roles', rolesRoutes);
app.use('/api/authentication', usersRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/review-category', reviewCategoryRoutes);
app.use('/api/peringkat', peringkatRoutes);
app.use('/api/exports', exportReviewRoutes);

app.get('/', (req, res, next) => {
    return res.json({
        "name" : "zidane firdaus",
        "account" : "developer"
    })
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=summary.xlsx');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})


app.listen(4089, () => {
    console.log('server berjalan di port 4089 !');
})