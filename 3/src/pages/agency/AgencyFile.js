import React, { useEffect, useState } from 'react';
import { configData } from '../../config/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import location  from "../../assets/Images/location.jpg";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaSliders } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import ItemBox from '../../components/item/ItemBox';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import PN from "persian-number";




const AgencyFile = () => {
    const { fileId } = useParams();
    const [agencyData, setAgencyData] = useState();
    const [agencyّFiles, setAgencyFiles] = useState([]);
    const [searchInput, setSearchInput] = useState();
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [noFile, setNoFile] = useState(false);
    const [selectedOoption, setSelectedOoption] = useState("");

    // if(agencyData.length ===0)
    //     setNoFile(true);
    
    let newUrl;
    if(selectedOoption==="0")
        newUrl= "real-estate/agency/" +fileId + "/files";
    else
        newUrl = "real-estate/agency/" +fileId + "/files?estateId=" + fileId + "&categoryId=" + selectedOoption;


        const persianNumber = (num) =>{
            // var number = PN.sliceNumber(num);
            var number = PN.convertEnToPe(num);
            return number;
        }

    const handleRadioChange = (event) => {
        let radio = event.target.value;
        setSelectedOoption(radio);
        let verify_link;
        if(radio==="0"){
            verify_link = configData.AgencyFile_API + fileId;}
        else{
            verify_link = configData.AgencyFile_API + fileId + "&categoryId=" + radio;}
        // console.log(verify_link)
        // window.history.pushState(null, '' , {newUrl})
        axios.get(verify_link)
            .then(response => {
                setAgencyFiles(response.data.data.files)
            })
            .catch(error => {
                console.error(error);
            });
    }

    // const radioClickHandler = (event) => {
    //     window.history.replaceState(null, newUrl);
    // }

    console.log(newUrl)

    const changeHandler = (event)=> {
        setSearchInput(event.target.value)
    }

    const searchHandler = () => {
        setAgencyFiles(agencyّFiles.filter(item => item.name.includes(searchInput)));
    }

    const deleteInputBoxHandler = () => {
        setSearchInput("");
    }

    useEffect(() => {
        const verify_link = configData.Agency_API + fileId;
        axios.get(verify_link)
            .then(response => {
                setAgencyData(response.data.data)
            })
            .catch(error => {
                console.error(error);
            });
        }, [])

    useEffect(() => {
        const verify_link = configData.AgencyFile_API + fileId;
        axios.get(verify_link)
            .then(response => {
                setAgencyFiles(response.data.data.files)
            })
            .catch(error => {
                console.error(error);
            });
        }, [])

        // console.log(agencyData)
        // console.log(selectedOoption)
        console.log(agencyّFiles)
    if (agencyData!=null) {
        let href_1="tel:"+agencyData.phoneNumber;
        let href_2="tel:"+agencyData.telephoneNumber;
    return (
        <div className='container lg-auto rounded-lg p-5 border mb-4'>
            <header className=' rounded-md shadow-md p-4 '>
                <div className='flex justify-between lg:items-center lg:flex-row flex-col items-start border-b-2 border-slate-100 pb-4'>
                    <div className='flex items-center'>
                        <div className='ml-5 w-[60px] h-[60px]'>
                            <img className='transition rounded-full duration-200 transform group-hover:scale-110 w-full h-full w-[50px] h-[50px]' src={agencyData.logoFile} />
                        </div>
                        <div>
                            <div className='flex'>
                                <span className='font-bold text-zinc-800 '>{agencyData.name}</span>
                                <div className='mr-3 flex items-center'>
                                    <span className='pl-1'>{persianNumber(agencyData.rate)}</span>
                                    <FaStar className='w-4 h-4 text-yellow-400'/>
                                </div>
                            </div>
                            <ul className='mt-2 flex items-center sm:flex-row flex-wrap'>
                                <li className='text-zinc-500 text-base font-medium pl-2 ml-2 mb-1.5 sm:border-l border-gray-500 border-opacity-20 last:ml-0 last:pl-0 w-fit-content last:border-0 flex items-center'>
                                    <span className='pe-1'>مدیریت :</span>
                                    <span>{agencyData.managerName}</span>
                                </li>
                                <li className='text-zinc-500 text-base font-medium pl-2 ml-2 mb-1.5 sm:border-l border-gray-500 border-opacity-20 last:ml-0 last:pl-0 w-fit-content last:border-0 flex items-center'>
                                    <a href={href_1}>
                                        <span>{persianNumber(agencyData.phoneNumber)}</span>
                                    </a>
                                </li>
                                <li className='text-zinc-500 text-base font-medium pl-2 ml-2 mb-1.5 sm:border-l border-gray-500 border-opacity-20 last:ml-0 last:pl-0 w-fit-content last:border-0 flex items-center'>
                                    <a href={href_2}>
                                        <span>{persianNumber(agencyData.telephoneNumber)}</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <ul className='flex justify-items-end text-base text-zinc-500 lg:w-auto w-full lg:mt-0 mt-5'>
                        <li className='border border-zinc-200 rounded-lg grow text-center'>
                            <a className='px-6 py-1 text-sm transition duration-200 whitespace-nowrap hover:text-blue-700 text-gray-500' href='/real-estate/agency/1/comments'>ثبت امتیاز</a>
                        </li>
                        <li className='border border-zinc-200 rounded-lg grow text-center mx-4 '>
                            <a className='px-6 py-1 text-sm transition duration-200 whitespace-nowrap hover:text-blue-700 text-gray-500' href='/profile/files/create/1'>ثبت فایل</a>
                        </li>
                        <li className='border border-zinc-200 rounded-lg grow text-center '>
                            <a className='px-6 py-1 text-sm transition duration-200 whitespace-nowrap hover:text-blue-700 text-gray-500' href='/profile/request/requestid/create/1'>ثبت درخواست</a></li>
                    </ul>
                </div>
                <div className='flex justify-between items-center pt-4'>
                    <div className='flex lg:w-full flex-wrap w-full '>
                        <div className='flex order-1'>
                            <div className='w-5 h-5 text-[#82b6cc]'>
                                <FaMapLocationDot />
                            </div>
                            <span className='pr-2 pl-1 font-semibold text-zinc-800 '>آدرس :</span>
                        </div>
                        <span className='lg:order-2 order-3 lg:mt-0 mt-2 lg:w-auto w-full'>{agencyData.address}</span>
                        <a className='mr-auto block lg:order-3 order-2' href='/real-estate/agency/1'>
                            <div className='bg-slate-300 rounded px-2 py-1 text-xs'>اطلاعات بیشتر</div>
                        </a>
                    </div>
                </div>
            </header>
            <div className='flex flex-row'>
                <div className='w-[15vw] pt-6 xl:block hidden'>
                    <div className=' rounded border border-slate-200 '>
                        <div className='w-full cursor-pointer  '>
                            <div onClick={()=>setAccordionOpen(!accordionOpen)} className='flex items-center mx-4 my-5'>
                                <h3 className='font-semibold text-sm pr-2'>نوع</h3>
                                <button className='rounded-full group hover:bg-gray-100 p-1 mr-auto'>
                                    <MdKeyboardArrowDown />
                                </button>
                            </div>
                        </div>
                        <div className={`${accordionOpen? "" : "hidden" }`}>
                            <div className='border-t'>
                                <div className='flex px-6 py-2 hover:bg-slate-50'>
                                    <div className='ml-2'>
                                            <Link to={`/${newUrl}`}>
                                            <input 
                                            type='radio' 
                                            name='category' 
                                            className='w-4 h-4 bg-gray-200 hover:bg-gray-300 cursor-pointer checked:accent-zinc-500 border-3 border-amber-500 focus:outline-none rounded-lg'
                                            value="0"
                                            onChange={handleRadioChange}
                                            checked={selectedOoption === "0"}
                                            />
                                            </Link>
                                    </div>
                                    <div className='text-sm font-medium'>
                                        همه({agencyData.countOnSale+agencyData.countRent+agencyData.countConstruction})
                                    </div>
                                </div>
                                    <div className='flex px-6 py-2 hover:bg-slate-50'>
                                    <div className='ml-2'>
                                        <Link to={`/${newUrl}`}>
                                        <input 
                                        type='radio' 
                                        name='category' 
                                        className='w-4 h-4 bg-gray-200 hover:bg-gray-300 cursor-pointer checked:accent-zinc-500 border-3 border-amber-500 focus:outline-none rounded-lg'
                                        value="1"
                                        onChange={handleRadioChange}
                                        // onClick={radioClickHandler}
                                        checked={selectedOoption === "1"}
                                        />
                                        </Link>
                                        
                                    
                                    </div>                          
                                    <div className='text-sm font-medium'>
                                        فروشی({agencyData.countOnSale})
                                    </div>
                                </div>
                                <div className='flex px-6 py-2 hover:bg-slate-50'>
                                    <div className='ml-2'>
                                        <Link to={`/${newUrl}`}>
                                        <input 
                                        type='radio' 
                                        name='category' 
                                        className='w-4 h-4 bg-gray-200 hover:bg-gray-300 cursor-pointer checked:accent-zinc-500 border-3 border-amber-500 focus:outline-none rounded-lg'
                                        value="2"
                                        onChange={handleRadioChange}
                                        checked={selectedOoption === "2"}
                                        />
                                        </Link>
                                    </div>
                                    <div className='text-sm font-medium'>
                                        اجاره ای({agencyData.countRent})
                                    </div>
                                </div>
                                <div className='flex px-6 py-2 hover:bg-slate-50'>
                                    <div className='ml-2'>
                                        <Link to={`/${newUrl}`}>
                                        <input 
                                        type='radio' 
                                        name='category' 
                                        className='w-4 h-4 bg-gray-200 hover:bg-gray-300 cursor-pointer checked:accent-zinc-500 border-3 border-amber-500 focus:outline-none rounded-lg'
                                        value="3"
                                        onChange={handleRadioChange}
                                        checked={selectedOoption === "3"}
                                        />
                                        </Link>
                                    </div>
                                    <div className='text-sm font-medium'>
                                        ساخت و ساز({agencyData.countConstruction})
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <main className='pt-6 lg:pr-6 pr-0 w-[66vw] text-justify text-zinc-800 flex-grow '>
                    <div className='flex w-full items-center justify-between'>
                        <h6 className='font-semibold text-zinc-800 lg:block hidden'>فایل ها</h6>
                        <div className='flex items-center mr-auto grow sm:mx-0 mb-3 justify-end'>
                            <div className='relative search-box show lg:w-auto w-full'>
                                <label className='flex items-center p-1 grow border border-gray-200 w-full rounded-md overflow-hidden pr-2 flex-1'>
                                    {searchInput && <button className='rounded-full group hover:bg-gray-100 p-1 ' onClick={deleteInputBoxHandler}>
                                        <IoMdClose className='text-[20px]'/>
                                    </button>}
                                    <button className='rounded-full group hover:bg-gray-100 p-1' onClick={searchHandler}>
                                        <FaSearch className='text-[gray] text-[17px]' />
                                    </button>
                                    <span className='block bg-gray-200 h-6 w-[1px] m-1'></span>
                                    <input className='outline-none p-2 w-full text-sm bg-white' type='text' placeholder='جستجو' value={searchInput} onChange={changeHandler}/>
                                </label>
                            </div>
                            <a className=' border border-gray-200 rounded-md p-[10px] mr-2 ml-2 font-medium transition duration-200 whitespace-nowrap hover:text-blue-700text-gray-500' href='/filter/estate/1'>
                                <FaSliders className='text-[gray] text-[25px]' />  
                            </a>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-3 will-change-scroll sm:grid-cols-2 '>
                    {/* {noFile && <p>فایلی یافت نشد.</p>} */}
                    {agencyّFiles!=null ? agencyّFiles.map((item, index) => (
                            <Link to={`/files/${item.id}`} key={index}>
                                <ItemBox
                                    fullcategory={item.fullCategory.fullCategory}
                                    name={item.name}
                                    properties={item.property}
                                    publishedAgo={item.publishedAgo}
                                    cityName={item.city.name}
                                    media={item.media}
                                    totalPrice={item.property[1].valueItem}
                                />
                            </Link>
                            // <p>{item.category.fullCategory}</p>
                        )) : <p>فایلی یافت نشد.</p>}
                    </div>
                    <div className='items-center mx-auto mt-10 w-[50px]'>
                        <div className='rounded bg-[#39416e] p-1 text-[#fff] shadow-md'>بیشتر..!</div>
                    </div>
                </main>
            </div>
        </div>
    );
};
}
export default AgencyFile;