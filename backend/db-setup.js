import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
  ssl: {
    rejectUnauthorized: false
  }
});


// SQL to insert intial data
const setupSQL = `
    CREATE DATABASE IF NOT EXISTS car_parts_store;
    
    USE car_parts_store;

    CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL
    );

    DELETE FROM products;

    INSERT INTO products (name, price, image, rating, description, category) VALUES
    ('Generic Car Battery', 35.42, '/images/car_parts/battery1.png', 2.6, 'This is a cheap and reliable car battery that is practical for the average Joe.', 'Car Battery'),
    ('Super Charge Car Battery', 61.65, '/images/car_parts/battery2.png', 4.2, 'This is a super high end battery for super drivers!', 'Car Battery'),
    ('Bosch Car Battery', 44.90, '/images/car_parts/battery3.png', 3.25, 'This car battery features good quality electricity.', 'Car Battery'),
    ('Red and Black Jumper Cables', 36.25, '/images/car_parts/jumper_cables.jpeg', 4.7, 'These red and black jumper cables are both high quality and functional.', 'Jumper Cables'),
    ('Yellow Jumper Rope', 41.40, '/images/car_parts/jumper_cables2.jpeg', 3.9, 'This yellow electricity tool is top of the line.', 'Jumper Cables'),
    ('Super Amazingly Premium Engine Oil', 155.01, '/images/car_parts/oil.png', 5.0, 'This is World\\'s finest Engine Oil, it will change you and your car\\'s life.', 'Engine Oil'),
    ('Super Premium Car Fluid', 89.05, '/images/car_parts/oil1.jpg', 3.49, 'Affordable yet quality, this fluid provides a perfect solution for all your fluid needs.', 'Engine Oil'),
    ('Honda 0W-30', 75.80, '/images/car_parts/oil2.png', 1.2, 'Perfect for cars that need 0W-30 fluid.', 'Engine Oil'),
    ('Mobil Super Fluid', 60.06, '/images/car_parts/oil3.webp', 2.4, 'Ensures smooth operation and superb quality.', 'Engine Oil'),
    ('Car Fluid Oil', 70.80, '/images/car_parts/oil4.png', 4.0, 'Enhance your vehicle\\'s functionality with this reliable fluid.', 'Engine Oil'),
    ('Lucas Engine', 45.66, '/images/car_parts/oil5.jpg', 3.0, 'This Oil offers a blend of quality and affordability. A reliable option for strong performance at a budget-friendly price.', 'Engine Oil'),
    ('5W-30', 20.05, '/images/car_parts/oil6.png', 4.0, 'This is a reliable option for strong performance at a budget-friendly price.', 'Engine Oil'),
    ('Tire with rim', 200.00, '/images/car_parts/tire.jpeg', 3.3, 'High quality and stylish meets affordable and practical.', 'Tires'),
    ('Motorcyle rubber wheel', 85.00, '/images/car_parts/tire1.png', 3.3, 'This rubber wheel is very quality and fits most motor cycles.', 'Tires'),
    ('Standard Tire', 65.00, '/images/car_parts/tire2.jpg', 4.0, 'This tire is perfect for all car enjoyers.', 'Tires'),
    ('Set of 4', 478.00, '/images/car_parts/tire_set_of_4.png', 5.0, 'Get a great value with this affordable set of wheels.', 'Tires');
`;

// run setup
async function setupDatabase() {
  try {
    await connection.promise().query(setupSQL);
    console.log('Database setup complete.');
    connection.end();
  } catch (error) {
    console.error('Setup failed:', error.message);
  }
}

setupDatabase();