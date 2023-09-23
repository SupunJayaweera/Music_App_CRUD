import songsStore from "../stores/songsStore";
import "./style.css";
import { Link } from "react-router-dom";

export default function CreateForm() {
  const store = songsStore();
  if (store.updateForm._id) return <></>;
  return (
    <div
      style={{
        width: "50%",
        float: "right",
      }}
      className="login template justify-content-center 
        vh-100 bg-brimary "
    >
      
      <div className=" login p-5 rounded">
        <div className="p-3">
          <h2 className="text-center text-light mb-4">Create Song Playlist</h2>
        </div>

        <form onSubmit={store.createSong}>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Song/Music Name"
              onChange={store.updateCreateFormField}
              value={store.createForm.name}
              name="name"
            />
          </div>

          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Name of the Artist"
              onChange={store.updateCreateFormField}
              value={store.createForm.artist}
              name="artist"
            />
          </div>

          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Genre"
              onChange={store.updateCreateFormField}
              value={store.createForm.genre}
              name="genre"
            />
          </div>

          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Song/Music URL"
              onChange={store.updateCreateFormField}
              value={store.createForm.songUrl}
              name="songUrl"
            />
          </div>

          <div className="d-grid p-4">
            <button className="btn btn-outline-success mb-4" type="submit">
              Add to Playlist
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
