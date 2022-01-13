import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState()

  useEffect(() => {
    async function getImages() {
      const result = await axios.get('/api/images')
      setImages(result.data.images)
      console.log(result.data.images)
    }
    getImages()
  }, [])

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("image", file)
    formData.append("description", description)

    const result = await axios.post('/api/images', formData, 
    { headers: 
      {'Content-Type': 'multipart/form-data'}
    }
    )
    setImages([result.data.image, ...images])
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
      {images && images.map(img => (
      <div key={img.id}>
        <img src={img.file_path}/>
        <p>{img.description}</p>
      </div>
      ))}
    </div>
  )
}
