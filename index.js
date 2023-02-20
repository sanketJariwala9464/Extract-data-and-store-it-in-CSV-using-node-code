import API from "./API/index.js";
import csvWriter from 'csv-writer'
import path from 'path'

const __dirname = path.resolve();

export default class Task {
    async getPostData () {
        const response = {
            success: false,
            message: 'Oops! Something went wrong.',
            data: []
        }
        try {
            const api = new API()
            const getPost = await api.$get('/posts')
            if (getPost.status === 200) {
                response.success = true
                response.message = 'Success'
                response.data = getPost.data
                return response
            } else {
                response.message = getPost.data.message
                return response
            }
        } catch (e) {
            response.message = e.message
            return response
        }
    }

    async getCsvHeaders (data) {
        const response = {
            success: false,
            message: 'Oops! Something went wrong.',
            data: []
        }
        try {
            const headers = []
            const keys = Object.keys(data)
            keys.forEach((key) => {
                headers.push({
                    id: key,
                    title: key
                })
            })
            response.success = true
            response.message = 'Success'
            response.data = headers
            return response
        } catch (e) {
            response.message = e.message
            return response
        }
    }

    async main () {
        const response = {
            status: false,
            message: 'Oops! Something went wrong.',
            data: []
        }
        try {
            const posts = await this.getPostData()
            if (posts.success) {
                const csvHeaders = await this.getCsvHeaders(posts.data[0])
                if (csvHeaders.success) {
                    const fileName = new Date().getTime()
                    const csv = csvWriter.createObjectCsvWriter({
                        path: path.join(__dirname, 'public', fileName + '-post.csv'),
                        header: csvHeaders.data
                    })
                    csv.writeRecords(posts.data).then(() => {
                        response.status = true
                        response.message = 'Success'
                        console.log(response)
                    }).catch((e) => {
                        response.message = e.message
                        console.log(response)
                    })
                } else {
                    response.message = csvHeaders.message
                    console.log(response)
                }
            } else {
                response.message = posts.message
                console.log(response)
            }
        } catch (e) {
            response.message = e.message
            console.log(response)
        }
    }
}

const task = new Task()
task.main()