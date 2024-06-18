import React from 'react';
import { Link } from "react-router-dom";
import notImage from "../../assets/Images/notImage.svg";
import PN from "persian-number";


const ItemBox = ({ fullcategory, media, name, properties, publishedAgo, cityName, totalPrice }) => {

    const pricePermeter = (totalprice, meter) => {
        const permeter = totalprice / meter
        return Math.ceil(permeter);
    }

    const persianNumber = (num) =>{
        var number = PN.sliceNumber(num);
        number = PN.convertEnToPe(number);
        return number;
    }

    const getImage = () => {
        if (media.Image.length !=0)
            return media.Image[0].path;
        else
            return notImage;
    }

    // console.log(media)
    // const getPrices = () => {
    //     if (fullcategory ==="فروشی - آپارتمان" || fullcategory==="فروشی - زمین و کلنگی")

    // }

    return (
        // <div className='mt-[20px] p-[50px]'>{name}</div>
        <div className=" h-[150px] grid grid-cols-3 items-center border border-gray-400/50 shadow-sm rounded p-3 hover:bg-gray-100 border-gray-100 bg-white relative">
            <div className='col-span-1 h-28 '>
                <div className='relative w-full h-full bg-slate-300 rounded'>
                    <img src={getImage()} className='object-cover rounded w-full h-full' alt="apartment" />
                </div>
            </div>
            <div className='col-span-2 mr-[8px]'>
                <div className='flex justify-between items-center ' >
                    <div className='text-md font-bold break-words w-full my-1'>{name}</div>
                </div>
                <div className=' flex items-center' >
                    <p className='whitespace-nowrap text-[0.623rem] font-bold my-2'>{fullcategory}</p>
                    <span className='block bg-gray-400 h-4 w-[1px] mx-1'></span>
                    <div className='text-[10px] font-light text-right'>
                        {publishedAgo}
                        <span className="before:content-['|'] before:px-1"></span>
                        {cityName}
                    </div>
                    <p className='truncate text-sm font-bold'></p>
                </div>
                {(properties[1]) &&
                <div>
                    <div className='flex'>
                        <p className='me-3 font-bold text-sm'>{properties[1].name}</p>
                        <p className='text-bold'>{persianNumber(totalPrice)}</p>
                    </div>
                </div>
                }
                {(properties[2]) && properties[2].name==="اجاره"&&
                <div>
                    <div className='flex'>
                        <p className='me-3 font-bold text-sm'>{properties[2].name}</p>
                        <p className='text-bold'>{persianNumber(properties[2].valueItem)}</p>
                    </div>
                </div>
                }
                {properties[0] && properties[0].name=== "متراژ"&&properties[1].name==="قیمت کل"&&
                <div>
                    <div className='flex text-sm'>
                        <p className='me-3'>قیمت هر متر</p>
                        <p className='font-thin'>{persianNumber(pricePermeter(totalPrice, properties[0] && properties[0].valueItem))}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default ItemBox;