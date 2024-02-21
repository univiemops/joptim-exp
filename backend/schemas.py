from pydantic import BaseModel
from typing import Optional

class EyeTrackingIn(BaseModel):
    xid: str
    x: str
    y: str
    viewport: str


class EyeTracking(BaseModel):
    id: int
    xid: str
    x: str
    y: str
    viewport: str


class Result(BaseModel):
    id: int
    xid: str
    result: dict


class ResultIn(BaseModel):
    xid: str
    result: dict


class Event(BaseModel):
    id: int
    xid: str
    event: dict


class EventIn(BaseModel):
    xid: str
    event: dict


class SurveyResult(BaseModel):
    xid: str
    result_psi: Optional[dict]
    result_strategies_1: Optional[dict]
    result_strategies_2: Optional[dict]
    result_demographics: Optional[dict]
    result_debrief: Optional[dict]


class SurveyResultIn(BaseModel):
    xid: str
    survey_id: str
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
    strategies_1: bool
    strategies_2: bool
    demographics: bool
    debrief: bool
