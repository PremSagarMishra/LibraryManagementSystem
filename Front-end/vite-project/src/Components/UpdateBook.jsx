import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useLocation } from 'react-router';const UpdateBook = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [author, setAuthor] = useState('');
    const [ISBN, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const fetchData = async () => {
        const key = localStorage.getItem("key");
        try {
            const response = await fetch('http://localhost:3000/admin/books?auth=' + key + "&id=" + id, {
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
            setTags(data[0].tags);

        } catch (error) {
            console.error('Book Adding failed:', error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async () => {
        const key = localStorage.getItem("key");
        try {
            const response = await fetch('http://localhost:3000/admin/books?auth=' + key, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title, thumbnail, author, ISBN, description, tags })
            });

            if (!response.ok) {
                throw new Error('Book updating failed');
            }

            const data = await response.text();
            setTitle(data.title);
            setThumbnail(data.thumbnail); // Assuming data.thumbnail is the URL of the thumbnail
            setAuthor(data.author);
            setISBN(data.ISBN);
            setDescription(data.description);
            setTags(data.tags);

            fetchData()
            alert("Data updated successfully");

        } catch (error) {
            console.error('Book Adding failed:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 style={{ fontSize: "44px", textAlign: "center", marginBottom: "20px" }}>Add <span style={{ color: "green" }}>Book</span></h1>
                <img
                    src={thumbnail.startsWith('data:') ? thumbnail : new URL(thumbnail, window.location.origin).href}
                alt="Thumbnail"
                style={{ maxWidth: '200px' }}
                />

<input
                    id="thumbnail"
                    type='file'
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                setThumbnail(reader.result);
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <TextField
                    id="author"
                    label="Author"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    id="ISBN"
                    label="ISBN"
                    variant="outlined"
                    value={ISBN}
                    onChange={(e) => setISBN(e.target.value)}
                />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    id="tags"
                    label="Tags"
                    variant="outlined"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            </div>
        </div>
    );
}

export default UpdateBook;
