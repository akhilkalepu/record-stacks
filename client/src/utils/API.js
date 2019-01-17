import axios from "axios";

export default {
    saveTracks: function (trackData) {
        return axios.post("/api/tracks", trackData);
    }
};
