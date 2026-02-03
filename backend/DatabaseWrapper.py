import pymysql
import os
from dotenv import load_dotenv

load_dotenv()

class DatabaseWrapper:
    def __init__(self):
        self.host = os.getenv('DB_HOST')
        self.user = os.getenv('DB_USER')
        self.password = os.getenv('DB_PASSWORD')
        self.db_name = os.getenv('DB_NAME')
        self.port = int(os.getenv('DB_PORT', 3306))
        
        self.create_table()

    def get_connection(self):
        return pymysql.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.db_name,
            port=self.port,
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )

    def create_table(self):
        create_query = """
        CREATE TABLE IF NOT EXISTS deliveries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tracking_code VARCHAR(50) UNIQUE NOT NULL,
            recipient_name VARCHAR(100) NOT NULL,
            address VARCHAR(255) NOT NULL,
            time_slot VARCHAR(50),
            status ENUM('READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED') DEFAULT 'READY',
            priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'LOW',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
        conn = None
        try:
            conn = self.get_connection()
            with conn.cursor() as cursor:
                cursor.execute(create_query)
                print("Tabella 'deliveries' verificata.")
        except Exception as e:
            print(f"Errore DB: {e}")
        finally:
            if conn: conn.close()

    def get_all_deliveries(self):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                sql = "SELECT * FROM deliveries ORDER BY created_at DESC"
                cursor.execute(sql)
                return cursor.fetchall()
        finally:
            conn.close()

    def create_delivery(self, tracking, recipient, address, time_slot, priority):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                sql = """
                    INSERT INTO deliveries 
                    (tracking_code, recipient_name, address, time_slot, priority, status)
                    VALUES (%s, %s, %s, %s, %s, 'READY')
                """
                cursor.execute(sql, (tracking, recipient, address, time_slot, priority))
                return True
        finally:
            conn.close()

    # --- NUOVO METODO PER COMMIT 6 ---
    def update_status(self, delivery_id, new_status):
        conn = self.get_connection()
        try:
            with conn.cursor() as cursor:
                sql = "UPDATE deliveries SET status = %s WHERE id = %s"
                cursor.execute(sql, (new_status, delivery_id))
                return True
        finally:
            conn.close()