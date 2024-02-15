import "../styles/components/text-block.scss";

export default function TextBlock(props) {
  const renderImage = props.image ? (
    <img className='main-image' src={require(`../assets/${props.image}`).default} />
  ) : null;
    
  const renderVideo = props.video ? (
    <video className='main-image' autoPlay muted loop playsInline>
      <source src={require(`../assets/videos/${props.video}`).default} type='video/mp4'></source>
    </video>
  ) : null;

  return (
    <section className={`container text-block ${props.className}`}>
      {window.innerWidth > 768 && !(props.aspectRatio > 1 && props.aspectRatio < 1.5) ? renderVideo : ''}
      {renderImage}
      <div className='content'>
        <h2 className={props.titleAlign} dangerouslySetInnerHTML={{ __html: props.title }}></h2>
        {props.children}
      </div>
    </section>
  );
}
