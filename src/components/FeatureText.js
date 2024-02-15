import "../styles/components/feature-text.scss";

export default function FeatureText(props) {

    const bodyText = props.body.map((text, index) => <p dangerouslySetInnerHTML={{__html: text}} key={index}></p>);

    return (
        <section className="container feature">
            <div className="image">
                <img src={require(`../assets/${props.image}`).default}/>
            </div>
            <div className="text">
                <h2 dangerouslySetInnerHTML={{__html: props.title}}></h2>
                {bodyText}
            </div>
        </section>
    )
}