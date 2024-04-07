import React, { useState } from 'react';
import Header from '../Components/Header';

const Dashboard = () => {
  // Dummy data for accidents
  const accidents = [
    { location: 'Street A', time: '10:30 AM', date: '2024-04-07', vehicleNo1: 'ABC123', vehicleOwner1: 'John Doe' ,no_of_veh:'2', vehicleNo2: 'RTE473', vehicleOwner2: 'Sam Tom'},
    { location: 'Street B', time: '09:45 AM', date: '2024-04-06', vehicleNo1: 'XYZ456', vehicleOwner1: 'Jane Doe'  ,no_of_veh:'2', vehicleNo2: 'FTR663', vehicleOwner2: 'Thomas Grey'},
    { location: 'Street C', time: '11:15 AM', date: '2024-04-05', vehicleNo1: 'DEF789', vehicleOwner1: 'Alice Smith' ,no_of_veh:'2' , vehicleNo2: 'TGR476', vehicleOwner2: 'John Doe'}
  ];

  // State to manage visibility of the popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedAccident, setSelectedAccident] = useState(null);

  // Function to handle opening the popup
  const openPopup = (accident) => {
    setSelectedAccident(accident);
    setPopupVisible(true);
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setSelectedAccident(null);
    setPopupVisible(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <Header/>
      <div>
        {accidents.map((accident, index) => (
          <div key={index} className="border border-gray-300 p-4 mb-4">
            <p><strong>Location:</strong> {accident.location}</p>
            <p><strong>Time:</strong> {accident.time}</p>
            <p><strong>Date:</strong> {accident.date}</p>
            <button onClick={() => openPopup(accident)} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">More Details</button>
          </div>
        ))}
      </div>

      {popupVisible && selectedAccident && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-10">
          <div className="bg-white p-4 rounded shadow-lg p-10 ">
            <button onClick={closePopup} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p><strong>Location:</strong> {selectedAccident.location}</p>
            <p><strong>Time:</strong> {selectedAccident.time}</p>
            <p><strong>Date:</strong> {selectedAccident.date}</p>
            <p><strong>Number of Vehicle involved:</strong> {selectedAccident.no_of_veh}</p>
            <p><strong>Vehicle Number 1:</strong> {selectedAccident.vehicleNo1}</p>
            <p><strong>Vehicle Owner 1:</strong> {selectedAccident.vehicleOwner1}</p>
            <p><strong>Vehicle Number 2:</strong> {selectedAccident.vehicleNo2}</p>
            <p><strong>Vehicle Owner 2:</strong> {selectedAccident.vehicleOwner2}</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
