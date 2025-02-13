// pages/api/experience-no-qualifications.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle the submission of any data, if necessary
    try {
      // Your logic for handling POST requests for this page
      return res.status(200).json({ message: 'Data saved for Experience Without Qualifications.' });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ message: 'Error saving data.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
