import React, {useContext} from "react";
import { UserContext } from '../Context/UserProvider';

export default function userPage(){
    const {
        user: { username },
        boards,
        addBoard,
        getUserBoard,
      } = useContext(UserContext);
    return(
        <div>
            <h1>Hello</h1>
            
        </div>
    )
}