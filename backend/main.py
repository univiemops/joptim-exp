import os
import databases
import sqlalchemy
from typing import List
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import schemas
import numpy as np


###############
### MODELS ####
###############


metadata = sqlalchemy.MetaData()

# notes table

notes = sqlalchemy.Table(
    "notes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("text", sqlalchemy.String),
    sqlalchemy.Column("completed", sqlalchemy.Boolean),
)

# results table

results = sqlalchemy.Table(
    "results",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("result", sqlalchemy.JSON),
)


##############################
# SET UP DATABASE CONNECTION #
##############################


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

database = databases.Database(DATABASE_URL)

engine = sqlalchemy.create_engine(
    DATABASE_URL
)
# metadata.create_all(engine)


##############
# APP CONFIG #
##############


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/notes/", response_model=schemas.Note)
async def create_note(note: schemas.NoteIn):
    print(note)
    query = notes.insert().values(text=note.text, completed=note.completed)
    last_record_id = await database.execute(query)
    return {**note.dict(), "id": last_record_id}


@app.get("/game/")
def new_game():
    m = 7  # number of tasks
    n = 5  # number of agents

    steps = 10

    lim_tasks = (1, 7+1)
    lim_agents = (1, 10+1)

    tasks = (steps*np.random.randint(*
             lim_tasks, size=m)).tolist()
    agents = (steps*np.random.randint(*
              lim_agents, size=n)).tolist()
    return {"tasks": tasks, "agents": agents}


@app.get("/results/", response_model=List[schemas.Result])
async def read_results():
    query = results.select()
    response = await database.fetch_all(query)
    return response
    # array = []
    # for r in response:
    #    result_dict = r.__dict__
    #    result_dict['result'] = json.loads(result_dict['result'])
    #    array.append(schemas.Result(**result_dict))
    # return array


@app.post("/results/", response_model=schemas.Result)
async def create_result(result: schemas.ResultIn):
    print(result)
    query = results.insert().values(result=result.result)
    last_record_id = await database.execute(query)
    return {**result.dict(), "id": last_record_id}
