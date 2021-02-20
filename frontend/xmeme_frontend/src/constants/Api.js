import axios from 'axios';

const BASE_URL = "http://ec2-52-66-245-92.ap-south-1.compute.amazonaws.com:8081/";

class Api {
    showAllMemes() {
        return axios.get(BASE_URL + '/memes');
    }
    showMemeById(id) {
        return axios.get(BASE_URL + '/memes/' + id);
    }
    createMeme(meme) {
        return axios.post(BASE_URL + '/memes', meme);
    }
    updateMeme(meme, id) {
        return axios.patch(BASE_URL + '/memes/' + id, meme);
    }

}

export default new Api();