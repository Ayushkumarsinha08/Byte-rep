const express=require('express');
const axios=require('axios');
const cors=require('cors');
const app=express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const token = process.env.token;


app.use(cors());
app.use(express.json());

const yt_api_key="AIzaSyD4NHM6gk2UAw7_b9k-wPpoKvzuGhtTMvA";
const yt_channel_id="UCgIzTPYitha6idOdrr7M8sQ";

async function isSubscribed(userId) {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/subscriptions`, {
            params: {
                part: 'snippet',
                forChannelId: yt_channel_id,
                key: yt_api_key
            }
        });
        return response.data.items.length > 0;
    } catch (error) {
        console.error('YouTube API error:', error);
        return false;
    }
};
async function isFollowed(userId) {
    try {
        const response = await axios.get(`https://api.github.com/users/bytemait/followers`, {
            headers: { Authorization: `${token}`}
        });
        return response.data.some(follower => follower.login === userId);
    } catch (error) {
        console.error('GitHub API error:', error);
        return false;
    }
}

app.post('/check-access', async (req, res) => {
    const { userId } = req.body;
    console.log("Received userId:", userId);  // Debugging line
    const subscribed = await isSubscribed(userId);
    const followed = await isFollowed(userId);

    if (subscribed || followed) {
        return res.status(200).json({ access: true });
    } else {
        return res.status(403).json({ access: false, message: 'Please subscribe or follow.' });
    }
});



app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
