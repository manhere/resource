import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: response.statusText,
        }
    }
}

function checkCode(res) {
    if (res.data.code !== 200) {
        alert(res.data.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}


// 使用如下
// import api from '../api.js' // 改成对应的路径
// export default {
//   async mounted() {
//     const { data: { code, data }} = await api.post('/api/comment/post', {title: 'title'})
//     if (code === 200) {
//         console.log(data)
//     }
//     const { data: { code, data }} = await api.get('/api/comment/get', {page: 1})
//     if (code === 200) {
//         console.log(data)
//     }
//   }
// }