import { getUserByEmail } from '../db';

export async function GET(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;
    const user = await getUserByEmail(email);
    res.status(200).json(user);
  } else {
    res.status(405).end(); // Method not allowed
  }
}
