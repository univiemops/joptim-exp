"""
FastAPI backend.

SQLAlchemy tables are defined here, not in a separate
file. This might change in future versions.
"""

import os
import databases
import sqlalchemy
from typing import List
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import schemas
import numpy as np
import pickle
from typing import Dict, Any

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
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/notes/", response_model=List[schemas.Note])
async def read_notes():
    query = notes.select()
    return await database.fetch_all(query)


# test post requests: curl -X POST "http://localhost:8000/xid/" -H "Content-Type: application/json" -d '{"pid": "Hello"}'


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


# update status of user


@app.post("/user-update/")
async def update_user(user_data: Dict[str, Any]) -> dict:
    query = user.update().where(user.c.xid == user_data.get("xid")).values(user_data)
    await database.execute(query)
    return {"message": "User data updated successfully"}


# create new user or retrieve xid of existing user


@app.post("/xid/")
async def get_xid(participant_id: schemas.ParticipantIdIn) -> dict:
    """Returns XID for a given Participant ID"""

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
        last_record_id = await database.execute(query)
        return new_user_values


# get a random trial from the trials file


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


# post results of individual trials


@app.post("/results/", response_model=schemas.Result)
async def create_result(result: schemas.ResultIn):
    """Store the results of a trial in the database."""
    query = results.insert().values(xid=result.xid, result=result.result)
    last_record_id = await database.execute(query)
    return {**result.dict(), "id": last_record_id}


@app.post("/results_dual/", response_model=schemas.Result)
async def create_results_dual(result: schemas.ResultIn):
    """Store the results of a trial in the database."""
    query = results_dual.insert().values(xid=result.xid, result=result.result)
    last_record_id = await database.execute(query)
    return {**result.dict(), "id": last_record_id}


@app.post("/notes-create/", response_model=schemas.Note)
async def create_note(note: schemas.NoteIn):
    """Store feedback from textfield."""
    query = notes.insert().values(xid=note.xid, text=note.text)
    last_record_id = await database.execute(query)
    return {**note.dict(), "id": last_record_id}


# DOWNLOAD CALLS


@app.get("/results/", response_model=List[schemas.Result])
async def read_results():
    query = results.select()
    response = await database.fetch_all(query)
    return response


# TEST CALLS


@app.get("/tables")
async def get_tables():
    async with database.transaction():
        tables = engine.table_names()
        return {"tables": tables}


@app.get("/tables/{table_name}", response_model=List[dict])
async def get_table_content(table_name: str):
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
    async with database.transaction():
        if not await database.fetch_val(
            f"SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '{table_name}')"
        ):
            raise HTTPException(status_code=404, detail="Table not found")

        columns_query = f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'"
        result = await database.fetch_all(columns_query)
        fields = [row["column_name"] for row in result]
        return fields
