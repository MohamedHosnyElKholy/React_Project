import React from 'react'
import  style from './Home.module.css'
import ReacentProduct from '../ReacentProduct/ReacentProduct'
import CatgoriesSlider from '../CatgoriesSlider/CatgoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {
  return (
    <>
    <MainSlider/>
    <CatgoriesSlider/>
    <ReacentProduct/>
    </>
  )
}
