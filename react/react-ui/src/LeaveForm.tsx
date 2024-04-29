import { FormEvent, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { Leave } from './Dashboard';

interface EmployeeDetails {
    employeeId: number,
    employeeName: string,
    employeeEmailAddress: string,
    managerEmailAddress: string,
}
function LeaveForm() {
    const location = useLocation();
    const [employeeID, setEmployeeID] = useState<number>();
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [managerEmail, setManagerEmail] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [totalDays, setTotalDays] = useState<number>();
    const [reasonForLeave, setReasonForLeave] = useState('');
    const navigate = useNavigate();
    const params = useParams()
    const [user, setUser] = useState();
    useEffect(() => {
        calculateTotalDays();
    }, [fromDate, toDate]);

    useEffect(() => {
        if (location.state) {
            if (location.state.data) {
                const data = location.state.data;
                setUser(data)
                setEmployeeID(data.employeeId);
                setEmployeeName(data.employeeName);
                setManagerEmail(data.managerEmailAddress);
            }
        }
    },[])
    const calculateTotalDays = () => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        const diffDays = Math.ceil(Math.abs((endDate - startDate) / oneDay)) + 1;
        setTotalDays(diffDays);
    };

    useEffect(() => {
        async function getDataById() {
            if (params.id) {
                console.log(params.id)
                const url = `https://localhost:7125/Lev/${params.id}`
                console.log(url)
                try {
                    const res = await fetch(url);
                    const data: Leave = await res.json();
                    console.log(data)
                    if (data) {
                        const empUrl = `https://localhost:7125/api/Employees/${data.EmployeeId}`
                        try {
                            const empRes = await fetch(empUrl);
                            const empData: EmployeeDetails = await empRes.json()
                            console.log(empData)
                            setEmployeeEmail(empData.employeeEmailAddress)
                            setEmployeeName(empData.employeeName)
                            setManagerEmail(empData.managerEmailAddress)
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    setEmployeeID(data.EmployeeId)
                    setFromDate(data.LeaveStartDate.split('T')[0]);
                    setToDate(data.LeaveEndDate.split('T')[0]);
                    setTotalDays(data.totalDays);
                    setReasonForLeave(data.ReasonForLeave)

                } catch (err) {
                    console.log(err)
                }
            }
        }
        getDataById()
    }, [])

    const postRequest = async (leaveRequest: any) => {
        try {
            const response = await fetch('https://localhost:7125/api/Leaves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(leaveRequest)
            });

            if (response.ok) {
                console.log('Leave request submitted successfully!');
                navigate('/dashboard', { state: { data: user } });
            } else {
                console.error('Failed to submit leave request');
            }
        } catch (error) {
            console.error('Error submitting leave request:', error);
        }
    }

    const putRequest = async (leaveRequest:any) => {
        try {
            const response = await fetch(`https://localhost:7125/api/Leaves/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ leaveId: params.id, ...leaveRequest })
            });

            if (response.ok) {
                console.log('Leave request submitted successfully!');
                navigate('/dashboard', { state: { data: user } });
            } else {
                console.error('Failed to submit leave request');
            }
        } catch (error) {
            console.error('Error submitting leave request:', error);
        }
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const leaveRequest = {
            employeeId: parseInt(employeeID),
            employeeName,
            employeeEmail,
            managerEmail,
            leaveStartDate: fromDate,
            leaveEndDate: toDate,
            reasonForLeave,
            totalDays: parseInt(totalDays),
            status: 'Active'
        };

        if (params.id) {
            putRequest(leaveRequest)
        } else {
            postRequest(leaveRequest)
        }
      
    };

    return (
        <div className="container">
            <div style={{ padding: '0.5rem 1.5rem', border: '1px solid black', borderRadius: '1rem', background: '#0093ff', color: '#ffffff' }}>
                <Link className='link-style' style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }} to='/dashboard'>Dashboard</Link>
            </div>

            <h1>Leave Application Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Employee ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={employeeID}
                        onChange={(e) => setEmployeeID(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Employee Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Employee Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={employeeEmail}
                        onChange={(e) => setEmployeeEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manager Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={managerEmail}
                        onChange={(e) => setManagerEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Leave Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Leave End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Total Days</label>
                    <input
                        type="number"
                        className="form-control"
                        value={totalDays}
                        onChange={(e) => setTotalDays(e.target.value)}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Reason for Leave</label>
                    <textarea
                        className="form-control"
                        value={reasonForLeave}
                        onChange={(e) => setReasonForLeave(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default LeaveForm;

