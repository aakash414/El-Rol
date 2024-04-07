import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import Web3 from 'web3';

function Home() {
  const [web3, setWeb3] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          setLoggedIn(true);
          navigate('/landing'); // Use useNavigate for redirection on login
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('MetaMask not detected');
      }
    };
    loadWeb3();
  }, []);

  return (
    <div className="home flex h-screen items-center justify-center bg-gray-200">
      {loggedIn ? (
        <p className="text-xl font-bold text-green-500">
          Success! You are logged in with MetaMask
        </p>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}
        >
          Connect with MetaMask
        </button>
      )}
    </div>
  );
}

export default Home;
