import React, { Component } from 'react'
import { AccordionCollapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScriptTag from 'react-script-tag'

const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;
const query = `{
    accordionCollection(order:sys_firstPublishedAt_ASC){
      items{
        title
        summary
   }
    }
  }
  `;

class Accordion extends Component {
    constructor() {
        super();

        this.state = {
            accord: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        window.fetch(
            `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${REACT_APP_CDA_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    query
                })
            }
        )
            .then(res => res.json())
            .then(response => {
                console.log(response);

                const { data } = response;
                this.setState({
                    loading: false,
                    accord: data ? data.accordionCollection.items : []
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message
                });
            })
    }

    render() {

        const { accord } = this.state;

        return (
            <>
                { <div>

                    {/* <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/jquery.min.js'} /> */}
                    <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/custom.js'} />
                    {/* <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/slick.js'} /> */}
                    {/* <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/isotope.js'} /> */}
                    <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/accordions.js'} />

                    <ul className="accordion">
                        {
                            accord.map((accords, i) => {
                                return (
                                    <>
                                        <li key={i}>
                                            <a>
                                                {accords.title}
                                            </a>
                                            <div className="content">
                                                <p>
                                                    {accords.summary}
                                                </p>
                                            </div>
                                        </li>

                                    </>

                                );
                            })
                        }
                    </ul>
                </div>

                }
            </>
        )



    }
}

export default Accordion