import pymysql
import os
from dotenv import load_dotenv

# Carica le variabili dal file .env
load_dotenv()

class DatabaseWrapper:
    def __init__(self):
        self.host = os.getenv('DB_HOST')
        self.user = os.getenv('DB_USER')
        self.password = os.getenv('DB_PASSWORD')
        self.db_name = os.getenv('DB_NAME')
        self.port = os.getenv('DB_PORT')
        
        # Creazione automatica della tabella all'avvio
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
        """
        Crea la tabella deliveries se non esiste.
        Campi richiesti: tracking_code, destinatario, indirizzo, fascia oraria, stato, priorità.
        """
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
        
        connection = self.get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute(create_query)
                print("Tabella 'deliveries' verificata/creata con successo.")
        except Exception as e:
            print(f"Errore creazione tabella: {e}")
        finally:
            connection.close()