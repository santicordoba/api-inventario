const excelGenerator = (sales, name, res) => {
    const xl = require('excel4node');

    sales = sales.map((sale) => {
        let id = sale._id.toString();
        delete sale._id;
        return {
            id,
            ...sale
        }
    })

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('Ventas');

    for(let i = 1; i <= sales.length; i++){

        for(let j = 1; j <= Object.values(sales[i-1]).length; j++){
            let data = Object.values(sales[i - 1])[j - 1];
            if(typeof data === 'string'){
                ws.cell(i, j).string(data);
            } else {
                ws.cell(i, j).number(data);
            }
        }
    }

    wb.write(`${name}.xlsx`, res);

}

module.exports.SalesUtils = {
    excelGenerator
}