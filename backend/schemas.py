from pydantic import BaseModel, Field


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


# TODO: Decision
# alternative 1: update model for each field
# alternative 2: dict model for all cases
# without predefined fields
class UserUpdate(BaseModel):
    xid: str
    consent: bool
    survey: bool
    completed_1: bool
    completed_2: bool
    notes: bool
