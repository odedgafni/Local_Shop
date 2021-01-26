import React from 'react'
import images from '../Constants/imagesUrl'

const About = () => {
  return (
    <div className="container">
      <br/>
      <br/>
      <h1 className="display-4 mt-5 mb-4">Meet The Crew</h1>
      <div className="row">
        <div className="col-md-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Autem voluptatem incidunt amet quidem. Quod odit facere, vero perspiciatis sunt eius vel optio. 
          Nesciunt quisquam, id laboriosam ab consectetur provident dolore exercitationem. 
          At asperiores unde fuga tempore doloribus inventore veniam vitae sit quod placeat ex vero qui deserunt, 
          quisquam quae, eos nihil tenetur molestias distinctio. Maiores vel deserunt porro a blanditiis, optio culpa, 
          cupiditate recusandae odit ipsam modi explicabo reiciendis sed repellendus rerum dignissimos facilis doloribus quidem sint, 
          aspernatur vero? Dolor ex dolore nisi reiciendis quam assumenda neque officiis, possimus quasi nulla enim at. 
          Tenetur cumque quae deleniti doloribus odio eveniet!
        </div>
        <div className="col-md-6">
          <img className="about-img" src={images.About_1} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default About
