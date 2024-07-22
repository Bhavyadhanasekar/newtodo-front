// import { useEffect, useState } from 'react';

// export default function Todo() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [editId, setEditId] = useState(-1);
//   const [editTitle, setEditTitle] = useState('');
//   const [editDescription, setEditDescription] = useState('');

//   // Use a single URL for API requests
//   const apiUrl = process.env.NODE_ENV === 'production' 
//     ? 'https://newtodo-b.onrender.com/todos' 
//     : 'http://localhost:5000/todos';

//   // Fetch todos on component mount
//   useEffect(() => {
//     fetch(apiUrl)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error('Network response was not ok');
//         }
//       })
//       .then((data) => {
//         setTodos(data);
//       })
//       .catch(() => {
//         setError('Unable to fetch Todo items');
//       });
//   }, [apiUrl]);

//   const handleSubmit = () => {
//     setError('');
//     if (title.trim() !== '' && description.trim() !== '') {
//       fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, description }),
//       })
//         .then((res) => {
//           if (res.ok) {
//             return res.json();
//           } else {
//             throw new Error('Network response was not ok');
//           }
//         })
//         .then((data) => {
//           setTodos([...todos, data]);
//           setTitle('');
//           setDescription('');
//           setMessage('Item added successfully');
//           setTimeout(() => {
//             setMessage('');
//           }, 3000);
//         })
//         .catch(() => {
//           setError('Unable to create Todo item');
//         });
//     }
//   };

//   const handleEdit = (item) => {
//     setEditId(item._id);
//     setEditTitle(item.title);
//     setEditDescription(item.description);
//   };

//   const handleUpdate = () => {
//     setError('');
//     if (editTitle.trim() !== '' && editDescription.trim() !== '') {
//       fetch(`${apiUrl}/${editId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: editTitle, description: editDescription }),
//       })
//         .then((res) => {
//           if (res.ok) {
//             return res.json();
//           } else {
//             throw new Error('Network response was not ok');
//           }
//         })
//         .then((data) => {
//           const updatedTodos = todos.map((item) => {
//             if (item._id === editId) {
//               return data;
//             }
//             return item;
//           });

//           setTodos(updatedTodos);
//           setEditTitle('');
//           setEditDescription('');
//           setMessage('Item updated successfully');
//           setTimeout(() => {
//             setMessage('');
//           }, 3000);

//           setEditId(-1);
//         })
//         .catch(() => {
//           setError('Unable to update Todo item');
//         });
//     }
//   };

//   const handleEditCancel = () => {
//     setEditId(-1);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete?')) {
//       fetch(`${apiUrl}/${id}`, {
//         method: 'DELETE',
//       })
//         .then(() => {
//           const updatedTodos = todos.filter((item) => item._id !== id);
//           setTodos(updatedTodos);
//         })
//         .catch(() => {
//           setError('Unable to delete Todo item');
//         });
//     }
//   };

//   return (
//     <>
//       <div className="row p-3 bg-success text-light">
//         <h1>ToDo List TO MAKE LIFE EASIER</h1>
//       </div>
//       <div className="row">
//         <h3>Add Item</h3>
//         {message && <p className="text-success">{message}</p>}
//         <div className="form-group d-flex gap-2">
//           <input
//             placeholder="Title"
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//             className="form-control"
//             type="text"
//           />
//           <input
//             placeholder="Description"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//             className="form-control"
//             type="text"
//           />
//           <button className="btn btn-dark" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//       </div>
//       <div className="row mt-3">
//         <h3>Tasks</h3>
//         <div className="col-md-6">
//           <ul className="list-group">
//             {todos.map((item) => (
//               <li
//                 key={item._id}
//                 className="list-group-item bg-info d-flex justify-content-between align-items-center my-2"
//               >
//                 <div className="d-flex flex-column me-2">
//                   {editId === -1 || editId !== item._id ? (
//                     <>
//                       <span className="fw-bold">{item.title}</span>
//                       <span>{item.description}</span>
//                     </>
//                   ) : (
//                     <div className="form-group d-flex gap-2">
//                       <input
//                         placeholder="Title"
//                         onChange={(e) => setEditTitle(e.target.value)}
//                         value={editTitle}
//                         className="form-control"
//                         type="text"
//                       />
//                       <input
//                         placeholder="Description"
//                         onChange={(e) => setEditDescription(e.target.value)}
//                         value={editDescription}
//                         className="form-control"
//                         type="text"
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className="d-flex gap-2">
//                   {editId === -1 || editId !== item._id ? (
//                     <>
//                       <button
//                         className="btn btn-success"
//                         onClick={() => handleEdit(item)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => handleDelete(item._id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button className="btn btn-success" onClick={handleUpdate}>
//                         Update
//                       </button>
//                       <button
//                         className="btn btn-danger"
//                         onClick={handleEditCancel}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

































