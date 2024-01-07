from pydantic import BaseModel, Field

# from datetime import datetime


class NoteIn(BaseModel):
    text: str
    xid: str
    completed: bool


class Note(BaseModel):
    id: int
    xid: str
    text: str
    completed: bool


class Result(BaseModel):
    id: int
    xid: str
    result: dict


class ResultIn(BaseModel):
    xid: str
    result: dict


class ParticipantIdIn(BaseModel):
    pid: str


class PseudoIdIn(BaseModel):
    xid: str


class User(BaseModel):
    id: int
    pid: str
    xid: str
    consent: bool
    survey: bool
    completed_1: bool
    completed_2: bool
    notes: bool
