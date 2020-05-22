import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const images = [
    {name : "image1",
url : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2Fmax%2F9400%2F1*F_pFNmbeakF86E9ToQJ1ug.png&imgrefurl=https%3A%2F%2Fmedium.com%2F%40annchichi%2Fcast-study-a-simple-todo-app-5f0c69b5a2ee&tbnid=b-VgryXK6kTBxM&vet=12ahUKEwiFxdLLtsXpAhVvl-AKHeNKC4wQMygBegUIARCRAg..i&docid=xIuDQJyVWDqCZM&w=4000&h=2231&q=todo%20app&ved=2ahUKEwiFxdLLtsXpAhVvl-AKHeNKC4wQMygBegUIARCRAg'}
]
export class About extends Component
{

    
    render()
    {
        const settings =  {
            dots : true ,
            fade : true,
            infinte : true,
            speed : 500,
            slidesToShow : 1,
            arrows :  true,
            slidesToScroll : 1,
            className : "slides"

        }
       return( 
        <Slider {...settings}>
            {images.map((image)=>
            {

                return (
                    <div>
                        <img width="100%" src={image.url}/>
                    </div>
                )
            })}

        </Slider>
        )
    }
}



export default About;