const FeedItem = ({todo}) => {
    return (
        <div className="list-group-item">
            (Other user's acheivement)
            {todo.todo}
        </div>
    )
}
export default FeedItem;