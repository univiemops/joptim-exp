from typing import Any
from pydantic import BaseModel, Field
import json
# from datetime import datetime


class NoteIn(BaseModel):
    text: str
    completed: bool


class Note(BaseModel):
    id: int
    text: str
    completed: bool


class JSONType:
    def __init__(self, value: Any):
        self.value = value

    def __repr__(self):
        return json.dumps(self.value)


class ResultIn(BaseModel):
    result: JSONType = Field(..., alias='result')

    class Config:
        arbitrary_types_allowed = True


class Result(BaseModel):
    id: int
    result: JSONType = Field(..., alias='result')

    class Config:
        arbitrary_types_allowed = True
