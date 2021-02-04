import React, { Component } from 'react'
import Thumbnails from './Thumbnails'

const query = `
{
    ourTeamMembersCollection {
      items {
        image {
          title
          url
        }
        name
        designation
        description
        socialMediaReference {
          icon
          facebookUrl
          twitterUrl
          linkedInUrl
          behanceUrl
        }
      }
    }
  }
  
  `

const { REACT_APP_SPACE_ID } = process.env;

export class OurTeam extends Component {

    // state = {
    //     imageUrl: [],
    //     imageAlt: [],
    //     name: [],
    //     designation: [],
    //     description: [],
    //     facebookUrl: [],
    //     twitterUrl: [],
    //     linkedInUrl: [],
    //     behanceUrl: []
    // }
    state = {
        thumbnailDetail: {
            thumbnails: [],
            imageUrl: [],
            socialMediaReference: []
        }

    }
    componentDidMount() {
        window.fetch(
            `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer gj_n5GeHF7VyBk35wHm7KuXb7ymL0S6cubsu4iyofuI`
                },
                body: JSON.stringify({ query }),
            }
        ).then(res => res.json())
            .then(({ data }) => {
                console.log(data);
                let thumbnails = data.ourTeamMembersCollection.items;
                // console.log(thumbnails);
                // let images = data.ourTeamMembersCollection.items.map(item => item.image);
                let socialMediaReference = data.ourTeamMembersCollection.items.map(item => item.socialMediaReference);
                let imageUrl = data.ourTeamMembersCollection.items.map(item => item.image.url);
                // let imageAlt = data.ourTeamMembersCollection.items.map(item => item.image.title);
                // let name = data.ourTeamMembersCollection.items.map(item => item.name);
                // let designation = data.ourTeamMembersCollection.items.map(item => item.designation);
                // let description = data.ourTeamMembersCollection.items.map(item => item.description);
                // let facebookUrl = data.ourTeamMembersCollection.items.map(item => item.socialMediaReference.facebookUrl);
                // let twitterUrl = data.ourTeamMembersCollection.items.map(item => item.socialMediaReference.twitterUrl);
                // let linkedInUrl = data.ourTeamMembersCollection.items.map(item => item.socialMediaReference.linkedInUrl);
                // let behanceUrl = data.ourTeamMembersCollection.items.map(item => item.socialMediaReference.behanceUrl);

                this.setState({
                    thumbnailDetail: {
                        thumbnails,
                        imageUrl,
                        socialMediaReference
                    }
                    // imageUrl,
                    // imageAlt,
                    // name,
                    // designation,
                    // description,
                    // facebookUrl,
                    // twitterUrl,
                    // linkedInUrl,
                    // behanceUrl
                });
                console.log(this.state.thumbnailDetail.thumbnails);
            })
            .catch(error => console.log(error));
    }

    render() {
        // const thumbnailDetail = Object.assign([], this.state.thumbnailDetail);
        // console.log(thumbnailDetail)
        let thumbnails = null;
        thumbnails = (
            <>
                {this.state.thumbnailDetail.thumbnails.map(item => {
                    return <Thumbnails
                        src={item.image.url} name={item.name} designation={item.designation} description={item.description}/>
                })}
            </>
        )
        return (
            <div class="team-members">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-heading">
                                <h2>Our Team Members</h2>
                            </div>
                        </div>
                        {thumbnails}
                    </div>
                </div>
            </div>
        )
    }
}

export default OurTeam
