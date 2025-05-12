#!/usr/bin/python3
import os
import sys
from urllib.parse import urlparse

import psycopg2
from dotenv import load_dotenv


def delete_participant(PID):
    """Delete all participant information."""
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
            print(
                "Failed to connect to database using 'localhost' and",
                url.hostname)
            print(e1)
            print(e2)
    cur = conn.cursor()
    try:
        query = f"SELECT xid FROM \"user\" WHERE pid='{PID}';"
        cur.execute(query)
        row = cur.fetchone()
        if row is None or len(row) == 0:
            print("Participant not found")
            return
        xid = row[0]
        tables_query = ("select table_name from information_schema.tables "
                        "where table_schema not in ('information_schema', "
                        "'pg_catalog') and table_type = 'BASE TABLE'")
        cur.execute(tables_query)
        tables = cur.fetchall()
        tables = [table[0] for table in tables]
        print("xid:", xid)
        for table in tables:
            fields_query = ("SELECT column_name, data_type FROM "
                            "information_schema.columns WHERE table_name"
                            f"= '{table}';")
            cur.execute(fields_query)
            fields = cur.fetchall()
            fields = [fields[0] for fields in fields]
            user_relevant_table = "xid" in fields
            if user_relevant_table:
                print("cleaned up table", table)
                query = f"DELETE FROM \"{table}\" WHERE xid='{xid}';"
                cur.execute(query)
                conn.commit()
        print("User data deleted successfully")
        return
    except Exception as e:
        print("Error:", e)
    cur.close()
    conn.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("You need to pass PID as argument!")
    else:
        PID = sys.argv[1]
        delete_participant(PID)
