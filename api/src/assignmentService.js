import s3 from './s3'

const getAssignmentsDict = async () => {
	const assignments = await s3.getJson('assignments.json')
	return assignments ? assignments : {}
}

export const getAllAssignments = async () => {
	const assignments = await getAssignmentsDict()
	return Object.keys(assignments).map(key => ({
		name: key,
		clipName: assignments[key]
	}))
}

export const putAssignment = async (name, clipName) => {
	const assignments = await getAssignmentsDict()
	assignments[name] = clipName
	await s3.put('assignments.json', assignments)
}

export const deleteAssignment = async (name) => {
	const assignments = await getAssignmentsDict()
	delete assignments[name]
	await s3.put('assignments.json', assignments)
}

export const deleteAssignmentsWithClip = async (clipName) => {
	const assignments = await getAssignmentsDict()
	Object.keys(assignments).forEach(key => {
		if (assignments[key] === clipName) {
			delete assignments[key]
		}
	})
	await s3.put('assignments.json', assignments)
}
