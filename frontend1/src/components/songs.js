import songsStore from "../stores/songsStore";
import Song from "./Song";
import "./style.css";

export default function Songs() {
  const store = songsStore();

  return (
    <div
      style={{ width: "50%", float: "left" }}
      className="justify-content-left align-items-left "
    >
      <div
        className=" justify-content-center align-items-center
    vh-100 bg-brimary"
      >
        <div className="p-5">
          <h2 className="text-light">Songs: </h2>
        </div>

        <div className="row justify-content-center">
          <table className="table table-striped w-auto">
            <thead className="thead-dark">
              <tr>
                <th scope="col ">Name</th>
                <th scope="col">Artist</th>
                <th scope="col">Genre</th>
                <th scope="col">SongURL</th>
                <th scope="col">Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {store.songs &&
                store.songs.map((song) => {
                  return <Song song={song} key={song._id} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
