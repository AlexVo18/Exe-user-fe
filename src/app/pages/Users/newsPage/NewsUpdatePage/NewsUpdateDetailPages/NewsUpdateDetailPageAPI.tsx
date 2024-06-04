import { useParams } from 'react-router-dom';

function DetailPageAPI() {
    let { id } = useParams();

    return (
        <div>DetailPageAPI: {id}</div>
    )
}

export default DetailPageAPI;