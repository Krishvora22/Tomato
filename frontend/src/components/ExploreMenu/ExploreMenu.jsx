import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets.js'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delicious array of dishes crafted with the finest ingredients and culinary expertise.Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu


// import React from 'react';
// import { menu_list } from '../../assets/assets.js';

// const ExploreMenu = ({ category, setCategory }) => {
//   return (
//     <div className="flex flex-col gap-5" id="explore-menu">
//       <h1 className="text-[#262626] font-medium text-2xl md:text-3xl">Explore our menu</h1>

//       <p className="text-gray-500 max-w-[60%] text-sm md:text-base md:max-w-[60%]">
//         Choose from a diverse menu featuring a delicious array of dishes crafted with the finest ingredients and culinary expertise.
//         Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
//       </p>

//       <div className="flex gap-8 items-center justify-between overflow-x-scroll text-center my-5 scrollbar-hide">
//         {menu_list.map((item, index) => {
//           const isActive = category === item.menu_name;
//           return (
//             <div
//               key={index}
//               onClick={() =>
//                 setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
//               }
//               className="flex flex-col items-center justify-center cursor-pointer min-w-[80px]"
//             >
//               <img
//                 src={item.menu_image}
//                 alt=""
//                 className={`w-[7.5vw] min-w-[80px] rounded-[20%] transition duration-200 ${
//                   isActive ? 'border-[4px] border-[tomato] rounded-[55px] p-[2px]' : ''
//                 }`}
//               />
//               <p className="mt-2 text-[#747474] text-[16px] md:text-[max(1.4vw,16px)]">{item.menu_name}</p>
//             </div>
//           );
//         })}
//       </div>

//       <hr className="my-2 h-[2px] bg-[#e2e2e2] border-none" />
//     </div>
//   );
// };

// export default ExploreMenu;
