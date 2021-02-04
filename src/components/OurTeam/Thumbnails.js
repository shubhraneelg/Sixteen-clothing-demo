import React from 'react'

const Thumbnails = (props) => {
    return (
        
            <div class="col-md-4">
                <div class="team-member">
                    <div class="thumb-container">
                        <img src={props.src} alt="" />
                        <div class="hover-effect">
                            <div class="hover-content">
                                <ul class="social-icons">
                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i class="fa fa-behance"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="down-content">
                        <h4>{props.name}</h4>
                        <span>{props.designation}</span>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
           
        
    )
}

export default Thumbnails
