import { useEffect ,useState} from "react";
import { useLocation, useNavigate } from "react-router";
const Book = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [author, setAuthor] = useState('');
    const [ISBN, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const navigate=useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const fetchData=async()=>{
        if(id==null){
            navigate("/student/books");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/books?id=' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Book Fetching Failed');
            }

            const data = await response.json();

            setTitle(data[0].title);
            setThumbnail(data[0].thumbnail); // Assuming data.thumbnail is the URL of the thumbnail
            setAuthor(data[0].author);
            setISBN(data[0].ISBN);
            setDescription(data[0].description);

        } catch (error) {
            console.error('Book Adding failed:', error.message);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div className="container4">
        <div className="left">
            <img src={thumbnail}></img>
        </div>

        <div className="right">
            <div>
            <h1>Title</h1>
            <p>{title}</p>
            </div>
            <div>
            <h1>Author</h1>
            <p>{author}</p>
            </div>
            <div>
            <h1>ISBN</h1>
            <p>{ISBN}</p>
            </div>
            <div>
            <h1>Description</h1>
            </div>

        </div>
    </div>
  )
}

export default Book