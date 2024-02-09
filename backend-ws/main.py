"""FastAPI backend."""

from fastapi import FastAPI, WebSocket
from starlette.websockets import WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import csv
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


##############
# API CALLS  #
##############


@app.websocket("/rrweb")
async def rrweb_endpoint(websocket: WebSocket):
    """Store real-time eyetracking rrweb in CSV files."""
    try:
        await websocket.accept()
        while True:
            try:
                data = await websocket.receive_text()
                with open('document.txt', 'a', newline='') as fd:
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


# @app.websocket("/rrweb/")
# async def create_events_txt(event_websocket: WebSocket):
#     """Store rrweb events."""
#     XID = event_data["XID"]
#     events = event_data["events"]
#     if (len(event_data["events"]) > 0) & (XID != ""):
#         values = [{"xid": XID, "event": event} for event in events]
#         os.makedirs("./data", exist_ok=True)
#         with open(f"./rrweb_data/{XID}.txt", "a", newline="") as fd:
#             for value in values:
#                 fd.write(json.dumps(value) + "\n")


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

                # Checking if the CSV file already exists
                csv_filename = f"eyetracking_data_{d['xid']}.csv"
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

            except Exception as e:
                logger.error(f"WebSocket error: {str(e)}")
                break
    except WebSocketDisconnect as e:
        logger.info(f"WebSocket connection closed: {e.code}")
    finally:
        # Any cleanup code (optional)
        pass
