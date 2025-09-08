import {useEffect, useState} from "react";
import './FindFriends.scss';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import axiosApi from "../../http/index.js";
import UserData from "./UserData.jsx";

export default function FindFriends() {
  const [findFriendInput, setFindFriendInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!findFriendInput) {return}

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get('/users/find', {
          params: {username: findFriendInput}
        });
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    const handler = setTimeout(fetchData, 1000);
    return () => clearTimeout(handler);
  }, [findFriendInput]);

  return (
    <section className={"findFriendsSection"}>
      <div className={"findFriendsSearch"}>
        <input
          placeholder={"type friend username"}
          maxLength={48}
          className={"input findFriends"}
          onChange={e => setFindFriendInput(e.target.value)}
        />
      </div>

      {loading && <LoadingSpinner/>}
      <UserData data={data} loading={loading}/>

    </section>
  )
}