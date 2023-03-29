import axios from 'axios'
import { UserType } from '@/model/UserType'

class UserService {

	static async getAll(limit = 10, page = 1) {
		const res = await axios.get('https://retoolapi.dev/eqsQ4S/users', {
			params: {
				_limit: limit,
				_page: page
			}
		})
		return res
	}

	static async getById(id: string) {
		const res = await axios.get('https://retoolapi.dev/eqsQ4S/users/' + id)
		return res.data
	}

	static async createUser(user: UserType) {
		const res = await axios.post('https://retoolapi.dev/eqsQ4S/users/', {...user, Headers: 'application/json'})
		return res.data
	}

	static async deleteById(id: string) {
		const res = await axios.delete('https://retoolapi.dev/eqsQ4S/users/' + id)
		return res.data
	}

	static async updateUser(user: UserType) {
		const res = await axios.put('https://retoolapi.dev/eqsQ4S/users/' + user.id, {...user, Headers: 'application/json'})
		return res.data
	}


}

export default UserService