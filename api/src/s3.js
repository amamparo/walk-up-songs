import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
	DeleteObjectCommand,
	GetObjectCommand,
	ListObjectsV2Command,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import env from './env'


export default class S3 {
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

	async getObjects(prefix) {
		const response = await this.client.send(new ListObjectsV2Command({
			Bucket: this.bucket,
			Prefix: prefix
		}))
		return Promise.all(
			response.Contents.map(async ({ Key }) => ({
				key: Key,
				url: await this.#getPreSignedGetUrl(Key)
			}))
		)
	}

	async deleteObject(key) {
		console.log(key)
		await this.client.send(new DeleteObjectCommand({
			Bucket: this.bucket,
			Key: key
		}))
	}

	async #getPreSignedGetUrl(key) {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: key
		})
		return getSignedUrl(this.client, command, { expiresIn: 86400 * 7 })
	}
}
