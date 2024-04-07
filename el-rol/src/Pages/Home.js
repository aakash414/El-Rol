import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function Home() {
    const [web3, setWeb3] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setWeb3(web3Instance);
                    setLoggedIn(true);
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
        <div>
            {loggedIn ? (
                <p>Success! You are logged in with MetaMask</p>
            ) : (
                <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
                    Connect with MetaMask
                </button>
            )}
        </div>
    );
}

export default Home;
