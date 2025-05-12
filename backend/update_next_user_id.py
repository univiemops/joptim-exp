#!/usr/bin/python3

import os
import psycopg2
from dotenv import load_dotenv
from urllib.parse import urlparse

def update_id_sequence():
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
            print("Failed to connect to database using 'localhost' and", url.hostname)
            print(e1)
            print(e2)
            return

    cur = conn.cursor()
    try:
        cur.execute("SELECT MAX(id) FROM \"user\";")
        max_id = cur.fetchone()[0]
        if max_id is None:
            next_id = 1  # Default value if the table is empty
        else:
            next_id = max_id + 1

        reduced_id = next_id - 1  # Reducing next ID by 1

        # Update the sequence
        cur.execute("SELECT setval('\"user_id_seq\"', %s);", (reduced_id,))
        conn.commit()
        
    except Exception as e:
        print("Error:", e)
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    update_id_sequence()
