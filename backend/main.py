"""
FastAPI backend.

SQLAlchemy tables are defined here, not in a separate
file. This might change in future versions.
"""

import os
import databases
import sqlalchemy
from typing import List
from fastapi import FastAPI, HTTPException, WebSocket
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import schemas
import numpy as np
import pickle
from typing import Dict, Any
from starlette.websockets import WebSocketDisconnect
import re
import csv
import json
import logging


##############
# LOGGING    #
##############


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Create a file handler and set its level to DEBUG
file_handler = logging.FileHandler(filename='server.log')
file_handler.setLevel(logging.DEBUG)

# Create a stream handler and set its level to INFO
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)

# Create a formatter and add it to the handlers
formatter = logging.Formatter('%(levelname)s:    %(message)s')
formatter_file = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter_file)
stream_handler.setFormatter(formatter)

# Add the handlers to the logger
logger.addHandler(file_handler)
logger.addHandler(stream_handler)


########
# MODELS
########


metadata = sqlalchemy.MetaData()

# survey results table

survey = sqlalchemy.Table(
    "survey",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.JSON),
)

# single trial results table

results = sqlalchemy.Table(
    "results",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.JSON),
)

# dual trial results table

results_dual = sqlalchemy.Table(
    "results_dual",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.JSON),
)

# survey PSI results table

results_survey_psi = sqlalchemy.Table(
    "survey_psi",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.JSON),
)

# dual debrief results table

results_survey_debrief = sqlalchemy.Table(
    "survey_debrief",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("result", sqlalchemy.JSON),
)

# notes table

notes = sqlalchemy.Table(
    "notes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String),
)

# user table

# when someone enters the app this table is checked
# if pid already exists, if yes id is returned
# if it doesnt exist, a new user is created

user = sqlalchemy.Table(
    "user",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("pid", sqlalchemy.String, unique=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("consent", sqlalchemy.Boolean),
    sqlalchemy.Column("survey", sqlalchemy.Boolean),
    sqlalchemy.Column("completed_1", sqlalchemy.Boolean),
    sqlalchemy.Column("completed_2", sqlalchemy.Boolean),
    sqlalchemy.Column("notes", sqlalchemy.Boolean),
)

# eyetracking table

eyetracking = sqlalchemy.Table(
    "eyetracking",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("x", sqlalchemy.String),
    sqlalchemy.Column("y", sqlalchemy.String),
    sqlalchemy.Column("viewport", sqlalchemy.String),
)

# single trial results table

rrweb = sqlalchemy.Table(
    "rrweb",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("xid", sqlalchemy.String),
    sqlalchemy.Column("event", sqlalchemy.JSON),
)


############################
# SET UP DATABASE CONNECTION
############################


load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
database = databases.Database(DATABASE_URL)
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)


##############
# APP CONFIG #
##############


app = FastAPI(
    docs_url=None,  # Disable docs (Swagger UI)
    redoc_url=None,  # Disable redoc
)

