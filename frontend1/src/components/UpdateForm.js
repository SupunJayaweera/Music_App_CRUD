import songsStore from "../stores/songsStore";
import "./style.css";

export default function UpdateForm() {
  const store = songsStore();
  if (!store.updateForm._id) return <></>;
  return (
    <div
    style={{
      width: "50%",
      float: "right",
      
    }}
    className="login template justify-content-center 
    vh-100 bg-brimary "
    >
      <div className="login p-5 rounded ">
        <h2 className="text-center text-light mb-4 p-3">Update Your Playlist</h2>
        <form onSubmit={store.updateSongButton}>
          <div className="mb-2">
            <input
              className="form-control"
              onChange={store.handleUpdateFieldChange}
              value={store.updateForm.name}
              name="name"
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              onChange={store.handleUpdateFieldChange}
              value={store.updateForm.artist}
              name="artist"
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              onChange={store.handleUpdateFieldChange}
              value={store.updateForm.genre}
              name="genre"
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              onChange={store.handleUpdateFieldChange}
              value={store.updateForm.songUrl}
              name="songUrl"
            />
          </div>
          <div className="d-grid p-4">
            <button className="btn btn-outline-info mb-0" type="submit">Update </button>
          </div>
        </form>
      </div>
    </div>
  );
}
