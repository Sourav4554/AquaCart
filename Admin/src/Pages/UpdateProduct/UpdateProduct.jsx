import React, { useContext ,useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Materials } from '../../Context/Context';
import { SyncLoader } from "react-spinners";
import axios from 'axios';
import { 
    Container, Typography, TextField, Button, 
    Box, Select, MenuItem, IconButton 
  } from "@mui/material";
  import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from 'react-toastify';

const UpdateProduct = () => {
const {fishList,BackendUrl,token,listFish}=useContext(Materials)
const navigate=useNavigate()
const[loading,setLoading]=useState(false)
//make the fishlist a array
const fishes = Array.isArray(fishList) ? fishList : [];
const {id}=useParams();
const product=fishes.find((item)=>item._id===id)
const [image, setImage] = useState(null);
const [preview,setPreview]=useState(null)
const[data,setData]=useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description1: "",
    description2: "",
    description3: "",
})

//Pre-fill form when product is found
  useEffect(() => {
    if (product) {
      setData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock ? "inStock" : "outOfStock",
        description1: product.description1,
        description2: product.description2,
        description3: product.description3,
      });
      setImage(product.image); // Show existing image
      setPreview(product.image)
    }
  }, [product]);

  //take values from form
 const onchangeHandler=(e)=>{
const {value,name}=e.target;
setData((prev)=>({...prev,[name]:value}))
}
// Handle image upload
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  //function for update product
  const updateProduct=async(event)=>{
  event.preventDefault();
  setLoading(true);
  const validFileTypes = ["image/jpeg", "image/png", "image/webp","image/jpg","image/avif"];
  // Validate only if image is a newly uploaded file
if (image instanceof File && !validFileTypes.includes(image.type)) {
  toast.error('Please select a valid image file.');
  return;
}
  const formData=new FormData();
  formData.append("productId", id);
  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append('image',image)
  formData.append("price", data.price);
  formData.append("stock",data.stock==='inStock'?true:false);
  formData.append("description1", data.description1);
  formData.append("description2", data.description2);
  formData.append("description3", data.description3);
  try {
    const {data}=await axios.put(`${BackendUrl}/api/fish/update-fish`,formData,{headers:{Authorization:`Bearer ${token}`}});
    if(data.success){
    toast.success(data.message);
    setLoading(false)
    await listFish();
    navigate('/products');
    }
    else{
    toast.error(data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
  }
  return (
    <Box sx={{ width: "85%" }}>
    <Container maxWidth="lg" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Update Product
      </Typography>
      <form onSubmit={updateProduct}>
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
        value={data.stock}
        onChange={onchangeHandler}
       >
        
        <MenuItem value="inStock">In Stock</MenuItem>
        <MenuItem value="outOfStock">Out of Stock</MenuItem>
        </Select>

        {/* Descriptions */}
        <TextField fullWidth label="Description1 (10 words)" name="description1" value={data.description1}  variant="outlined" margin="normal" multiline rows={2}   onChange={onchangeHandler} required/>
        <TextField fullWidth label="Description2 (20 words)" name="description2" value={data.description2} variant="outlined" margin="normal" multiline rows={3}   onChange={onchangeHandler} required/>
        <TextField fullWidth label="Detailed Description" name="description3" value={data.description3} variant="outlined" margin="normal" multiline rows={4}   onChange={onchangeHandler} required/>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="success">
          {
          loading?(
            <SyncLoader size={12} color='#fff'/>
            ):(
              <>
          Update Product
          </>
          )
          }
        </Button>
      </form>
    </Container>
  </Box>
  )
}

export default UpdateProduct