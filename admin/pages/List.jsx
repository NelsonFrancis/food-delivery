import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const List = () => {
  const [listItems, setListItems] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/food/allFoods`);
    if(res.data.success){
      setListItems(res.data.data);
    }else{
      toast.error("Coudn't fetch data");
    }
  }

  const removeListItem = async(id) => {
    const res = await axios.post(`${import.meta.env.VITE_URL}/api/food/removeFood`, {id});
    if(res.data.success){
      toast.success("Food removed!!!");
    }else{
      toast.error("Error!!!")
    }
    await fetchList();
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          listItems.map((item, index) => {
            return(
              <div key={index} className="list-table-format">
                <img src={`${import.meta.env.VITE_URL}/images/`+item.image} alt='img' />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeListItem(item._id)} className='delete-list-item'>x</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List