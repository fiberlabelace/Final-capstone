import React from 'react'
import Menu from './Menu'
import Carousel from './Carousel'
import Option from './Option'
import Introduction from '../Main/Introduction'

const Header = () => {
  return (
    <div>
      <Menu/>
      <Introduction/>
      <Option/>
    </div>
  )
}

export default Header
