import axios from "axios";

//  Get all messages where the connected user is sender or receiver
export const getMessagesApi = async (token: string) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
};