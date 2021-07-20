import { Add } from '@material-ui/icons'
import React from 'react'
import './SidebarOptions.css'

const SidebarOptions = () => {
    return (
        <div className='sidebar-options'>
            <div className="sidebar-option">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Deno.svg/440px-Deno.svg.png"
                    alt="deno-logo" />
                <p> Deno</p>
            </div>

            <div className="sidebar-option">
                <img src="https://www.typescriptlang.org/images/branding/logo-grouping.svg" alt="" />
                <p> Typescript </p>
            </div>

            <div className="sidebar-option">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" alt="" />
                <p> React </p>
            </div>


            <div className="sidebar-option">
                <img src="https://jestjs.io/img/opengraph.png" alt="" />
                <p> Jest </p>
            </div>

            <div className="sidebar-option">
                <img
                    src="https://d1y79tpeaemgj5.cloudfront.net/wp-content/uploads/2019/12/19091741/BS1-320x180.jpg"
                    alt="" />
                <p> Bombay Sapphire </p>
            </div>

            <div className="sidebar-option">
                <img src="https://playruneterra.com/assets/8bf2c0b85fbc8a90210a01d7ee14a70d97d2d33b/static/image/hero/intro.jpg" alt="" />
                <p> Lor </p>
            </div>

            <div className="sidebar-option">
                <Add />
                <p className="text"> 더보기 </p>
            </div>
        </div>
    )
}

export default SidebarOptions
