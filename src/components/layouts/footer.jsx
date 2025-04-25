import React from 'react'
const footer = () => {
  return (
    <footer className='py-6 md:py-10 px-4 md:px-20 bg-[#1C2838] flex flex-col gap-8 md:gap-12'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0 bg-[#1C2838] text-white'>
          <div className='w-full md:w-1/4 flex flex-col gap-2 md:gap-4'>
            <h3 className='text-2xl md:text-3xl'>Feyer</h3>
            <p className='text-base md:text-xl text-[#D6DEE8]'>Somos una empresa que se dedica a la venta de productos de moda.</p>
          </div>
          <div className='w-full md:w-1/4 flex flex-col gap-2 md:gap-4'>
            <h4 className='text-lg md:text-xl font-bold'>Contacto</h4>
            <p className='text-base md:text-xl text-[#D6DEE8]'>
              <span>Email:</span>
              <span>feyer@gmail.com</span>
            </p>
          </div>
          <div className='w-full md:w-1/4 flex flex-col gap-2 md:gap-4'>
            <h4 className='text-lg md:text-xl font-bold'>Siguenos</h4>
            <p className='text-base md:text-xl text-[#D6DEE8]'>
              <span>Instagram:</span>
              <span>feyer</span>
            </p>
          </div>
        </div>
        <div className='flex justify-center items-center bg-[#1C2838] text-white border-y border-[#D6DEE8] py-4 md:py-8'>
          <p className='text-sm md:text-xl text-white font-light text-center px-4'>Dimplomado dearrollo de software - David Silvera, Edgardo De la Hoz - 2025 - Todos los derechos reservados</p>
        </div>
      </footer>
  )
}

export default footer