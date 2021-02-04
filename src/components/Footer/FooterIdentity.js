import React from 'react';

const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;
const query = `
{
    identityCollection(where: {identityName: "Footer"}) {
      items {
        identityText
      }
    }
  }
  
`;

class FooterIdentity extends React.Component {
    state = {
        footer: []
    }

    componentDidMount() {
        window.fetch(
            `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${REACT_APP_CDA_ACCESS_TOKEN}`
                },
                body: JSON.stringify({ query }),
            }
        ).then(res => res.json())
            .then(({ data }) => {
                //console.log("footer data----", data);
                this.setState({
                    footer: data.identityCollection.items
                });
                //console.log(this.state.footer);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                {
                                    this.state.footer.map((content, index) => {
                                        return (
                                            <div key={index}>
                                                  <p>{content.identityText}</p>
                                            </div>
                                          
                                        );
                                    })
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        )
    }
}
export default FooterIdentity;