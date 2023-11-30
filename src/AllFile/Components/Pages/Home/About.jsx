import React from 'react';

const About = () => {
    return (
        <div className='w-full h-max py-10 rounded-lg border-black bg-[#af5845] flex items-center'>
            <div className='h-max w-[80%] py-5 border-2 border-dashed flex items-center bg-[#F6E8D5] border-[#af5845] mx-auto'>
                <div className='w-[93%] h-max border flex flex-col lg:flex-row items-center border-[#af5845] mx-auto'>
                    <div className='lg:w-1/3 h-[80%] border-b-4 md:border-b-0 md:border-r-0 py-3 my-3 lg:border-r-4  border-[#af5845] flex items-center'>
                        <img src="https://i.ibb.co/Mgt7h64/q.png" className='relative w-[20%] lg:w-[30%] mx-auto' alt="" />
                        <h1 className='absolute -mt-20 bg-[#af5845] text-white pl-2 rounded-br-full pr-10'>About</h1>
                    </div>
                    <div className='lg:w-2/3 h-full p-4 text-center'>
                        <h1 className='text-2xl font-bold text-[#af5845]'>Quantum Asset Solutions</h1>
                        <p className='text-justify'>Welcome to Quantum Asset Solutions, where innovation meets simplicity. We redefine asset management, offering a user-centric platform with cutting-edge features, robust security, and scalability. Join our transformative journey, optimizing your assets effortlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;