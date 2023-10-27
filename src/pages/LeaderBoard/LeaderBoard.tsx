import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE, getJWT } from '../../utils/api'
import './LeaderBoard.css'
interface Leader {
    entry: string,
    name: string,
    points: number,
    rank: number
}
function LeaderBoard() {
    const [data, setData] = useState<Leader[]>([])
    useEffect(() => {
        axios.get(`${API_BASE}/users/leaderboard/`, { headers: { "Authorization": "Bearer " + getJWT() } })
            .then(response => {
                if (response.status === 200) {
                    setData(response.data)
                }
                else {
                    alert(response.data.detail)
                }
                console.log(response.data)
            }).catch(error => { console.log(error) })
    }, [])
    return (
        <div className='LeaderBoard'>
            <table>
                <tbody>
                    <tr><td>Rank</td><td>Name</td><td>Entry</td><td>Points</td></tr>
                    {data.map(leader => {
                        return (<tr key={leader.rank}><td>{leader.rank}</td><td>{leader.name}</td><td>{leader.entry}</td><td>{leader.points}</td></tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LeaderBoard;
