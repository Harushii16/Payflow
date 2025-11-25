import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Dashboard({token, setToken}){
  const [invoices, setInvoices] = useState([]);
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');

  const authHeader = { Authorization: 'Basic ' + token };

  useEffect(()=>{ fetchInvoices(); }, []);

  const fetchInvoices = async () => {
    try{
      const res = await axios.get('http://localhost:8081/api/invoices', { headers: authHeader });
      setInvoices(res.data);
    }catch(err){
      console.error(err);
      alert('Error fetching invoices. Make sure backend is running on port 8081.');
    }
  };

  const createInvoice = async () => {
    if(!customer||!amount) return alert('Enter customer and amount');
    await axios.post('http://localhost:8081/api/invoices', { customerName: customer, amount: parseFloat(amount) }, { headers: authHeader });
    setCustomer(''); setAmount(''); fetchInvoices();
  };

  const payInvoice = async (id) => {
    await axios.post(`http://localhost:8081/api/invoices/${id}/pay`, {}, { headers: authHeader });
    fetchInvoices();
  };

  const logout = () => { localStorage.removeItem('token'); setToken(''); };

  return (
    <div className="container">
      <div className="header">
        <h1>PayFlow Pro Dashboard</h1>
        <div>
          <button className="button" onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={{marginTop:20, marginBottom:20, display:'flex', gap:12}}>
        <input placeholder="Customer" value={customer} onChange={e=>setCustomer(e.target.value)} style={{padding:8}}/>
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} style={{padding:8}}/>
        <button className="button btn-primary" onClick={createInvoice}>Create Invoice</button>
      </div>

      <table className="table">
        <thead>
          <tr><th>ID</th><th>Customer</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {invoices.map(inv=>(
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customerName}</td>
              <td>{inv.amount}</td>
              <td>{inv.invoiceDate}</td>
              <td>{inv.status}</td>
              <td>
                {!inv.paid && <button className="button btn-primary" onClick={()=>payInvoice(inv.id)}>Mark Paid</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
