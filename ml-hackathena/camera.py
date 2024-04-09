import cv2
import tensorflow as tf
import json
import numpy as np
import os
import requests
import base64
from datetime import datetime

# Load the model architecture from JSON
with open("model.json", "r") as json_file:
    model_json = json_file.read()

model = tf.keras.models.model_from_json(model_json)

# Load the model weights
model.load_weights("model_weights.keras")

font = cv2.FONT_HERSHEY_SIMPLEX

# Function to post data to the local server
def post_data(image, date, time, license_plate, location):
    image_base64 = base64.b64encode(image).decode('utf-8')
    data = {
        'image': image_base64,
        'date': date,
        'time': time,
        'license_plate': license_plate,
        'location': location
    }
    url = "http://localhost:5000/post_data"  # Adjust the URL as per your local server setup
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Data posted successfully to the server.")
    else:
        print("Failed to post data to the server.")

# Function to process the video and perform predictions
def startapplication():
    video_path = r"C:\Users\lgowrivinod\Desktop\hackathena\Accident-Detection-System\299570b0-49a0-4dcd-a3a7-d1189ae4b01f.mp4"
    if not os.path.isfile(video_path):
        print("Error: Video file not found at the specified path.")
        return
    
    video = cv2.VideoCapture(video_path)
    if not video.isOpened():
        print("Error: Failed to open video source.")
        return
    
    frame_count = 0
    highest_prediction_value = 0
    highest_prediction_frame = None

    while True:
        # Read a frame
        ret, frame = video.read()
        
        # Check if the frame is valid
        if not ret:
            print("Error: Failed to read frame from video source.")
            break
        
        # Increment frame count
        frame_count += 1
        
        # Skip frames by a factor of 3
        if frame_count % 3 != 0:
            continue

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        roi = cv2.resize(gray_frame, (250, 250))

        # Perform prediction
        pred = model.predict(roi[np.newaxis, :, :, :])
        prediction_value = pred[0][0]

        if prediction_value > highest_prediction_value:
            highest_prediction_value = prediction_value
            highest_prediction_frame = frame.copy()

        print(prediction_value)
        result = "Accident" if prediction_value > 0.996 else "No Accident"
        cv2.rectangle(frame, (0, 0), (280, 40), (0, 0, 0), -1)
        cv2.putText(frame, f"{result} ({prediction_value:.2f})", (20, 30), font, 1, (255, 255, 0), 2)

        # Save frame if prediction is above threshold
        if prediction_value > 0.9999:
            cv2.imwrite("highest_prediction_frame.png", frame)
            current_datetime = datetime.now()
            date = current_datetime.strftime("%Y-%m-%d")
            time = current_datetime.strftime("%H:%M:%S")
            license_plate = "ABC123"  # Placeholder for license plate
            location = "City XYZ"  # Placeholder for location
            post_data(cv2.imencode('.png', highest_prediction_frame)[1], date, time, license_plate, location)
            break  # Stop processing frames after saving the first frame exceeding the threshold

    video.release()

if __name__ == '__main__':
    startapplication()
