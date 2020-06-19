import axios from 'axios'

const CONTENT_URL = 'http://localhost:80'

const FILE_URL = 'http://localhost:8010'

export default class ApiService {
  static getContentList (page, size) {
    const url = `${CONTENT_URL}/api/v1/content?page=${page}&size=${size}`
    return axios.get(url).then(response => response)
  }

  static getContentRequest (request, page, size) {
    const url = `${CONTENT_URL}/api/v1/${request}?page=${page}&size=${size}`
    return axios.get(url).then(response => response)
  }

  static getContent (id) {
    const url = `${CONTENT_URL}/api/v1/content/${id}`
    return axios.get(url).then(response => response)
  }

  static postContent (content, progressCallback = null) {
    const url = `${FILE_URL}/api/v1/file/upload`
    return axios.post(url, content, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (event) {
        typeof progressCallback === 'function' && progressCallback(event)
      }
    }).then(response => response)
  }

  static addContent (name, type, fileId) {
    const url = `${CONTENT_URL}/api/v1/content`
    return axios.post(url, {
      contentType: {
        type: type
      },
      name: name,
      fileUrl: `${FILE_URL}/api/v1/file/${fileId}`
    }).then(response => response)
  }
}