import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // Fixed typo here
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);

    // Edit state
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState(""); // Fixed typo here

    const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://todolist-k2az.onrender.com' 
        : 'http://localhost:8000';

    // Function to fetch items
    const getItems = () => {
        fetch(`${apiUrl}/todos`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setTodos(data);
            })
            .catch((err) => {
                setError('Failed to fetch todos');
                console.error(err);
            });
    };

    useEffect(() => {
        getItems();
    }, [getItems]); // Ensure getItems is included in dependency array

    const handleSubmit = () => {
        setError("");
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(`${apiUrl}/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then((data) => {
                    setTodos([...todos, data]);
                    setTitle("");
                    setDescription(""); // Fixed typo here
                    setMessage("Item added successfully");
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                })
                .catch(() => {
                    setError("Unable to create Todo item");
                });
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description); // Fixed typo here
    };

    const handleUpdate = () => {
        setError("");
        if (editTitle.trim() !== '' && editDescription.trim() !== '') { // Fixed typo here
            fetch(`${apiUrl}/todos/${editId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editTitle, description: editDescription }) // Fixed typo here
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(() => {
                    const updatedTodos = todos.map((item) => {
                        if (item._id === editId) {
                            return { ...item, title: editTitle, description: editDescription }; // Fixed typo here
                        }
                        return item;
                    });
                    setTodos(updatedTodos);
                    setEditTitle("");
                    setEditDescription(""); // Fixed typo here
                    setMessage("Item updated successfully");
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                    setEditId(-1);
                })
                .catch(() => {
                    setError("Unable to update Todo item");
                });
        }
    };

    const handleEditCancel = () => {
        setEditId(-1);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(`${apiUrl}/todos/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    setTodos(todos.filter((item) => item._id !== id));
                })
                .catch(() => {
                    setError("Unable to delete Todo item");
                });
        }
    };

    return (
        <>
            <div className="row p-3 bg-success text-light">
                <h1>ToDo Project with MERN stack</h1>
            </div>
            <div className="row">
                <h3>Add Item</h3>
                {message && <p className="text-success">{message}</p>}
                <div className="form-group d-flex gap-2">
                    <input 
                        placeholder="Title" 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                        className="form-control" 
                        type="text" 
                    />
                    <input 
                        placeholder="Description" 
                        onChange={(e) => setDescription(e.target.value)} // Fixed typo here
                        value={description} 
                        className="form-control" 
                        type="text" 
                    />
                    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="row mt-3">
                <h3>Tasks</h3>
                <div className="col-md-6">
                    <ul className="list-group">
                        {todos.map((item) => (
                            <li key={item._id} className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                                <div className="d-flex flex-column me-2">
                                    {editId === -1 || editId !== item._id ? (
                                        <>
                                            <span className="fw-bold">{item.title}</span>
                                            <span>{item.description}</span>
                                        </>
                                    ) : (
                                        <div className="form-group d-flex gap-2">
                                            <input 
                                                placeholder="Title" 
                                                onChange={(e) => setEditTitle(e.target.value)} 
                                                value={editTitle} 
                                                className="form-control" 
                                                type="text" 
                                            />
                                            <input 
                                                placeholder="Description" 
                                                onChange={(e) => setEditDescription(e.target.value)} // Fixed typo here
                                                value={editDescription} 
                                                className="form-control" 
                                                type="text" 
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="d-flex gap-2">
                                    {editId === -1 ? (
                                        <>
                                            <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
                                            <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
