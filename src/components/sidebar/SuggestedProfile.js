import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	updateLoggedInUserFollowing,
	updateFollowedUserFollowers,
} from '../../services/firebase'

const SuggestedProfile = ({
	username,
	profileDocId,
	loggedInUserDocId,
	userId,
	profileId,
	avatar,
}) => {
	const [followed, setFollowed] = useState(false)
	const [updating, setUpdating] = useState(false)

	async function handlFollowUser() {
		setUpdating(true)
		await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
		await updateFollowedUserFollowers(profileDocId, userId, false)
		setFollowed(true)
	}

	return (
		!followed && (
			<div className='py-2 w-full flex flex-row items-center '>
				<img
					src={avatar ? avatar : '/images/avatars/default.png'}
					className='h-8 mr-3 rounded-full'
					alt={`${username}`}
				/>
				<Link
					to={`/p/${username}`}
					className='font-bold text-sm text-gray-base hover:underline cursor-pointer'
				>
					{username}
				</Link>
				<button
					onClick={handlFollowUser}
					className={`font-bold ml-auto text-xs outline-none focus:outline-none ${
						updating
							? `text-gray-light`
							: `bg-clip-text text-transparent bg-gradient-to-r from-start to-end`
					}`}
				>
					Follow
				</button>
			</div>
		)
	)
}

export default SuggestedProfile
