import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, Link} from "react-router-dom";
import {getUsers, moreUsers} from "../redux/operations";
import {Card} from "../components/Card/Card";
import {Button} from "../components/Button/Button";
import {UserList, PageWrapper} from "./TweetPage.styled";

export const TweetPage = () => {
	const [page, setPage] = useState(1);

	const users = useSelector(state => state.users.users);
	const dispatch = useDispatch();
	const location = useLocation();

	const totalPages = 4;
	const showLoadMore = page < totalPages;
	const backLinkRef = location.state?.from ?? "/";

	useEffect(() => {
		page === 1 ? dispatch(getUsers()) : dispatch(moreUsers(page));
	}, [dispatch, page]);

	const incrementPage = () => {
		setPage(prev => prev + 1);
	};

	return (
		<PageWrapper>
			<Link to={backLinkRef}>Go Back</Link>
			<UserList>
				{users.map(({user, tweets, followers, avatar, follow, id}) => {
					return (
						<li key={id}>
							<Card follow={follow} tweets={tweets} followers={followers} avatar={avatar} user={user} id={id} />
						</li>
					);
				})}
			</UserList>
			{showLoadMore && <Button action={incrementPage}>Load More</Button>}
		</PageWrapper>
	);
};