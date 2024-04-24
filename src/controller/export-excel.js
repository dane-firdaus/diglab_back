const { writeFile } = require('fs');
const XLSX = require('xlsx');
const reviewModel = require('../model/review.js');
const dbPool = require('../config/db.js');
const XlsxPopulate = require('xlsx-populate');

const exportReviewByHotelId = async (req, res, next) => {
    const hotel_id = req.query.hotel_id;
    try {
        // Ambil data review dari database
        const [rows] = await reviewModel.joinTableReviewAndCategoryToExport(hotel_id);

        // Membuat array data untuk menyimpan data yang akan diekspor ke Excel
        const data = [
            ['Review Date', 'Total Review'] // Header kolom
        ];

        // Menyimpan nama kategori unik
        const categoryNames = new Set();

        // Memasukkan data dari rows ke dalam array data dan menyimpan nama kategori
        rows.forEach(row => {
            // Tambahkan nama kategori ke Set
            categoryNames.add(row.name.toLowerCase());

            data.push([
                row.review_date ? row.review_date.toISOString().split('T')[0] : '', // Tanggal review
                row.total_review // Total review
            ]);
        });

        // Menambahkan kolom berdasarkan nama kategori
        categoryNames.forEach(category => {
            data[0].push(`${category} (Negative)`);
        });

        // Membuat objek workbook baru
        const wb = XLSX.utils.book_new();

        // Membuat objek worksheet baru
        const ws = XLSX.utils.aoa_to_sheet(data);

        // Menambahkan alignment dan mengatur lebar kolom
        const style = { alignment: { horizontal: 'center' } };
        ws['!cols'] = [{ width: 15 }, { width: 15 }]; // Menentukan lebar kolom
        categoryNames.forEach((category, index) => {
            ws['!cols'].push({ width: 30 }); // Menambahkan lebar kolom untuk kategori
        });

        // Menambahkan style alignment ke seluruh kolom
        for (let col in ws) {
            if (col[0] === '!') continue;
            ws[col].s = style;
        }

        // Menambahkan worksheet ke workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Summary');

        // Menulis workbook ke file
        const fileName = 'summary.xlsx';
        writeFile(fileName, XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }), err => {
            if (err) {
                console.error('Error writing Excel file:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('Excel file berhasil dibuat.');
                res.download(fileName);
            }
        });
    } catch (error) {
        console.error('Error saat mengekspor ke Excel:', error.stack);
        res.status(500).json({ message: 'Internal server error', data: error.stack });
    }
};

const tryExportData = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
    try {
        // Ambil data review dari database
        const [rows] = await reviewModel.tryjoinTableReviewAndCategoryToExport(hotel_id);

        // Ambil semua nama kategori dari tabel review_category
        const [categoryRows] = await dbPool.execute('SELECT name FROM review_category');

        // Objek untuk menyimpan hasil akhir
        const result = [];

        // Membuat objek untuk mengelompokkan entri berdasarkan tanggal
        const dateGroups = {};

        // Mengelompokkan entri berdasarkan tanggal
        rows.forEach(row => {
            const dateKey = row.review_date.toISOString().split('T')[0];
            if (!dateGroups[dateKey]) {
                dateGroups[dateKey] = {
                    review_date: row.review_date,
                    total_review: 0,
                    details_review: []
                };
            }
            dateGroups[dateKey].total_review += row.total_review;
            dateGroups[dateKey].details_review.push({
                name: row.name,
                negative_reviews: row.negative_reviews
            });
        });

        // Mengonversi objek kelompok tanggal ke array
        for (const dateKey in dateGroups) {
            result.push(dateGroups[dateKey]);
        }

        // Membuat array header dengan menambahkan nama kategori dari tabel review_category
        const header = ['Review Date', 'Total Review'];
        categoryRows.forEach(category => {
            header.push(category.name);
        });

        // Membuat objek workbook baru
        const wb = await XlsxPopulate.fromBlankAsync();

        const data = [

            header // Header kategori di samping header yang sudah ada
        ];

        // Tambahkan data hasil query ke dalam array data
        result.forEach(row => {
            const rowData = [row.review_date ? row.review_date.toISOString().split('T')[0] : '', row.total_review];
            categoryRows.forEach(category => {
                const categoryName = category.name.toLowerCase();
                const categoryDetail = row.details_review.find(detail => detail.name.toLowerCase() === categoryName);
                rowData.push(categoryDetail ? categoryDetail.negative_reviews : '');
            });
            data.push(rowData);
        });

        // Mendapatkan sheet aktif
        const sheet = wb.sheet(0);

        // Menulis data ke sheet
        sheet.cell('A1').value('Analysis & Statistic Diglab ORM');

        sheet.cell('C2').value('NEGATIVE');
        sheet.cell('D2').value('NEGATIVE');
        sheet.cell('E2').value('NEGATIVE');
        sheet.cell('F2').value('NEGATIVE');
        sheet.cell('G2').value('NEGATIVE');
        sheet.cell('H2').value('NEGATIVE');
        sheet.cell('I2').value('NEGATIVE');
        sheet.cell('J2').value('NEGATIVE');
        sheet.cell('K2').value('NEGATIVE');

        sheet.cell('A3').value(data);


        // Merge sel A1 sampai L1
        sheet.range('A1:L1').merged(true);

        // Set background color hijau tua dan align center
        sheet.range('A2:K2').style({
            horizontalAlignment: 'center',
            verticalAlignment: 'center'
        });
        sheet.range('C3:K3').style({
            horizontalAlignment: 'center',
            verticalAlignment: 'center'
        });
        sheet.range('A1:L1').style({
            fill: {
                type: 'solid',
                color: '64b5f6' // Warna hijau tua
            },
            horizontalAlignment: 'center',
            verticalAlignment: 'center'
        });

        sheet.column('A').width(20); // Menyesuaikan lebar kolom A menjadi 20
        sheet.column('B').width(20);
        sheet.column('C').width(20);
        sheet.column('D').width(20);
        sheet.column('E').width(20);
        sheet.column('F').width(20);
        sheet.column('G').width(20);
        sheet.column('H').width(20);
        sheet.column('I').width(20);
        sheet.column('J').width(20);
        sheet.column('K').width(20);

        // Menyimpan workbook ke file
        const fileName = 'summary.xlsx';
        await wb.toFileAsync(fileName);

        console.log('Excel file berhasil dibuat.');
        res.download(fileName);
    } catch (error) {
        console.error('Error saat mengekspor ke Excel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { exportReviewByHotelId, tryExportData };
