import { 
  Container, Typography, TextField, Button, 
  Box, Select, MenuItem, IconButton 
} from "@mui/material";
import React, { useContext, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import {toast} from 'react-toastify'
import { SyncLoader } from "react-spinners";
import { Materials } from "../../Context/Context";

const AddProduct = () => {
  const{ BackendUrl,token,listFish}=useContext(Materials)
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const[loading,setLoading]=useState(false)
  const [data,setData]=useState({
  name:"",
  category:"",
  price:"",
  stock:"inStock",
  description1:"",
  description2:"",
  description3:""
  }) 
 
 const onchangeHandler=(e)=>{
const {value,name}=e.target;
setData((prev)=>({...prev,[name]:value}))
}
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file)
       setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
const onSubmitHandler=async(e)=>{
  e.preventDefault();
  setLoading(true)
  const validFileTypes = ["image/jpeg", "image/png", "image/webp","image/jpg","image/avif"];
  if (image && !validFileTypes.includes(image.type)) {
    toast.error('Please select a valid image file.');
    return;
  }
const formData=new FormData();

formData.append("name",data.name);
formData.append("category",data.category);
formData.append("description1",data.description1);
formData.append("description2",data.description2);
formData.append("description3",data.description3);
formData.append("price",Number(data.price));
formData.append('image',image)
formData.append("stock",data.stock==='inStock'?true:false);
try {
  const {data}= await axios.post(`${BackendUrl}/api/fish/upload`,formData,{headers:{Authorization:`Bearer ${token}`}});
if(data.succes){
await listFish(token);
setData({
  name:"",
  category:"",
  price:"",
  stock:"inStock",
  description1:"",
  description2:"",
  description3:""
}
  )
  setPreview(null)
  setImage(null)
  toast.success(data.message)
  setLoading(false)
}
else{
toast.error(data.message)
}
} catch (error) {
  toast.error(error.response.data.message)
  console.log(error)
}
}

  return (
    <Box sx={{ width: "85%" }}>
      <Container maxWidth="lg" sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={onSubmitHandler} >
          <Box display="flex" gap={2} flexDirection="column">
            <Typography variant="subtitle1">Upload Image</Typography>

            {/* Image Upload Section */}
            <label htmlFor="upload-image">
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px dashed gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                {image ? (
                  <img
                    src={preview}
                    alt="Uploaded Preview"
                    style={{ width:"100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <UploadFileIcon
                  sx={{
                    width: { xs: 30, sm: 50, md: 60 }, // Adjust size based on screen width
                    height: { xs: 30, sm: 50, md: 60 },
                    color: "gray",
                  }}
                />
                
                )}
              </Box>
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Box>

          {/* Product Details Fields */}
          <TextField
           label="Product Name"
          name="name" variant="outlined" margin="normal"
          value={data.name}
          onChange={onchangeHandler}
          required />

          <TextField sx={{ marginLeft: {xs:'0',sm:'0',lg:'20px'},
          width:{ xs: "100%", sm: "100%", md: "auto" }}} 
          label="Category"
          name="category"
          value={data.category}
          variant="outlined" 
          margin="normal"
          onChange={onchangeHandler}
          required />

          <TextField sx={{ marginLeft: {xs:'0',sm:'0',lg:'20px'},
          width:{ xs: "100%", sm: "100%", md: "auto" }}} 
          label="Price"
          name="price" 
          type="number" 
          value={data.price}
          variant="outlined" 
          margin="normal" 
          onChange={onchangeHandler}
          required />

          {/* Stock Status Dropdown */}
          <Select 
          sx={{ marginLeft: "18px",marginTop:'15px',
          width:{ xs: "100%", sm: "100%", md: "auto" }}}
          name='stock'
          onChange={onchangeHandler}
          value={data.stock}>
          
          <MenuItem value="inStock">In Stock</MenuItem>
          <MenuItem value="outOfStock">Out of Stock</MenuItem>
          </Select>

          {/* Descriptions */}
          <TextField fullWidth label="Description1 (10 words)" name="description1" value={data.description1} variant="outlined" margin="normal" multiline rows={2} onChange={onchangeHandler} required/>
          <TextField fullWidth label="Description2 (20 words)" name="description2" value={data.description2} variant="outlined" margin="normal" multiline rows={3} onChange={onchangeHandler} required/>
          <TextField fullWidth label="Detailed Description" name="description3" value={data.description3} variant="outlined" margin="normal" multiline rows={4} onChange={onchangeHandler} required/>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="success">
            {
            loading?(
              <SyncLoader color="#fff" size={12} />
              ):(
                <>
            Add Product
            </>
            )
            }
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default AddProduct;
