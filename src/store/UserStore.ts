import { makeObservable, observable, runInAction } from 'mobx'
import { UserType } from '@/model/UserType'
import UserService from '@/service/UserService'
import { getPageCount } from '@/utils/pages'
import { ModalMode } from '@/model/ModalMode'


class UserStore {
	isLoading: boolean = false
	error: string = ''
	user: UserType = {
		access: false
	}
	usersList: UserType[] = []
	limit: number = 10
	page: number = 1
	totalPages: number = 0
	isOpen: boolean = false
	selectedSort: string = ''
	modeModal: ModalMode = ModalMode.CREATE_USER

	constructor() {
		makeObservable(this, {
			isLoading: observable,
			error: observable,
			user: observable,
			usersList: observable,
			limit: observable,
			page: observable,
			totalPages: observable,
			selectedSort: observable,
			isOpen: observable,
			modeModal: observable
		})
	}


	sortUser = (sort: string) => {
		runInAction(() => {
			this.selectedSort = sort
			if (sort === 'name') {
				this.usersList.sort((a, b) => {
						if (a.name && b.name) {
							return a.name.localeCompare(b.name)
						}
						return 1
					}
				)
			}

			if (sort === 'birthDate') {
				this.usersList.sort((a, b) => {
					if (a.birthDate && b.birthDate) {
						return a.birthDate.localeCompare(b.birthDate)
					}
					return 1
				})
			}
		})
	}

	changePage = (page: number) => {
		runInAction(() => {
			this.page = page
		})
	}

	changeHandler = (event: any) => {
		runInAction(() => {
			this.error = ''
			this.user = { ...this.user, [event?.target.name]: event?.target.value }
		})
	}

	changeAccess = (event: any) => {
		if (event?.target?.checked) {
			runInAction(() => {
				this.error = ''
				this.user = { ...this.user, access: event?.target?.checked }
			})
		} else {
			runInAction(() => {
				this.error = ''
				this.user = { ...this.user, access: false }
			})
		}
	}

	changeModalMode = (mode: ModalMode) => {
		runInAction(() => {
			this.modeModal = mode
		})
	}

	fetching = async () => {
		try {
			runInAction(() => {
				this.isLoading = true
				this.error = ''
			})
			const res = await UserService.getAll(this.limit, this.page)
			let totalCount = res.headers['x-total-count']
			runInAction(() => {
				this.totalPages = getPageCount(totalCount, this.limit)
				this.usersList = res.data
			})
		} catch (e: any) {
			runInAction(() => {
				this.error = e.message
			})
		} finally {
			runInAction(() => {
				this.error = ''
				this.isLoading = false
			})
		}
	}

	createUser = async () => {
		runInAction(() => {this.error = ''})
		if (this.user.name?.length === 0 || this.user.name === undefined
			|| this.user.email?.length === 0 || this.user.email === undefined
			|| this.user.lastName?.length === 0 || this.user.lastName === undefined
		) {
			runInAction(() => {
				this.error = 'Заполните все поля'})
			return
		}
		let newUser = { ...this.user, id: String(Date.now()) }
		try {
			runInAction(() => {
				this.error = ''
				this.isLoading = true
			})
			await UserService.createUser(newUser)
			runInAction(() => {
				this.usersList.push(newUser)
				this.user = {}
				this.isOpen = false
			})
		} catch (e: any) {
			runInAction(() => {
				this.error = e.message
			})
		} finally {
			runInAction(() => {
				this.isLoading = false
				this.user = {}
				this.error = ''
				this.isOpen = false
			})
		}
	}

	deleteUser = async (id: string) => {
		try {
			runInAction(() => {
				this.error = ''
				this.isLoading = true
			})
			await UserService.deleteById(id)
			runInAction(() => {
				this.error = ''
				this.usersList = this.usersList.filter((user) => user.id !== id)
			})
		} catch (e: any) {
			runInAction(() => {
				this.error = e.message
			})
		} finally {
			runInAction(() => {
				this.error = ''
				this.isLoading = false
			})
		}
	}

	updateUser = async () => {
		try {
			runInAction(() => {
				this.error = ''
				this.isLoading = true
			})
			await UserService.updateUser(this.user)
			runInAction(() => {
				this.error = ''
				let user = this.usersList.find(user => user.id === this.user.id)
				if (user) {
					let index = this.usersList.indexOf(user)
					this.usersList.splice(index, 1, this.user)
				}
			})
		} catch (e: any) {
			runInAction(() => {
				this.error = e.message
			})
		} finally {
			runInAction(() => {
				this.isLoading = false
				this.user = {}
				this.error = ''
				this.isOpen = false
			})
		}
	}


	handleOpen = (user?: UserType) => {
		runInAction(() => {
			if (user) this.user = user
			this.isOpen = true
		})
	}


	handleClose = () => {
		runInAction(() => {
			this.error = ''
			this.isOpen = false
		})
	}


}

export default UserStore
