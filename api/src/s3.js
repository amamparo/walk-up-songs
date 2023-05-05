import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
	DeleteObjectCommand, GetObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import env from './env'


class S3 {
	constructor() {
		this.client = new S3Client({})
		this.bucket = env.bucket
	}

	async getPreSignedUploadUrl(key) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key
		})
		return getSignedUrl(this.client, command, { expiresIn: 10 })
	}

	async getKeys(prefix) {
		const response = await this.client.send(new ListObjectsV2Command({
			Bucket: this.bucket,
			Prefix: prefix
		}))
		const contents = response.Contents
		return !contents ? [] : contents.map(({ Key }) => Key)
	}

	async deleteObject(key) {
		await this.client.send(new DeleteObjectCommand({
			Bucket: this.bucket,
			Key: key
		}))
	}

	async put(key, data) {
		await this.client.send(new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
			Body: JSON.stringify(data)
		}))
	}

	async getJson(key) {
		try {
			const response = await this.client.send(new GetObjectCommand({
				Bucket: this.bucket,
				Key: key
			}))
			return JSON.parse(await this.#streamToString(response.Body))
		} catch (e) {
			return Promise.resolve()
		}
	}

	#streamToString(stream) {
		return new Promise((resolve, reject) => {
			const chunks = []
			stream.on('data', (chunk) => chunks.push(chunk))
			stream.on('error', reject)
			stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
		})
	}
}

export default new S3()
