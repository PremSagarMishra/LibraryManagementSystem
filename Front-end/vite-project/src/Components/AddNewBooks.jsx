import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddNewBook = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [author, setAuthor] = useState('');
    const [ISBN, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleAddBook = async () => {
        const key = localStorage.getItem("key");
        try {
            const response = await fetch('http://localhost:3000/admin/books?auth=' + key, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, thumbnail, author, ISBN, description, tags })
            });

            if (!response.ok) {
                throw new Error('Book adding failed');
            }

            const data = await response.text();
            alert(data);

            if (data.startsWith("Error")) {
                return;
            }

            setTitle('');
            setThumbnail('');
            setAuthor('');
            setISBN('');
            setDescription('');
            setTags('');

        } catch (error) {
            console.error('Book Adding failed:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 style={{ fontSize: "44px", textAlign: "center", marginBottom: "20px" }}>Add <span style={{ color: "green" }}>Book</span></h1>
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    id="thumbnail"
                    label="Thumbnail URL"
                    type='file'
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
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
                    onClick={handleAddBook}
                >
                    Add
                </Button>
            </div>
        </div>
    );
}

export default AddNewBook;
