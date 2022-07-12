import "./message.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? "messageOwn" : "message"}>
      <div className="messageTop">
            {message.text.substring(0, 7) === "uploads" ? 
                  
                  (message.text.indexOf('mp4') !== -1) ?
                    <video
                        style={{ maxWidth: '200px' }}
                        src={`http://localhost:5000/${message.text}`} alt="video"
                        type="video/mp4" controls
                    />
                    :
                    (message.text.indexOf('jpg') !== -1) ?
                         <img style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${message.text}`}
                                alt="img"
                            />
                         
                            :
                            <a href={`http://localhost:5000/${message.text}`}>{`http://localhost:5000/${message.text}`}</a>

            :          
            
            <p className = "messageText">{message.text}</p>}  
                
      </div>
    </div>
  );
}
