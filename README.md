# API REST INVENTARIO 📚

Control de inventario con stock y control de ventas con actualización de stock.
Generación de reportes para exportar inventario y ventas a excel

◼ Node con express.js
◼ MongoDB con Mongo Atlas
◼ excel4node para exportar los reportes a excel

# Endpoints

/users -> Lista de usuarios | creación de usuarios<br>
/sales -> Lista de ventas | creación de ventas<br>
/products -> Lista de productos | Producto por id | Actualizar producto | Crear Producto | Eliminar producto<br>
/products/report -> Genera un excel del inventario<br>
/sales/report -> Genera un excel de las ventas<br>