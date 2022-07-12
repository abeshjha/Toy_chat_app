import "./online.css";

export default function Online({friend}) {
 
   return (
    <div className="chatOnline">
     
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend}</span>
        </div>
     
    </div>
  );
}
