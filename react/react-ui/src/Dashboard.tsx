import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS file

export interface Leave {
    leaveId: number;
    employeeId: number;
    leaveStartDate: string;
    leaveEndDate: string;
    reasonForLeave: string;
    totalDays: number;
    status: string;
}

function Dashboard() {
    const [data, setData] = useState<Leave[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        console.log(location)
        const fetchData = async () => {
            if (location.state) {
                if (location.state.data) {
                    const data = location.state.data
                    try {
                        const response = await fetch(`https://localhost:7125/api/Leaves/${data.employeeId}`);
                        const jsonData = await response.json();
                        setData(jsonData);
                        console.log(jsonData); // Log fetched data
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }
        };
        fetchData();
    }, [location.state]); // Fetch data when the component mounts

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const cancelRequest = async (leaveID: number) => {
        try {
            console.log(leaveID)
            console.log({ ...data, status: 'Cancelled' })
            const updatedData = data.filter((d) => d.leaveId === leaveID)[0];
            const response = await fetch(`https://localhost:7125/api/Leaves/${leaveID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...updatedData, status: 'Cancelled' })
            });

            if (response.ok) {
                setData(data.map(item => {
                    if (item.leaveId === leaveID) {
                        return { ...item, status: 'Cancelled' };
                    }
                    return item;
                }));
            } else {
                console.error('Failed to cancel request');
            }
        } catch (error) {
            console.error('Error cancelling request:', error);
        }
    };
    const update = (id:number) => {
         navigate(`/leaveform/${id}`)
       console.log()
    }

    const filteredData = data.filter(item => {
        return (
            item.employeeId.toString().includes(searchTerm) ||
            item.leaveStartDate.includes(searchTerm) ||
            item.leaveEndDate.includes(searchTerm) ||
            item.reasonForLeave.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container">
            <div style={{ padding: '0.5rem 1.5rem', border: '1px solid black', borderRadius: '1rem', background: '#0093ff', color: '#ffffff', marginBottom: '20px' }}>
                <Link className='link-style' style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }} to='/formpage'>Form Page</Link>
            </div>
            <h1>Leave Dashboard</h1>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="table" style={{ border: '1px solid black', borderRadius: '1rem', width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Employee ID</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Leave Start Date</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Leave End Date</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Total Days</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Reason for Leave</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Status</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.leaveId}>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.employeeId}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.leaveStartDate}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.leaveEndDate}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.totalDays}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.reasonForLeave}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.status}</td>
                            <td className='status_wrapper' style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                                {item.status === 'Active' && (
                                    <>
                                        <button className="btn btn-danger" onClick={() => cancelRequest(item.leaveId)}>Cancel Request</button>
                                        <span style={{ marginRight: '5px' }}></span>
                                        <button className="btn btn-warning" onClick={() => update(item.leaveId)}>Update Details</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;

