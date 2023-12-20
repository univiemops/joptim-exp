from pydantic import BaseModel, Field

# from datetime import datetime


class NoteIn(BaseModel):
    text: str
    completed: bool


class Note(BaseModel):
    id: int
    text: str
    completed: bool


class Result(BaseModel):
    id: int
    result: dict


class ResultIn(BaseModel):
    result: dict
