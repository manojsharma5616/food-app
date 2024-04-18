import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchData from './components/SearchData';

export const BASE_URL = "http://localhost:9000";
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {

    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        // console.log(json);
        setData(json);
        setFilterData(json);
        setLoading(false);
      }
      catch (error) {
        setError("Unable to fetch data");
      }
    }
    fetchFoodData();
  }, []);
  // console.log(data);
  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  // const temp = [{
  //   "name": "Boilded Egg",
  //   "price": 10,
  //   "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   "image": "/images/egg.png",
  //   "type": "breakfast"
  // },
  // {
  //   "name": "RAMEN",
  //   "price": 25,
  //   "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  //   "image": "/images/ramen.png",
  //   "type": "lunch"
  // },];
  const searchFood = (e) => {
    const searchValue = e.target.value;
    // console.log(searchValue);
    if (searchValue === "") {
      setFilterData(data);
    }
    else {
      const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilterData(filter);
    }
  }

  // filter button
  const filterFood = (type) => {
    if (type === 'all') {
      setFilterData(data);
      setSelectedBtn('all');
      return;
    }
    else {
      const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
      setFilterData(filter);
      setSelectedBtn(type);
    }
  }
  const filterBtns = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ]
  return (
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="./images/logo.svg" alt="logo" />
        </div>
        <div className='search'>
          <input type="text" placeholder='Search Food' onChange={searchFood} />
        </div>
      </TopContainer>
      <FilterContainer>
        {filterBtns.map((value) => (
          <Button isSelected={selectedBtn===value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>)
        )}

        {/* <Button onClick={()=>filterFood("all")}>All</Button>
        <Button onClick={()=>filterFood("breakfast")}>Breakfast</Button>
        <Button onClick={()=>filterFood("lunch")}>Lunch</Button>
        <Button onClick={()=>filterFood("dinner")}>Dinner</Button> */}
      </FilterContainer>
      {/* <SearchData data={data}></SearchData> */}
      <SearchData data={filterData}></SearchData>
    </Container>
  );
}
export default App;
const Container = styled.div``;
const TopContainer = styled.div`
background-color:#323334;
min-height:140px;
display:flex;
justify-content:space-between;
padding:16px;
align-items:center;
.search input{
  background-color: transparent;
  border: 1px solid red;
  color: White;
  padding: 4px;
  font-size: 16px;
  height: 40px;
  max-width: 285px;
  outline: none;
  border-radius: 8px;
  &::placeholder{
    color: white;
  }
}
@media (0 < width < 600px) {
  flex-direction: column;
}`;
const FilterContainer = styled.section`
display: flex;
justify-content: center;
gap: 10px;
align-items: center;
padding-bottom: 15px;
background-color:#323334;
`;
export const Button = styled.button`
/* background-color: #FF4343; */
background-color: ${(props)=>(props.isSelected ? "#f22f2f":"#ff4343")};
color:white;
border-radius: 5px;
padding: 5px 15px;
border: none;
font-size: 18px;
cursor: pointer;
outline: 1px solid ${(props)=>(props.isSelected ? "white":"#ff4343")};
border: 1px solid transparent;
&:hover{
  background-color:#b33636;
border: 1px solid white;
}
@media (0 < width < 600px) {
  font-size:15px;
  padding: 3px 8px;
}
`;