origins = ["http://localhost", "http://localhost:8080", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#########################
# LOAD TRIALS FROM FILE #
#########################


try:
    with open("trials.pkl", "rb") as pickle_file:
        trials = pickle.load(pickle_file)
        print(len(trials), "trials loaded.")
except Exception as e:
    print("Failed to load trials from trials.pkl:", e)


#############
# API CALLS #
#############


@app.on_event("startup")
async def startup():
    """Open database connection."""
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    """Close database connection."""
    await database.disconnect()


@app.get("/notes/", response_model=List[schemas.Note])
async def read_notes():
    """Read notes."""
    query = notes.select()
    return await database.fetch_all(query)


# test post requests: curl -X POST "http://localhost:8000/xid/" \\
# -H "Content-Type: application/json" -d '{"pid": "Hello"}'


@app.get("/users/", response_model=List[schemas.User])
async def read_users():
    """Retrieve user info."""
    query = user.select()
    return await database.fetch_all(query)


@app.get("/user-trials-completed/{xid}")
async def get_user_trials_completed(xid: str) -> int:
    """Get the number of completed trials for a user."""
    query = results.select().where(results.c.xid == xid)
    response = await database.fetch_all(query)
    return len(response)


@app.get("/user-trials-dual-completed/{xid}")
async def get_user_trials_dual_completed(xid: str) -> int:
    """Get the number of completed trials for a user."""
    query = results_dual.select().where(results_dual.c.xid == xid)
    response = await database.fetch_all(query)
    return len(response)


@app.post("/user/")
async def get_user(pseudo_id: schemas.PseudoIdIn) -> dict:
    """Retrieve section completion status for a user."""
    query = user.select().where(user.c.xid == pseudo_id.xid)
    response = await database.fetch_one(query)
    user_values = {
        "xid": response.xid,
        "consent": response.consent,
        "survey": response.survey,
        "completed_1": response.completed_1,
        "completed_2": response.completed_2,
        "notes": response.notes,
    }
    return user_values


@app.post("/user-update/")
async def update_user(user_data: Dict[str, Any]) -> dict:
    """Update user data."""
    query = user.update().where(user.c.xid == user_data.get("xid")).values(user_data)
    await database.execute(query)
    return {"message": "User data updated successfully"}


@app.post("/xid/")
async def get_xid(participant_id: schemas.ParticipantIdIn) -> dict:
    """Return XID for a given Participant ID."""
    import random
    import string

    query = user.select().where(user.c.pid == participant_id.pid)
    response = await database.fetch_one(query)
    if response is not None:
        return {**response}
    else:
        random_xid = "".join(random.choices(string.ascii_letters + string.digits, k=32))
        new_user_values = {
            "pid": participant_id.pid,
            "xid": random_xid,
            "consent": False,
            "survey": False,
            "completed_1": False,
            "completed_2": False,
            "notes": False,
        }

        query = user.insert().values(new_user_values)
        _ = await database.execute(query)
        return new_user_values


@app.get("/game/")
def new_game():
    """Take trials from file."""
    random_trial_idx = np.random.randint(len(trials))
    tasks = trials[random_trial_idx]["task_loads"].tolist()
    agents = trials[random_trial_idx]["worker_capacities"].tolist()
    sm_1 = trials[random_trial_idx]["solution_matrix_1"]
    sm_2 = trials[random_trial_idx]["solution_matrix_2"]
    utility = trials[random_trial_idx]["utility"]
    assignments_1 = [
        [int(i), int(j)] for i, j in np.flip(np.flip(np.where(sm_1 == 1)).T)
    ]
    assignments_2 = [
        [int(i), int(j)] for i, j in np.flip(np.flip(np.where(sm_2 == 1)).T)
    ]
    return {
        "tasks": tasks,
        "agents": agents,
        "utility": utility,
        "assignments_optimal_1": assignments_1,
        "assignments_optimal_2": assignments_2,
    }


@app.post("/results/", response_model=schemas.Result)
async def create_result(result: schemas.ResultIn):
    """Store the results of a trial in the database."""
    query = results.insert().values(xid=result.xid, result=result.result)
    last_record_id = await database.execute(query)
    return {**result.dict(), "id": last_record_id}


@app.post("/results-dual/", response_model=schemas.Result)
async def create_results_dual(result: schemas.ResultIn):
    """Store the results of a trial in the database."""
    query = results_dual.insert().values(xid=result.xid, result=result.result)
    last_record_id = await database.execute(query)
    return {**result.dict(), "id": last_record_id}


@app.post("/results-survey/", response_model=schemas.Result)
async def create_result_survey(result: schemas.SurveyResultIn):
    """Store the results of a survey in the database."""
    if result.survey_id == 1:
        query = results_survey_psi.insert().values(xid=result.xid, result=result.result)
    if result.survey_id == 2:
        query = results_survey_debrief.insert().values(
            xid=result.xid, result=result.result
        )
    last_record_id = await database.execute(query)
    return {**result.dict(), "id": last_record_id}


@app.post("/notes-create/", response_model=schemas.Note)
async def create_note(note: schemas.NoteIn):
    """Store feedback from textfield."""
    query = notes.insert().values(xid=note.xid, text=note.text)
    last_record_id = await database.execute(query)
    return {**note.dict(), "id": last_record_id}


@app.post("/rrweb/")
async def create_events_txt(event_data: Dict):
    """Store rrweb events."""
    XID = event_data["XID"]
    events = event_data["events"]
    if (len(event_data["events"]) > 0) & (XID != ""):
        values = [{"xid": XID, "event": event} for event in events]
        os.makedirs("./rrweb_data", exist_ok=True)
        with open(f"./rrweb_data/{XID}.txt", "a", newline="") as fd:
            for value in values:
                fd.write(json.dumps(value) + "\n")


@app.get("/rrweb/{id}")
async def get_events_text(id: str) -> list:
    """Get the events of a user."""
    try:
        with open(f"./rrweb_data/{id}.txt", "r") as fd:
            response = fd.readlines()
    except Exception as e:
        print(e)
        response = []
    if len(response) == 0:
        query_pid = user.select().where(user.c.pid == id)
        response_pid = await database.fetch_one(query_pid)
        if response_pid is None:
            return []
        try:
            id = response_pid.xid
            with open(f"./rrweb_data/{id}.txt", "r") as fd:
                response = fd.readlines()
        except Exception as e:
            print(e)
            print("events set to []")
            return []
    response = [json.loads(re.sub("\\n$", "", r)) for r in response]
    response = json.dumps(response)
    response = json.loads(response)
    events = [e["event"] for e in response]
    # sort events by timestamp (as they are not always stored in order)
    timestamps = [e["timestamp"] for e in events]
    idx = np.argsort(timestamps)
    events_sorted = list(np.array(events)[idx])
    events_string = json.dumps(events_sorted)
    events_string = events_string.replace(
        'webgazerGazeDot", "style": "display: none',
        'webgazerGazeDot", "style": "display: block',
    )
    events_sorted_eyetracker = json.loads(events_string)
    return events_sorted_eyetracker


# FOR USE WITH DATABASE

# @app.post("/rrweb/")
# async def create_events(event_data: Dict):
#     """Store rrweb events."""
#     XID = event_data["XID"]
#     events = event_data["events"]
#     if (len(event_data["events"]) > 0) & (XID != ""):
#         values = [{"xid": XID, "event": event} for event in events]
#         query = rrweb.insert().values(values)
#         await database.execute(query)


# @app.get("/rrweb/{id}")
# async def get_events(id: str) -> list:
#     """Get the events of a user."""
#     query = rrweb.select().where(rrweb.c.xid == id)
#     response = await database.fetch_all(query)
#     if len(response) == 0:
#         query_pid = user.select().where(user.c.pid == id)
#         response_pid = await database.fetch_one(query_pid)
#         if response_pid is None:
#             return []
#         try:
#             id = response_pid.xid
#             query = rrweb.select().where(rrweb.c.xid == id)
#             response = await database.fetch_all(query)
#         except Exception as e:
#             print(e)
#             print("events set to []")
#             return []
#     events = [e["event"] for e in response]
#     # sort events by timestamp (as they are not always stored in order)
#     timestamps = [e["timestamp"] for e in events]
#     idx = np.argsort(timestamps)
#     events_sorted = list(np.array(events)[idx])
#     events_string = json.dumps(events_sorted)
#     events_string = events_string.replace(
#         'webgazerGazeDot", "style": "display: none',
#         'webgazerGazeDot", "style": "display: block',
#     )
#     events_sorted_eyetracker = json.loads(events_string)
#     return events_sorted_eyetracker

# @app.get("/rrweb_delete_all")
# async def rrewb_delete_all_rows():
#     """Delete all rows in the rrweb table."""
#     try:
#         query = rrweb.delete()
#         await database.execute(query)
#         return {"message": "All rows deleted successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


# WEBSOCKET FOR EYE-TRACKING: remove if not needed

@app.websocket("/eyetracking")
async def eyetracking_endpoint(websocket: WebSocket):
    """Store real-time eyetracking data in CSV files."""
    try:
        await websocket.accept()
        while True:
            try:
                data = await websocket.receive_text()
                d = json.loads(data)
                # Extracting the keys and values from the dictionary
                keys = list(d.keys())
                values = list(d.values())
                os.makedirs("eyetracking_data", exists=True)
                # Checking if the CSV file already exists
                csv_filename = f"eyetracking_data/{d['xid']}.csv"
                try:
                    with open(csv_filename, 'x', newline='') as csv_file:
                        # Writing header with keys as column names
                        writer = csv.writer(csv_file)
                        writer.writerow(keys)
                except FileExistsError:
                    # File already exists, header is not needed
                    pass

                # Appending the values to the CSV file
                with open(csv_filename, mode='a', newline='') as csv_file:
                    writer = csv.writer(csv_file)
                    writer.writerow(values)

                # for DB: comment out if not needed
                # query = eyetracking.insert().values(
                #    xid=d["xid"], x=d["x"], y=d["y"], viewport=d["viewport"]
                # )
                # await database.execute(query)
                    
            except Exception as e:
                logger.error(f"WebSocket error: {str(e)}")
                break
    except WebSocketDisconnect as e:
        logger.info(f"WebSocket connection closed: {e.code}")
    finally:
        # Any cleanup code (optional)
        pass


@app.websocket("/ws-test")
async def rrweb_endpoint(websocket: WebSocket):
    """Test storage of real-time data in CSV files."""
    try:
        await websocket.accept()
        while True:
            try:
                data = await websocket.receive_text()
                logger.info(data)
                with open('websocket_test.txt', 'a', newline='') as fd:
                    fd.write(data + "\n")
                    # fd.write(json.dumps(data) + "\n")
            except Exception as e:
                logger.error(f"WebSocket error: {str(e)}")
                break
    except WebSocketDisconnect as e:
        logger.info(f"WebSocket connection closed: {e.code}")
    finally:
        # Any cleanup code (optional)
        pass
    

# DOWNLOAD CALLS


@app.get("/results/", response_model=List[schemas.Result])
async def read_results():
    """Read results."""
    query = results.select()
    response = await database.fetch_all(query)
    return response


# TEST CALLS


@app.get("/tables")
async def get_tables():
    """Read list of all tables in database."""
    async with database.transaction():
        tables = engine.table_names()
        return {"tables": tables}


@app.get("/tables/{table_name}", response_model=List[dict])
async def get_table_content(table_name: str):
    """Read list of content in table."""
    async with database.transaction():
        if not engine.has_table(table_name):
            raise HTTPException(status_code=404, detail="Table not found")

        table = sqlalchemy.Table(table_name, metadata, autoload_with=engine)
        query = sqlalchemy.select(table)
        result_proxy = await database.fetch_all(query)
        result = [dict(row) for row in result_proxy]
        return result


@app.get("/table_fields/{table_name}", response_model=List[str])
async def get_table_fields(table_name: str):
    """Read list of all fields in table."""
    async with database.transaction():
        if not await database.fetch_val(
            "SELECT EXISTS (SELECT 1 FROM information_schema.tables "
            f"WHERE table_name = '{table_name}')"
        ):
            raise HTTPException(status_code=404, detail="Table not found")

        columns_query = "SELECT column_name FROM information_schema.columns "
        f"WHERE table_name = '{table_name}'"
        result = await database.fetch_all(columns_query)
        fields = [row["column_name"] for row in result]
        return fields
