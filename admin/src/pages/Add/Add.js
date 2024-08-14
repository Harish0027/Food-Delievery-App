import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Salad");

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", Number(price));
    formData.append("category", category);
    formData.append("description", description);

    try {
      const res = await axios.post("http://localhost:3004/api/food/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message)
        setName("");
        setImage(null);
        setDescription("");
        setPrice("");
        setCategory("Salad"); // Reset category to default after submission
      }else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.error("Error adding food item:", error);

      alert("Failed to add food item. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="flex-col add-img-upload">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={handleImageChange} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Type here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea
            type="text"
            name="description"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write content here"
            required
          />
        </div>
        <div className="price">
          <div className="add-product-price flex-col">
            <p>Price</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Write price here"
              required
            />
          </div>
          <div className="add-product-category flex-col">
            <p>Category</p>
            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select category</option>
              <option value={"Salad"}>Salad</option>
              <option value={"Rolls"}>Rolls</option>
              <option value={"Deserts"}>Deserts</option>
              <option value={"Sandwich"}>Sandwich</option>
              <option value={"Cake"}>Cake</option>
              <option value={"Pure Veg"}>Pure Veg</option>
              <option value={"Pasta"}>Pasta</option>
              <option value={"Noodles"}>Noodles</option>
            </select>
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
