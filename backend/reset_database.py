#!/usr/bin/python3
import os
import sys
from urllib.parse import urlparse

import psycopg2
from dotenv import load_dotenv

def reset_database():
    """Delete all data from all tables and reset sequences."""
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL")
    url = urlparse(DATABASE_URL)
    
    try:
        conn = psycopg2.connect(
            dbname=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
    except Exception as e1:
        try:
            conn = psycopg2.connect(
                dbname=url.path[1:],
                user=url.username,
                password=url.password,
      host="localhost",
                port=url.port
            )
        except Exception as e2:
            print("Failed to connect to the database using 'localhost' and", url.hostname)
            print(e1)
            print(e2)
            sys.exit(1)
    
    cur = conn.cursor()
    try:
        # Get all table names
        tables_query = ("SELECT table_name FROM information_schema.tables "
                        "WHERE table_schema NOT IN ('information_schema', 'pg_catalog') AND table_type = 'BASE TABLE'")
        cur.execute(tables_query)
        tables = cur.fetchall()
        tables = [table[0] for table in tables]
        
        # Delete all records from all tables
        for table in tables:
            delete_query = f"DELETE FROM \"{table}\";"
            cur.execute(delete_query)
            conn.commit()

        # Reset all sequences
        sequences_query = ("SELECT sequence_name FROM information_schema.sequences "
                           "WHERE sequence_schema NOT IN ('information_schema', 'pg_catalog')")
        cur.execute(sequences_query)
        sequences = cur.fetchall()
        sequences = [sequence[0] for sequence in sequences]

        for sequence in sequences:
            reset_query = f"ALTER SEQUENCE \"{sequence}\" RESTART WITH 1;"
            cur.execute(reset_query)
            conn.commit()

        print("Database reset successfully.")
    except Exception as e:
        print("Error:", e)
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    reset_database()
