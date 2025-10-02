import React from 'react'
import { assets } from '../src/assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast, Slide } from 'react-toastify'

const Add = () => {
    const url = "http://localhost:4000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if(!image || data.name === "" || data.description === "" || data.price === ""){
            toast.warn('All fileds are mandatory!!!');
            return;
        }
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        const res = await axios.post(`${url}/api/food/add`, formData);
        if(res.data.success){
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            });
            setImage(false);
            console.log(res.data);
            toast.success('Food added!!!');
        }else{
            console.log(res)
        }
    }


  return (
    <div className='add'>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload image</p>
                <label className='file-label' htmlFor='image'>
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='img' />
                </label>
                <input type='file' onChange={(e)=>setImage(e.target.files[0])} id='image' hidden />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input type='text' onChange={onChangeHandler} value={data.name} name='name' placeholder='Type here' />
            </div>
            <div className="add-product-descritpion flex-col">
                <p>Product description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} placeholder='Write content here' rows="6"></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name='category' onChange={onChangeHandler} value={data.category}>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input type='number' onChange={onChangeHandler} value={data.price} name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-btn'>Add</button>
        </form>
    </div>
  )
}

export default Add