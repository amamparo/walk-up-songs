import s3 from './s3'
import env from './env'

export const getAllClips = async () => {
	return (await s3.getKeys('clips')).map(key => ({
		key,
		name: key.split('/').pop().split('.')[0],
		url: `https://${env.bucket}/${key}`
	}))
}
