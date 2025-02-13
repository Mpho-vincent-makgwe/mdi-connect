// pages/api/unskilled-options.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle submission or any relevant data here
    try {
      // Your logic for handling POST requests for unskilled options
      return res.status(200).json({ message: 'Data saved for Unskilled Options.' });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ message: 'Error saving data.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
