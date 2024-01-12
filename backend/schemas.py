from pydantic import BaseModel


class NoteIn(BaseModel):
    xid: str
    text: str


class Note(BaseModel):
    id: int
    xid: str
    text: str


class Result(BaseModel):
    id: int
    xid: str
    result: dict


class ResultIn(BaseModel):
    xid: str
    result: dict


class SurveyResultIn(BaseModel):
    xid: str
    survey_id: int
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
