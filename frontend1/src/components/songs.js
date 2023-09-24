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
              <th scope="col" style={{ backgroundColor: '#8BF032', color: '#000000' }}>Name</th>
              <th scope="col" style={{ backgroundColor: '#8BF032', color: '#000000' }}>Artist</th>
              <th scope="col" style={{ backgroundColor: '#8BF032', color: '#000000' }}>Genre</th>
              <th scope="col" style={{ backgroundColor: '#8BF032', color: '#000000' }}>Player</th>
              <th scope="col" style={{ backgroundColor: '#8BF032', color: '#000000' }}>Update/Delete</th>
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
