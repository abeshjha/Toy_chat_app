import "./room.css";

export default function Room({ room }) {

  return (
    <div className="conversation">
      <span className="conversationName">{room.name}</span>
    </div>
  );
}
